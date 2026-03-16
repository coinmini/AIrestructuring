import { useState } from "react"
import { GitBranch, Network, Filter, Search } from "lucide-react"
import { cn } from "../lib/utils"
import { kgEntities, kgEdges, kgCases, kgRegulations } from "../data/mock-data"

const filterTabs = ["核心", "企业", "法院", "法规", "行业"] as const

const filterBadgeMap: Record<string, string> = {
  "核心": "badge badge-electric",
  "企业": "badge badge-electric",
  "法院": "badge badge-amber",
  "法规": "badge badge-teal",
  "行业": "badge badge-coral",
}

const filterBadgeActiveMap: Record<string, string> = {
  "核心": "badge badge-electric !bg-electric/30 !border-electric/40",
  "企业": "badge badge-electric !bg-electric/30 !border-electric/40",
  "法院": "badge badge-amber !bg-amber/30 !border-amber/40",
  "法规": "badge badge-teal !bg-teal/30 !border-teal/40",
  "行业": "badge badge-coral !bg-coral/30 !border-coral/40",
}

const typeColorMap: Record<string, { fill: string; stroke: string; bg: string; text: string }> = {
  "企业": { fill: "oklch(78% 0.15 220)", stroke: "oklch(78% 0.15 220 / 0.4)", bg: "bg-electric/10", text: "text-electric" },
  "法院": { fill: "oklch(78% 0.16 75)", stroke: "oklch(78% 0.16 75 / 0.4)", bg: "bg-amber/10", text: "text-amber" },
  "法规": { fill: "oklch(72% 0.14 175)", stroke: "oklch(72% 0.14 175 / 0.4)", bg: "bg-teal/10", text: "text-teal" },
  "行业": { fill: "oklch(65% 0.2 25)", stroke: "oklch(65% 0.2 25 / 0.4)", bg: "bg-coral/10", text: "text-coral" },
}

const statusBadgeMap: Record<string, string> = {
  "重整完成": "badge badge-green",
  "预重整中": "badge badge-amber",
}

const levelBadgeMap: Record<string, string> = {
  "核心": "badge badge-electric",
  "重要": "badge badge-amber",
  "参考": "badge badge-muted",
}

const progressClassMap: Record<string, string> = {
  "企业": "progress-bar-fill",
  "法院": "progress-bar-fill-amber",
  "法规": "progress-bar-fill",
  "行业": "progress-bar-fill-coral",
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
      <div className="flex items-center justify-between animate-slide-up">
        <div>
          <div className="flex items-center gap-2">
            <GitBranch className="w-5 h-5 text-electric" />
            <h2 className="text-lg font-bold text-foreground">知识图谱</h2>
          </div>
          <p className="text-xs text-muted-foreground mt-1">破产重整领域全量知识图谱，覆盖企业、法规、案例、人物等多维实体</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="btn-secondary flex items-center gap-1.5 !px-3 !py-1.5 !text-xs">
            <Network className="w-3.5 h-3.5" />
            关系图谱可视化
          </button>
          <button className="btn-secondary flex items-center gap-1.5 !px-3 !py-1.5 !text-xs">
            <Filter className="w-3.5 h-3.5" />
            筛选
          </button>
        </div>
      </div>

      <div className="flex items-center gap-2 animate-slide-up">
        {filterTabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveFilter(tab)}
            className={cn(
              "cursor-pointer transition-all !text-xs !py-1 !px-3",
              activeFilter === tab ? filterBadgeActiveMap[tab] : filterBadgeMap[tab],
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="relative animate-slide-up">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
        <input
          type="text"
          placeholder="搜索实体、关系、法规..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-9 pr-3 py-2.5 rounded-lg bg-input border border-border/50 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-electric/50 focus:ring-1 focus:ring-electric/20 transition-all"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 animate-slide-up">
        <div className="lg:col-span-3 card relative !p-4">
          <svg viewBox="0 0 800 550" className="w-full h-[420px]">
            <defs>
              <filter id="node-glow-electric" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
                <feFlood floodColor="oklch(78% 0.15 220)" floodOpacity="0.4" result="color" />
                <feComposite in="color" in2="blur" operator="in" result="glow" />
                <feMerge>
                  <feMergeNode in="glow" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter id="node-glow-amber" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
                <feFlood floodColor="oklch(78% 0.16 75)" floodOpacity="0.4" result="color" />
                <feComposite in="color" in2="blur" operator="in" result="glow" />
                <feMerge>
                  <feMergeNode in="glow" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter id="node-glow-teal" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
                <feFlood floodColor="oklch(72% 0.14 175)" floodOpacity="0.4" result="color" />
                <feComposite in="color" in2="blur" operator="in" result="glow" />
                <feMerge>
                  <feMergeNode in="glow" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter id="node-glow-coral" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
                <feFlood floodColor="oklch(65% 0.2 25)" floodOpacity="0.4" result="color" />
                <feComposite in="color" in2="blur" operator="in" result="glow" />
                <feMerge>
                  <feMergeNode in="glow" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
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
                    strokeDasharray="4 2"
                    style={{ animation: `dash-flow ${3 + (i % 3)}s linear infinite` }}
                  />
                  <text x={midX} y={midY - 6} textAnchor="middle" fill="oklch(60% 0.02 250)" fontSize="9">
                    {edge.label}
                  </text>
                </g>
              )
            })}
            <style>{`
              @keyframes dash-flow {
                to { stroke-dashoffset: -24; }
              }
              .kg-node { transition: transform 0.2s ease; transform-origin: center; cursor: pointer; }
              .kg-node:hover { transform: scale(1.15); }
            `}</style>
            {filteredEntities.map((entity) => {
              const colors = typeColorMap[entity.type]
              const glowMap: Record<string, string> = { "企业": "node-glow-electric", "法院": "node-glow-amber", "法规": "node-glow-teal", "行业": "node-glow-coral" }
              return (
                <g key={entity.id} className="kg-node" filter={`url(#${glowMap[entity.type]})`}>
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
          <div className="absolute bottom-4 left-4 flex items-center gap-3 text-[10px] bg-card/80 backdrop-blur-sm rounded-lg px-3 py-2 border border-border/30">
            <span className="badge badge-electric">实体 {kgEntities.length}</span>
            <span className="badge badge-teal">关系 {kgEdges.length}</span>
            <span className="badge badge-amber">法规 {kgRegulations.length}</span>
            <span className="badge badge-coral">案例 {kgCases.length}</span>
          </div>
        </div>

        <div className="space-y-4">
          <div className="card">
            <h3 className="text-xs font-bold text-foreground mb-3">实体类型分布</h3>
            <div className="space-y-3">
              {entityTypeCounts.map(([type, count]) => {
                const colors = typeColorMap[type]
                return (
                  <div key={type}>
                    <div className="flex items-center justify-between text-xs mb-1">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full" style={{ background: colors.fill }} />
                        <span className="text-foreground">{type}</span>
                      </div>
                      <span className="font-mono text-muted-foreground">{count}</span>
                    </div>
                    <div className="progress-bar">
                      <div className={progressClassMap[type]} style={{ width: `${(count / kgEntities.length) * 100}%` }} />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="card animate-slide-up">
        <h3 className="text-sm font-bold text-foreground mb-3">重整案例库</h3>
        <div className="space-y-0">
          {kgCases.map((c) => (
            <div key={c.name} className="flex items-center justify-between py-2.5 border-b border-border/30 last:border-0 table-row-hover px-2 -mx-2 rounded">
              <div className="flex items-center gap-3">
                <span className="text-xs font-medium text-foreground">{c.name}</span>
                <span className="text-[10px] text-muted-foreground">{c.court}</span>
              </div>
              <div className="flex items-center gap-2">
                {c.rate && <span className="text-[10px] font-mono text-muted-foreground">{c.rate}</span>}
                <span className={statusBadgeMap[c.status]}>
                  {c.status}
                </span>
                <span className="badge badge-muted">{c.type}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="card animate-slide-up">
        <h3 className="text-sm font-bold text-foreground mb-3">法规数据库 <span className="badge badge-electric ml-1">{kgRegulations.length}条</span></h3>
        <div className="space-y-0">
          {kgRegulations.map((r) => (
            <div key={r.name} className="flex items-center justify-between py-2.5 border-b border-border/30 last:border-0 table-row-hover px-2 -mx-2 rounded">
              <div className="flex items-center gap-3">
                <span className="text-xs font-medium text-foreground">{r.name}</span>
                <span className="text-[10px] text-muted-foreground">{r.scope}</span>
              </div>
              <span className={levelBadgeMap[r.level]}>
                {r.level}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
