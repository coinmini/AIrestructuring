import { Search, Filter, Radar, Eye, Zap } from "lucide-react"
import { cn } from "../lib/utils"
import { radarTargets, dataSources } from "../data/mock-data"

const tagBadge: Record<string, string> = {
  新发现: "badge badge-electric",
  AI分析中: "badge badge-amber",
  跟踪中: "badge badge-teal",
  已完成: "badge badge-green",
}

const tabs = [
  { label: "新发现", count: 1 },
  { label: "AI分析中", count: 2 },
  { label: "跟踪中", count: 1 },
  { label: "已完成", count: 1 },
]

function scoreRingColor(score: number): string {
  if (score >= 90) return "oklch(72% 0.2 150)"
  if (score >= 80) return "oklch(78% 0.15 220)"
  if (score >= 70) return "oklch(78% 0.16 75)"
  return "oklch(65% 0.2 25)"
}

function scoreTextClass(score: number): string {
  if (score >= 90) return "text-green-400"
  if (score >= 80) return "text-electric"
  if (score >= 70) return "text-amber"
  return "text-coral"
}

export default function DistressRadar() {
  return (
    <div className="space-y-5 animate-slide-up">
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
        <span className="badge badge-green">
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
            className="h-10 w-full rounded-xl border border-border/50 bg-secondary pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-electric/50 focus:outline-none focus:ring-2 focus:ring-electric/20 transition-all"
          />
        </div>
        <button className="btn-ghost flex h-10 items-center gap-1.5">
          <Filter className="h-3.5 w-3.5" />
          筛选
        </button>
      </div>

      <div className="flex gap-1 border-b border-border/30 pb-0">
        {tabs.map((tab, i) => (
          <button
            key={tab.label}
            className={cn(
              "tab-underline px-4 py-2 text-sm font-medium transition-colors",
              i === 0
                ? "active text-electric"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {tab.label}
            <span className="ml-1.5 text-xs opacity-60">{tab.count}</span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-8 stagger-children grid grid-cols-2 gap-4">
          {radarTargets.map((t) => (
            <div
              key={t.code}
              className="card hover-lift relative"
            >
              <span className={cn("absolute right-4 top-4", tagBadge[t.tag])}>
                {t.tag}
              </span>

              <h3 className="text-base font-bold">{t.name}</h3>
              <p className="text-xs text-muted-foreground">{t.code}</p>

              <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
                <span className="badge badge-muted">{t.status}</span>
                <span className="badge badge-muted">{t.source}</span>
              </div>

              <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
                <span>{t.industry}</span>
                <span>市值 {t.marketCap}</span>
              </div>

              <div className="mt-3 flex items-center gap-3">
                <div className="score-ring">
                  <svg width="56" height="56" viewBox="0 0 56 56">
                    <circle
                      cx="28"
                      cy="28"
                      r="22"
                      fill="none"
                      stroke="oklch(22% 0.01 260)"
                      strokeWidth="4"
                    />
                    <circle
                      cx="28"
                      cy="28"
                      r="22"
                      fill="none"
                      stroke={scoreRingColor(t.score)}
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeDasharray={`${(t.score / 100) * 138.2} 138.2`}
                    />
                  </svg>
                  <span className={cn("score-ring-text", scoreTextClass(t.score))}>
                    {t.score}
                  </span>
                </div>
                <div>
                  <span className="text-xs text-muted-foreground">AI匹配度</span>
                  <p className={cn("text-sm font-semibold", scoreTextClass(t.score))}>
                    {t.score >= 90 ? "极高" : t.score >= 80 ? "高" : t.score >= 70 ? "中" : "低"}匹配
                  </p>
                </div>
              </div>

              <p className="mt-2 text-xs leading-relaxed text-muted-foreground line-clamp-2">
                {t.description}
              </p>

              <div className="mt-4 flex gap-2">
                <button className="btn-primary flex-1 flex items-center justify-center gap-1 py-1.5 text-xs">
                  <Zap className="h-3 w-3" />
                  启动AI尽调
                </button>
                <button className="btn-secondary flex-1 flex items-center justify-center gap-1 py-1.5 text-xs">
                  <Eye className="h-3 w-3" />
                  加入关注
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="col-span-4 space-y-4">
          <div className="card">
            <h2 className="mb-4 text-sm font-semibold">数据源监控</h2>
            <div className="space-y-3">
              {dataSources.map((ds) => (
                <div key={ds.name} className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">{ds.name}</span>
                  <div className="flex items-center gap-2">
                    <div className="progress-bar w-16" style={{ height: "4px" }}>
                      <div
                        className="progress-bar-fill"
                        style={{
                          width: `${Math.min((ds.count / 1600) * 100, 100)}%`,
                        }}
                      />
                    </div>
                    <span className="w-10 text-right font-mono text-muted-foreground">
                      {ds.count.toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card-highlight gradient-border">
            <div className="grid grid-cols-3 gap-3 text-center">
              <div>
                <p className="text-xl font-bold text-electric glow-text-blue">
                  {dataSources.reduce((s, d) => s + d.count, 0).toLocaleString()}
                </p>
                <p className="mt-0.5 text-[10px] text-muted-foreground">
                  今日扫描公告
                </p>
              </div>
              <div>
                <p className="text-xl font-bold text-amber glow-text-amber">12</p>
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
