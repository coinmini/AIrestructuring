import {
  Upload,
  Play,
  BarChart3,
  Scale,
  Building,
  TrendingUp,
  CheckCircle2,
  Loader2,
  Circle,
  Download,
} from "lucide-react"
import { cn } from "../lib/utils"
import { ddDimensions, ddRiskFindings } from "../data/mock-data"
import { useState } from "react"

const dimensionIcons: Record<string, React.ReactNode> = {
  BarChart3: <BarChart3 className="h-4 w-4" />,
  Scale: <Scale className="h-4 w-4" />,
  Building: <Building className="h-4 w-4" />,
  TrendingUp: <TrendingUp className="h-4 w-4" />,
}

const itemStatuses = [
  "done",
  "done",
  "progress",
  "pending",
  "pending",
] as const

const statusIcons: Record<string, React.ReactNode> = {
  done: <CheckCircle2 className="h-4 w-4 text-green-400" />,
  progress: <Loader2 className="h-4 w-4 text-electric animate-spin" />,
  pending: <Circle className="h-4 w-4 text-muted-foreground" />,
}

const riskBadge: Record<string, string> = {
  高风险: "badge badge-coral",
  中风险: "badge badge-amber",
  低风险: "badge badge-green",
}

export default function DueDiligence() {
  const [activeTab, setActiveTab] = useState(0)
  const activeDim = ddDimensions[activeTab]

  const highCount = ddRiskFindings.filter((r) => r.level === "高风险").length
  const midCount = ddRiskFindings.filter((r) => r.level === "中风险").length
  const lowCount = ddRiskFindings.filter((r) => r.level === "低风险").length

  return (
    <div className="space-y-5">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight glow-text-blue">
            AI 尽调官
          </h1>
          <p className="mt-0.5 text-xs text-muted-foreground">
            基于 OpenClaw 智能体
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            自动化深度尽调，覆盖财务、法律、资产、业务四大维度
          </p>
        </div>
        <div className="flex gap-2">
          <button className="btn-secondary flex items-center gap-1.5 py-2 text-sm">
            <Upload className="h-3.5 w-3.5" />
            上传文档
          </button>
          <button className="btn-primary flex items-center gap-1.5 py-2 text-sm">
            <Play className="h-3.5 w-3.5" />
            启动尽调
          </button>
        </div>
      </div>

      <div className="card-highlight gradient-border">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-base font-bold">
              *ST惠程 (002168) 尽调项目
            </h2>
            <div className="mt-1.5 flex items-center gap-2 text-xs text-muted-foreground">
              <span className="badge badge-muted">电力设备</span>
              <span>·</span>
              <span className="badge badge-muted">预重整阶段</span>
              <span>·</span>
              <span>创建于 2026-03-06</span>
            </div>
          </div>
          <span className="badge badge-electric">
            <span className="status-dot status-dot-green" style={{ width: 6, height: 6 }} />
            尽调进行中
          </span>
        </div>

        <div className="mt-4 flex items-center gap-6">
          <div className="flex-1">
            <div className="mb-1.5 flex items-center justify-between text-xs">
              <span className="text-muted-foreground">总体进度</span>
              <span className="font-semibold text-electric">68%</span>
            </div>
            <div className="progress-bar" style={{ height: "8px" }}>
              <div className="progress-bar-fill" style={{ width: "68%" }} />
            </div>
          </div>
          <span className="badge badge-coral">已发现风险 5项</span>
          <div className="flex gap-2 text-xs">
            <span className="badge badge-green">已完成 2</span>
            <span className="badge badge-electric">进行中 1</span>
            <span className="badge badge-muted">待启动 1</span>
          </div>
        </div>
      </div>

      <div className="flex gap-1 border-b border-border/30 pb-0">
        {ddDimensions.map((dim, i) => (
          <button
            key={dim.name}
            onClick={() => setActiveTab(i)}
            className={cn(
              "tab-underline flex items-center gap-1.5 px-4 py-2 text-sm font-medium transition-colors",
              i === activeTab
                ? "active text-electric"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {dimensionIcons[dim.icon]}
            {dim.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-7 card animate-fade-in">
          <h2 className="text-sm font-semibold">{activeDim.name}</h2>
          <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
            {activeDim.description}
          </p>

          <div className="mt-4 stagger-children space-y-2.5">
            {activeDim.items.map((item, i) => (
              <div
                key={item}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all",
                  itemStatuses[i] === "done"
                    ? "bg-green-500/5 border border-green-500/10"
                    : itemStatuses[i] === "progress"
                      ? "bg-electric/5 border border-electric/10"
                      : "bg-secondary/50 border border-transparent"
                )}
              >
                {statusIcons[itemStatuses[i]]}
                <span
                  className={cn(
                    itemStatuses[i] === "pending" && "text-muted-foreground"
                  )}
                >
                  {item}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-4 flex items-center justify-between text-xs">
            <span className="text-muted-foreground">
              发现 {activeDim.name} {ddRiskFindings.filter((r) => r.source === activeDim.name).length} 个风险
            </span>
            <div className="flex gap-3">
              <span className="badge badge-coral">
                高风险 {ddRiskFindings.filter((r) => r.source === activeDim.name && r.level === "高风险").length}
              </span>
              <span className="badge badge-amber">
                中风险 {ddRiskFindings.filter((r) => r.source === activeDim.name && r.level === "中风险").length}
              </span>
              <span className="badge badge-green">
                低风险 {ddRiskFindings.filter((r) => r.source === activeDim.name && r.level === "低风险").length}
              </span>
            </div>
          </div>
        </div>

        <div className="col-span-5 card animate-fade-in">
          <h2 className="mb-4 text-sm font-semibold">风险发现 Top 5</h2>
          <div className="space-y-3">
            {ddRiskFindings.map((r, i) => (
              <div
                key={i}
                className="rounded-lg bg-secondary/50 p-3 border border-border/30 hover:border-border/60 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <span className={riskBadge[r.level]}>
                    {r.level}
                  </span>
                  <span className="text-xs font-medium">{r.title}</span>
                </div>
                <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground line-clamp-2">
                  {r.detail}
                </p>
                <span className="badge badge-muted mt-1.5">
                  {r.source}
                </span>
              </div>
            ))}
          </div>
          <button className="btn-secondary mt-4 flex w-full items-center justify-center gap-1.5 py-2 text-xs">
            <Download className="h-3.5 w-3.5" />
            导出报告
          </button>
        </div>
      </div>
    </div>
  )
}
