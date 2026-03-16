import {
  LayoutDashboard,
  TrendingUp,
  Briefcase,
  AlertTriangle,
  Activity,
} from "lucide-react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  ResponsiveContainer,
  Legend,
} from "recharts"
import { cn } from "../lib/utils"
import {
  dashboardStats,
  investmentTrend,
  portfolioDistribution,
  pipelineProjects,
  aiActivities,
  marketData,
} from "../data/mock-data"

const sourceColors: Record<string, string> = {
  舆情引擎: "bg-teal/20 text-teal border-teal/30",
  AI尽调官: "bg-electric/20 text-electric border-electric/30",
  困境雷达: "bg-amber/20 text-amber border-amber/30",
  投后智管: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  风控引擎: "bg-coral/20 text-coral border-coral/30",
}

const riskStyles: Record<string, string> = {
  低: "bg-green-500/20 text-green-400",
  中: "bg-amber/20 text-amber",
  高: "bg-coral/20 text-coral",
}

function scoreColor(score: number): string {
  if (score >= 85) return "text-green-400"
  if (score >= 70) return "text-amber"
  return "text-coral"
}

export default function Dashboard() {
  return (
    <div className="space-y-5">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight glow-text-blue">
            决策驾驶舱
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            COMMAND CENTER · 数据更新于 2026-03-08 14:32 CST
          </p>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-green-500/15 px-3 py-1 text-xs font-medium text-green-400 border border-green-500/30">
          <span className="status-dot status-dot-green" />
          实时模式
        </span>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <StatCard
          icon={<Briefcase className="h-4 w-4 text-electric" />}
          label="在管项目"
          value={`${dashboardStats.projects}个`}
          change="较上月 +2"
          positive
        />
        <StatCard
          icon={<TrendingUp className="h-4 w-4 text-electric" />}
          label="在管资产规模"
          value={`${dashboardStats.aum}亿元`}
          change="+5.2%"
          positive
        />
        <StatCard
          icon={<Activity className="h-4 w-4 text-electric" />}
          label="平均IRR"
          value={`${dashboardStats.avgIrr}%`}
          change="+3.1%"
          positive
        />
        <StatCard
          icon={<AlertTriangle className="h-4 w-4 text-coral" />}
          label="风险预警"
          value={`${dashboardStats.alerts}条`}
          change=""
          positive={false}
          coral
        />
      </div>

      <div className="grid grid-cols-10 gap-4">
        <div className="col-span-7 bg-card rounded-lg border border-border/50 p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-semibold">投资收益趋势</h2>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <span className="inline-block h-2 w-2 rounded-full bg-electric" />
                盛达组合
              </span>
              <span className="flex items-center gap-1.5">
                <span className="inline-block h-2 w-2 rounded-full bg-muted-foreground" />
                行业基准
              </span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={investmentTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis
                tick={{ fontSize: 11 }}
                tickFormatter={(v: number) => `${v}%`}
              />
              <Tooltip
                contentStyle={{
                  background: "oklch(16% 0.015 260)",
                  border: "1px solid oklch(25% 0.015 260)",
                  borderRadius: 8,
                  fontSize: 12,
                }}
              />
              <Line
                type="monotone"
                dataKey="收益率"
                stroke="oklch(78% 0.15 220)"
                strokeWidth={2}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="基准"
                stroke="oklch(60% 0.02 250)"
                strokeWidth={2}
                strokeDasharray="4 4"
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="col-span-3 bg-card rounded-lg border border-border/50 p-5">
          <h2 className="mb-4 text-sm font-semibold">投资组合分布</h2>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={portfolioDistribution}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                dataKey="value"
                stroke="none"
              >
                {portfolioDistribution.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  background: "oklch(16% 0.015 260)",
                  border: "1px solid oklch(25% 0.015 260)",
                  borderRadius: 8,
                  fontSize: 12,
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground">
            {portfolioDistribution.map((s) => (
              <span key={s.name} className="flex items-center gap-1">
                <span
                  className="inline-block h-2 w-2 rounded-full"
                  style={{ background: s.color }}
                />
                {s.name} {s.value}%
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-7 bg-card rounded-lg border border-border/50 p-5">
          <div className="mb-3 flex items-center gap-2">
            <h2 className="text-sm font-semibold">项目管线</h2>
            <span className="rounded-full bg-electric/15 px-2 py-0.5 text-[10px] font-medium text-electric">
              {pipelineProjects.length}
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-border/50 text-muted-foreground">
                  <th className="pb-2 text-left font-medium">标的</th>
                  <th className="pb-2 text-left font-medium">行业</th>
                  <th className="pb-2 text-left font-medium">阶段</th>
                  <th className="pb-2 text-left font-medium">进度</th>
                  <th className="pb-2 text-left font-medium">AI评分</th>
                  <th className="pb-2 text-left font-medium">风险</th>
                </tr>
              </thead>
              <tbody>
                {pipelineProjects.map((p) => (
                  <tr
                    key={p.name}
                    className="border-b border-border/30 last:border-0"
                  >
                    <td className="py-2.5 font-medium">{p.name}</td>
                    <td className="py-2.5 text-muted-foreground">
                      {p.industry}
                    </td>
                    <td className="py-2.5 text-muted-foreground">{p.stage}</td>
                    <td className="py-2.5">
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-20 rounded-full bg-secondary">
                          <div
                            className="h-full rounded-full bg-electric"
                            style={{ width: `${p.progress}%` }}
                          />
                        </div>
                        <span className="text-muted-foreground">
                          {p.progress}%
                        </span>
                      </div>
                    </td>
                    <td className={cn("py-2.5 font-semibold", scoreColor(p.score))}>
                      {p.score}
                    </td>
                    <td className="py-2.5">
                      <span
                        className={cn(
                          "rounded-full px-2 py-0.5 text-[10px] font-medium",
                          riskStyles[p.risk]
                        )}
                      >
                        {p.risk}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="col-span-5 bg-card rounded-lg border border-border/50 p-5">
          <h2 className="mb-3 text-sm font-semibold flex items-center gap-2">
            <Activity className="h-4 w-4 text-electric" />
            AI 实时动态
          </h2>
          <div className="space-y-3">
            {aiActivities.map((a, i) => (
              <div key={i} className="flex gap-3 text-xs">
                <span
                  className={cn(
                    "mt-0.5 shrink-0 rounded border px-1.5 py-0.5 text-[10px] font-medium",
                    sourceColors[a.source] ?? "bg-secondary text-muted-foreground"
                  )}
                >
                  {a.source}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-foreground/90 leading-relaxed">
                    {a.content}
                  </p>
                  <p className="mt-0.5 text-muted-foreground">{a.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-card rounded-lg border border-border/50 p-5">
        <h2 className="mb-4 text-sm font-semibold">
          市场概况（年度重整数据）
        </h2>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={marketData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" tick={{ fontSize: 11 }} />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip
              contentStyle={{
                background: "oklch(16% 0.015 260)",
                border: "1px solid oklch(25% 0.015 260)",
                borderRadius: 8,
                fontSize: 12,
              }}
            />
            <Legend wrapperStyle={{ fontSize: 11 }} />
            <Bar dataKey="重整受理" fill="oklch(78% 0.15 220)" radius={[3, 3, 0, 0]} />
            <Bar dataKey="重整批准" fill="oklch(72% 0.14 175)" radius={[3, 3, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
        <p className="mt-3 text-xs text-muted-foreground leading-relaxed">
          截至2026年3月，全国累计受理上市公司破产重整案件91件，批准80件。2025年受理数量同比增长22%，其中制造业占比最高达38%。
        </p>
      </div>
    </div>
  )
}

function StatCard({
  icon,
  label,
  value,
  change,
  positive,
  coral,
}: {
  icon: React.ReactNode
  label: string
  value: string
  change: string
  positive: boolean
  coral?: boolean
}) {
  return (
    <div className="bg-card rounded-lg border border-border/50 p-4">
      <div className="mb-2 flex items-center gap-2 text-xs text-muted-foreground">
        {icon}
        {label}
      </div>
      <p className={cn("text-xl font-bold", coral && "text-coral")}>{value}</p>
      {change && (
        <p
          className={cn(
            "mt-1 text-xs",
            positive ? "text-green-400" : "text-coral"
          )}
        >
          {change}
        </p>
      )}
    </div>
  )
}
