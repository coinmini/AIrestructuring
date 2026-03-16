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

const riskLevelStyles: Record<string, string> = {
  高风险: "bg-coral/20 text-coral border-coral/30",
  中风险: "bg-amber/20 text-amber border-amber/30",
  低风险: "bg-green-500/20 text-green-400 border-green-500/30",
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
          <button className="flex items-center gap-1.5 rounded-lg border border-border/50 bg-secondary px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <Upload className="h-3.5 w-3.5" />
            上传文档
          </button>
          <button className="flex items-center gap-1.5 rounded-lg bg-electric/15 px-4 py-2 text-sm font-medium text-electric border border-electric/30 hover:bg-electric/25 transition-colors">
            <Play className="h-3.5 w-3.5" />
            启动尽调
          </button>
        </div>
      </div>

      <div className="bg-card rounded-lg border border-electric/20 p-5">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-base font-bold">
              *ST惠程 (002168) 尽调项目
            </h2>
            <div className="mt-1.5 flex items-center gap-2 text-xs text-muted-foreground">
              <span className="rounded bg-secondary px-1.5 py-0.5">电力设备</span>
              <span>·</span>
              <span className="rounded bg-secondary px-1.5 py-0.5">预重整阶段</span>
              <span>·</span>
              <span>创建于 2026-03-06</span>
            </div>
          </div>
          <span className="rounded-full bg-electric/15 px-3 py-1 text-xs font-medium text-electric border border-electric/30">
            尽调进行中
          </span>
        </div>

        <div className="mt-4 flex items-center gap-6">
          <div className="flex-1">
            <div className="mb-1 flex items-center justify-between text-xs">
              <span className="text-muted-foreground">总体进度</span>
              <span className="font-medium text-electric">68%</span>
            </div>
            <div className="h-2 rounded-full bg-secondary">
              <div className="h-full w-[68%] rounded-full bg-electric" />
            </div>
          </div>
          <span className="text-xs text-coral font-medium">已发现风险 5项</span>
          <div className="flex gap-2 text-xs">
            <span className="rounded-full bg-green-500/15 px-2.5 py-0.5 text-green-400 border border-green-500/30">
              已完成 2
            </span>
            <span className="rounded-full bg-electric/15 px-2.5 py-0.5 text-electric border border-electric/30">
              进行中 1
            </span>
            <span className="rounded-full bg-secondary px-2.5 py-0.5 text-muted-foreground border border-border/50">
              待启动 1
            </span>
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        {ddDimensions.map((dim, i) => (
          <button
            key={dim.name}
            onClick={() => setActiveTab(i)}
            className={cn(
              "flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium transition-colors",
              i === activeTab
                ? "bg-electric/15 text-electric border border-electric/30"
                : "text-muted-foreground hover:text-foreground border border-transparent"
            )}
          >
            {dimensionIcons[dim.icon]}
            {dim.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-7 bg-card rounded-lg border border-border/50 p-5">
          <h2 className="text-sm font-semibold">{activeDim.name}</h2>
          <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
            {activeDim.description}
          </p>

          <div className="mt-4 space-y-2.5">
            {activeDim.items.map((item, i) => (
              <div
                key={item}
                className="flex items-center gap-3 rounded-lg bg-secondary/50 px-3 py-2.5 text-sm"
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
              <span className="text-coral">
                高风险 {ddRiskFindings.filter((r) => r.source === activeDim.name && r.level === "高风险").length}
              </span>
              <span className="text-amber">
                中风险 {ddRiskFindings.filter((r) => r.source === activeDim.name && r.level === "中风险").length}
              </span>
              <span className="text-green-400">
                低风险 {ddRiskFindings.filter((r) => r.source === activeDim.name && r.level === "低风险").length}
              </span>
            </div>
          </div>
        </div>

        <div className="col-span-5 bg-card rounded-lg border border-border/50 p-5">
          <h2 className="mb-4 text-sm font-semibold">风险发现 Top 5</h2>
          <div className="space-y-3">
            {ddRiskFindings.map((r, i) => (
              <div
                key={i}
                className="rounded-lg bg-secondary/50 p-3"
              >
                <div className="flex items-center gap-2">
                  <span
                    className={cn(
                      "rounded border px-1.5 py-0.5 text-[10px] font-medium",
                      riskLevelStyles[r.level]
                    )}
                  >
                    {r.level}
                  </span>
                  <span className="text-xs font-medium">{r.title}</span>
                </div>
                <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground line-clamp-2">
                  {r.detail}
                </p>
                <span className="mt-1 inline-block rounded bg-secondary px-1.5 py-0.5 text-[10px] text-muted-foreground">
                  {r.source}
                </span>
              </div>
            ))}
          </div>
          <button className="mt-4 flex w-full items-center justify-center gap-1.5 rounded-lg border border-border/50 bg-secondary py-2 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors">
            <Download className="h-3.5 w-3.5" />
            导出报告
          </button>
        </div>
      </div>
    </div>
  )
}
