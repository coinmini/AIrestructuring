import { useState } from "react"
import {
  FileText,
  Scale,
  Calculator,
  Shield,
  TrendingUp,
  Users,
  Radio,
  BookOpen,
  Clock,
} from "lucide-react"
import { cn } from "../lib/utils"
import { toolkitModules } from "../data/mock-data"

const iconMap: Record<string, React.ElementType> = {
  FileText,
  Scale,
  Calculator,
  Shield,
  TrendingUp,
  Users,
  Radio,
  BookOpen,
}

const iconColors: Record<string, string> = {
  FileText: "bg-electric/15 text-electric",
  Scale: "bg-amber/15 text-amber",
  Calculator: "bg-teal/15 text-teal",
  Shield: "bg-coral/15 text-coral",
  TrendingUp: "bg-green-500/15 text-green-400",
  Users: "bg-purple-500/15 text-purple-400",
  Radio: "bg-amber/15 text-amber",
  BookOpen: "bg-electric/15 text-electric",
}

const recentUsage = [
  { tool: "法规智能检索", task: "上市公司预重整制度", user: "张总" },
  { tool: "智能文书生成", task: "生成*ST惠程重整计划草案", user: "李律师" },
  { tool: "财务深度分析", task: "ST聆达2024年报分析", user: "王分析师" },
  { tool: "风险扫描引擎", task: "扫描棒杰股份隐性债务", user: "赵经理" },
]

export default function SmartToolkit() {
  const [filter, setFilter] = useState<"all" | "available">("all")

  return (
    <div className="space-y-5">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight glow-text-blue">
            智能装备库
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            8大AI工具模块，覆盖破产重整投资全流程
          </p>
        </div>
        <div className="flex rounded-lg border border-border/50 p-0.5">
          {(["all", "available"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "rounded-md px-3 py-1 text-xs font-medium transition-colors",
                filter === f
                  ? "bg-electric/15 text-electric"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {f === "all" ? "全部" : "可用"}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {toolkitModules.map((mod) => {
          const Icon = iconMap[mod.icon] ?? FileText
          return (
            <div
              key={mod.name}
              className="bg-card rounded-lg border border-border/50 p-5 flex flex-col"
            >
              <div className="flex items-start gap-3 mb-3">
                <div
                  className={cn(
                    "flex h-10 w-10 shrink-0 items-center justify-center rounded-full",
                    iconColors[mod.icon]
                  )}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm font-bold">{mod.name}</h3>
                  <span className="text-[10px] text-muted-foreground">
                    {mod.category}
                  </span>
                </div>
              </div>

              <p className="text-xs text-foreground/70 leading-relaxed mb-3">
                {mod.description}
              </p>

              <div className="flex flex-wrap gap-1 mb-3">
                {mod.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-secondary px-2 py-0.5 text-[10px] text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                <span>
                  准确率{" "}
                  <span className="font-semibold text-green-400">
                    {mod.accuracy}%
                  </span>
                </span>
                <span>
                  <span className="font-semibold text-foreground/80">
                    {mod.usageCount}
                  </span>
                  次
                </span>
              </div>

              <p className="text-[10px] text-muted-foreground/60 mb-3">
                功能演示中，实际部署后可直接使用
              </p>

              <button className="mt-auto w-full rounded-lg border border-electric/40 py-1.5 text-xs font-medium text-electric hover:bg-electric/10 transition-colors">
                使用
              </button>
            </div>
          )
        })}
      </div>

      <div className="bg-card rounded-lg border border-border/50 p-5">
        <h2 className="mb-3 text-sm font-semibold flex items-center gap-2">
          <Clock className="h-4 w-4 text-electric" />
          最近使用记录
        </h2>
        <div className="grid grid-cols-4 gap-3">
          {recentUsage.map((item) => (
            <div
              key={item.task}
              className="rounded-lg border border-border/30 bg-secondary/30 px-3 py-2.5"
            >
              <p className="text-xs font-medium text-electric">{item.tool}</p>
              <p className="mt-1 text-xs text-foreground/80 truncate">
                {item.task}
              </p>
              <p className="mt-0.5 text-[10px] text-muted-foreground">
                {item.user}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
