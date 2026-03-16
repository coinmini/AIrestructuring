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

const iconGradients: Record<string, string> = {
  FileText: "bg-gradient-to-br from-electric/25 to-electric/10 text-electric",
  Scale: "bg-gradient-to-br from-amber/25 to-amber/10 text-amber",
  Calculator: "bg-gradient-to-br from-teal/25 to-teal/10 text-teal",
  Shield: "bg-gradient-to-br from-coral/25 to-coral/10 text-coral",
  TrendingUp: "bg-gradient-to-br from-green-500/25 to-green-500/10 text-green-400",
  Users: "bg-gradient-to-br from-purple-500/25 to-purple-500/10 text-purple-400",
  Radio: "bg-gradient-to-br from-amber/25 to-amber/10 text-amber",
  BookOpen: "bg-gradient-to-br from-electric/25 to-electric/10 text-electric",
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
    <div className="space-y-5 animate-slide-up">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight glow-text-blue">
            智能装备库
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            8大AI工具模块，覆盖破产重整投资全流程
          </p>
        </div>
        <div className="flex gap-4">
          {(["all", "available"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "tab-underline text-xs font-medium transition-colors",
                filter === f
                  ? "active text-electric"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {f === "all" ? "全部" : "可用"}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 stagger-children">
        {toolkitModules.map((mod) => {
          const Icon = iconMap[mod.icon] ?? FileText
          return (
            <div
              key={mod.name}
              className="card hover-lift flex flex-col"
            >
              <div className="flex items-start gap-3 mb-3">
                <div
                  className={cn(
                    "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
                    iconGradients[mod.icon]
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
                    className="badge badge-muted"
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
                <span className="text-border">|</span>
                <span>
                  <span className="font-semibold text-muted-foreground">
                    {mod.usageCount}
                  </span>
                  {" "}次使用
                </span>
              </div>

              <p className="text-[10px] text-muted-foreground/60 mb-3">
                功能演示中，实际部署后可直接使用
              </p>

              <button className="btn-secondary mt-auto w-full !py-1.5 !text-xs">
                使用
              </button>
            </div>
          )
        })}
      </div>

      <div className="card-glass">
        <h2 className="mb-3 text-sm font-semibold flex items-center gap-2">
          <Clock className="h-4 w-4 text-electric" />
          最近使用记录
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-border/50 text-muted-foreground">
                <th className="pb-2 text-left font-medium">工具</th>
                <th className="pb-2 text-left font-medium">任务</th>
                <th className="pb-2 text-left font-medium">使用人</th>
              </tr>
            </thead>
            <tbody>
              {recentUsage.map((item) => (
                <tr
                  key={item.task}
                  className="table-row-hover border-b border-border/30 last:border-0"
                >
                  <td className="py-2.5 font-medium text-electric">{item.tool}</td>
                  <td className="py-2.5 text-foreground/80">{item.task}</td>
                  <td className="py-2.5 text-muted-foreground">{item.user}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
