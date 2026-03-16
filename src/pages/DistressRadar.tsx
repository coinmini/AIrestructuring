import { Search, Filter, Radar, Eye, Zap } from "lucide-react"
import { cn } from "../lib/utils"
import { radarTargets, dataSources } from "../data/mock-data"

const tagStyles: Record<string, string> = {
  新发现: "bg-electric/20 text-electric border-electric/30",
  AI分析中: "bg-amber/20 text-amber border-amber/30",
  跟踪中: "bg-teal/20 text-teal border-teal/30",
  已完成: "bg-green-500/20 text-green-400 border-green-500/30",
}

const tabs = [
  { label: "新发现", count: 1 },
  { label: "AI分析中", count: 2 },
  { label: "跟踪中", count: 1 },
  { label: "已完成", count: 1 },
]

function scoreStyle(score: number): string {
  if (score >= 90) return "text-green-400"
  if (score >= 80) return "text-electric"
  if (score >= 70) return "text-amber"
  return "text-coral"
}

export default function DistressRadar() {
  return (
    <div className="space-y-5">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight glow-text-blue flex items-center gap-2">
            <Radar className="h-6 w-6 text-electric" />
            困境雷达
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            7×24小时监控 5,247 个信息源，AI自动识别破产重整投资机会
          </p>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-green-500/15 px-3 py-1 text-xs font-medium text-green-400 border border-green-500/30">
          <span className="status-dot status-dot-green" />
          扫描中
        </span>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="搜索标的名称、代码、行业..."
            className="h-9 w-full rounded-lg border border-border/50 bg-secondary pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-electric/50 focus:outline-none"
          />
        </div>
        <button className="flex h-9 items-center gap-1.5 rounded-lg border border-border/50 bg-secondary px-4 text-sm text-muted-foreground hover:text-foreground">
          <Filter className="h-3.5 w-3.5" />
          筛选
        </button>
      </div>

      <div className="flex gap-2">
        {tabs.map((tab, i) => (
          <button
            key={tab.label}
            className={cn(
              "rounded-lg px-4 py-1.5 text-sm font-medium transition-colors",
              i === 0
                ? "bg-electric/15 text-electric border border-electric/30"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {tab.label}
            <span className="ml-1.5 text-xs opacity-70">{tab.count}</span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-8 grid grid-cols-2 gap-4">
          {radarTargets.map((t) => (
            <div
              key={t.code}
              className="relative bg-card rounded-lg border border-border/50 p-5"
            >
              <span
                className={cn(
                  "absolute right-4 top-4 rounded border px-2 py-0.5 text-[10px] font-medium",
                  tagStyles[t.tag]
                )}
              >
                {t.tag}
              </span>

              <h3 className="text-base font-bold">{t.name}</h3>
              <p className="text-xs text-muted-foreground">{t.code}</p>

              <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
                <span className="rounded bg-secondary px-1.5 py-0.5 text-muted-foreground">
                  {t.status}
                </span>
                <span className="rounded bg-secondary px-1.5 py-0.5 text-muted-foreground">
                  {t.source}
                </span>
              </div>

              <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
                <span>{t.industry}</span>
                <span>市值 {t.marketCap}</span>
              </div>

              <div className="mt-3 flex items-center gap-2">
                <span className="text-xs text-muted-foreground">AI匹配度</span>
                <span className={cn("text-2xl font-bold", scoreStyle(t.score))}>
                  {t.score}
                </span>
                <span className="text-xs text-muted-foreground">分</span>
              </div>

              <p className="mt-2 text-xs leading-relaxed text-muted-foreground line-clamp-2">
                {t.description}
              </p>

              <div className="mt-4 flex gap-2">
                <button className="flex-1 rounded-lg bg-electric/15 py-1.5 text-xs font-medium text-electric border border-electric/30 hover:bg-electric/25 transition-colors">
                  <Zap className="mr-1 inline h-3 w-3" />
                  启动AI尽调
                </button>
                <button className="flex-1 rounded-lg border border-border/50 bg-secondary py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors">
                  <Eye className="mr-1 inline h-3 w-3" />
                  加入关注
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="col-span-4 space-y-4">
          <div className="bg-card rounded-lg border border-border/50 p-5">
            <h2 className="mb-4 text-sm font-semibold">数据源监控</h2>
            <div className="space-y-3">
              {dataSources.map((ds) => (
                <div key={ds.name} className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">{ds.name}</span>
                  <div className="flex items-center gap-2">
                    <div className="h-1 w-16 rounded-full bg-secondary">
                      <div
                        className="h-full rounded-full bg-electric/60"
                        style={{
                          width: `${Math.min((ds.count / 1600) * 100, 100)}%`,
                        }}
                      />
                    </div>
                    <span className="w-10 text-right text-muted-foreground">
                      {ds.count.toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-card rounded-lg border border-border/50 p-5">
            <div className="grid grid-cols-3 gap-3 text-center">
              <div>
                <p className="text-xl font-bold text-electric">
                  {dataSources.reduce((s, d) => s + d.count, 0).toLocaleString()}
                </p>
                <p className="mt-0.5 text-[10px] text-muted-foreground">
                  今日扫描公告
                </p>
              </div>
              <div>
                <p className="text-xl font-bold text-amber">12</p>
                <p className="mt-0.5 text-[10px] text-muted-foreground">
                  新增预警
                </p>
              </div>
              <div>
                <p className="text-xl font-bold text-teal">
                  {radarTargets.length}
                </p>
                <p className="mt-0.5 text-[10px] text-muted-foreground">
                  匹配标的
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
