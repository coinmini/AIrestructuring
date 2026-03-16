import { useState } from "react"
import { GitBranch, Network, Filter, Search } from "lucide-react"
import { cn } from "../lib/utils"
import { kgEntities, kgEdges, kgCases, kgRegulations } from "../data/mock-data"

const filterTabs = ["核心", "企业", "法院", "法规", "行业"] as const

const typeColorMap: Record<string, { fill: string; stroke: string; bg: string; text: string }> = {
  "企业": { fill: "oklch(78% 0.15 220)", stroke: "oklch(78% 0.15 220 / 0.4)", bg: "bg-electric/10", text: "text-electric" },
  "法院": { fill: "oklch(78% 0.16 75)", stroke: "oklch(78% 0.16 75 / 0.4)", bg: "bg-amber/10", text: "text-amber" },
  "法规": { fill: "oklch(72% 0.14 175)", stroke: "oklch(72% 0.14 175 / 0.4)", bg: "bg-teal/10", text: "text-teal" },
  "行业": { fill: "oklch(65% 0.2 25)", stroke: "oklch(65% 0.2 25 / 0.4)", bg: "bg-coral/10", text: "text-coral" },
}

const statusColorMap: Record<string, string> = {
  "重整完成": "bg-teal/10 text-teal",
  "预重整中": "bg-amber/10 text-amber",
}

const levelColorMap: Record<string, string> = {
  "核心": "bg-electric/10 text-electric",
  "重要": "bg-amber/10 text-amber",
  "参考": "bg-secondary text-muted-foreground",
}

const entityTypeCounts = Object.entries(
  kgEntities.reduce<Record<string, number>>((acc, e) => ({ ...acc, [e.type]: (acc[e.type] ?? 0) + 1 }), {})
)

const entityMap = new Map(kgEntities.map((e) => [e.id, e]))

export default function KnowledgeGraph() {
  const [activeFilter, setActiveFilter] = useState<string>("核心")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredEntities = activeFilter === "核心"
    ? kgEntities
    : kgEntities.filter((e) => e.type === activeFilter)

  const filteredIds = new Set(filteredEntities.map((e) => e.id))
  const filteredEdges = kgEdges.filter((e) => filteredIds.has(e.from) && filteredIds.has(e.to))

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <GitBranch className="w-5 h-5 text-electric" />
            <h2 className="text-lg font-bold text-foreground">知识图谱</h2>
          </div>
          <p className="text-xs text-muted-foreground mt-1">破产重整领域全量知识图谱，覆盖企业、法规、案例、人物等多维实体</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-secondary text-secondary-foreground text-xs hover:bg-secondary/80 transition-colors">
            <Network className="w-3.5 h-3.5" />
            关系图谱可视化
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-secondary text-secondary-foreground text-xs hover:bg-secondary/80 transition-colors">
            <Filter className="w-3.5 h-3.5" />
            筛选
          </button>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {filterTabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveFilter(tab)}
            className={cn(
              "px-3 py-1 rounded-md text-xs transition-colors",
              activeFilter === tab ? "bg-electric/10 text-electric" : "bg-secondary text-muted-foreground hover:text-foreground",
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
        <input
          type="text"
          placeholder="搜索实体、关系、法规..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-9 pr-3 py-2 rounded-md bg-input border border-border/50 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-electric/50"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="lg:col-span-3 bg-card rounded-lg border border-border/50 p-4 relative">
          <svg viewBox="0 0 800 550" className="w-full h-[420px]">
            {filteredEdges.map((edge, i) => {
              const from = entityMap.get(edge.from)
              const to = entityMap.get(edge.to)
              if (!from || !to) return null
              const midX = (from.x + to.x) / 2
              const midY = (from.y + to.y) / 2
              return (
                <g key={i}>
                  <line
                    x1={from.x} y1={from.y} x2={to.x} y2={to.y}
                    stroke="oklch(25% 0.015 260)" strokeWidth="1.5"
                  />
                  <text x={midX} y={midY - 6} textAnchor="middle" fill="oklch(60% 0.02 250)" fontSize="9">
                    {edge.label}
                  </text>
                </g>
              )
            })}
            {filteredEntities.map((entity) => {
              const colors = typeColorMap[entity.type]
              return (
                <g key={entity.id}>
                  <circle cx={entity.x} cy={entity.y} r="28" fill={colors.stroke} />
                  <circle cx={entity.x} cy={entity.y} r="22" fill={colors.fill} fillOpacity="0.2" stroke={colors.fill} strokeWidth="1.5" />
                  <text x={entity.x} y={entity.y + 1} textAnchor="middle" dominantBaseline="middle" fill={colors.fill} fontSize="11" fontWeight="600">
                    {entity.name}
                  </text>
                  <text x={entity.x} y={entity.y + 40} textAnchor="middle" fill="oklch(60% 0.02 250)" fontSize="9">
                    {entity.type}
                  </text>
                </g>
              )
            })}
          </svg>
          <div className="absolute bottom-4 left-4 flex items-center gap-4 text-[10px] text-muted-foreground bg-card/80 backdrop-blur-sm rounded px-3 py-1.5 border border-border/30">
            <span>实体节点 {kgEntities.length}</span>
            <span>·</span>
            <span>关系边 {kgEdges.length}</span>
            <span>·</span>
            <span>法规条文 {kgRegulations.length}</span>
            <span>·</span>
            <span>案例库 {kgCases.length}</span>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-card rounded-lg border border-border/50 p-4">
            <h3 className="text-xs font-bold text-foreground mb-3">实体类型分布</h3>
            <div className="space-y-2.5">
              {entityTypeCounts.map(([type, count]) => {
                const colors = typeColorMap[type]
                return (
                  <div key={type} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full" style={{ background: colors.fill }} />
                      <span className="text-foreground">{type}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 bg-secondary rounded-full overflow-hidden">
                        <div className="h-full rounded-full" style={{ background: colors.fill, width: `${(count / kgEntities.length) * 100}%` }} />
                      </div>
                      <span className="font-mono text-muted-foreground w-4 text-right">{count}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-card rounded-lg border border-border/50 p-5">
        <h3 className="text-sm font-bold text-foreground mb-3">重整案例库</h3>
        <div className="space-y-2">
          {kgCases.map((c) => (
            <div key={c.name} className="flex items-center justify-between py-2 border-b border-border/30 last:border-0">
              <div className="flex items-center gap-3">
                <span className="text-xs font-medium text-foreground">{c.name}</span>
                <span className="text-[10px] text-muted-foreground">{c.court}</span>
              </div>
              <div className="flex items-center gap-2">
                {c.rate && <span className="text-[10px] font-mono text-muted-foreground">{c.rate}</span>}
                <span className={cn("px-1.5 py-0.5 rounded text-[10px]", statusColorMap[c.status])}>
                  {c.status}
                </span>
                <span className="px-1.5 py-0.5 rounded text-[10px] bg-secondary text-muted-foreground">{c.type}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-card rounded-lg border border-border/50 p-5">
        <h3 className="text-sm font-bold text-foreground mb-3">法规数据库 {kgRegulations.length}条</h3>
        <div className="space-y-2">
          {kgRegulations.map((r) => (
            <div key={r.name} className="flex items-center justify-between py-2 border-b border-border/30 last:border-0">
              <div className="flex items-center gap-3">
                <span className="text-xs font-medium text-foreground">{r.name}</span>
                <span className="text-[10px] text-muted-foreground">{r.scope}</span>
              </div>
              <span className={cn("px-1.5 py-0.5 rounded text-[10px]", levelColorMap[r.level])}>
                {r.level}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
