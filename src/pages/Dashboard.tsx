import {
  LayoutDashboard,
  TrendingUp,
  Briefcase,
  AlertTriangle,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
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
  Area,
  AreaChart,
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
  舆情引擎: "badge badge-teal",
  AI尽调官: "badge badge-electric",
  困境雷达: "badge badge-amber",
  投后智管: "badge badge-muted",
  风控引擎: "badge badge-coral",
}

const riskBadge: Record<string, string> = {
  低: "badge badge-green",
  中: "badge badge-amber",
  高: "badge badge-coral",
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
        <span className="badge badge-green">
          <span className="status-dot status-dot-green" />
          实时模式
        </span>
      </div>

      <div className="stagger-children grid grid-cols-4 gap-4">
        <StatCard
          icon={<Briefcase className="h-5 w-5 text-electric" />}
          iconBg="bg-electric/10"
          label="在管项目"
          value={`${dashboardStats.projects}个`}
          change="较上月 +2"
          positive
        />
        <StatCard
          icon={<TrendingUp className="h-5 w-5 text-teal" />}
          iconBg="bg-teal/10"
          label="在管资产规模"
          value={`${dashboardStats.aum}亿元`}
          change="+5.2%"
          positive
        />
        <StatCard
          icon={<Activity className="h-5 w-5 text-amber" />}
          iconBg="bg-amber/10"
          label="平均IRR"
          value={`${dashboardStats.avgIrr}%`}
          change="+3.1%"
          positive
        />
        <StatCard
          icon={<AlertTriangle className="h-5 w-5 text-coral" />}
          iconBg="bg-coral/10"
          label="风险预警"
          value={`${dashboardStats.alerts}条`}
          change="需关注"
          positive={false}
        />
      </div>

      <div className="grid grid-cols-10 gap-4">
        <div className="col-span-7 card animate-fade-in">
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
            <AreaChart data={investmentTrend}>
              <defs>
                <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="oklch(78% 0.15 220)" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="oklch(78% 0.15 220)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis
                tick={{ fontSize: 11 }}
                tickFormatter={(v: number) => `${v}%`}
              />
              <Tooltip contentStyle={{}} wrapperClassName="chart-tooltip" />
              <Area
                type="monotone"
                dataKey="收益率"
                stroke="oklch(78% 0.15 220)"
                strokeWidth={2}
                fill="url(#areaGradient)"
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
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="col-span-3 card animate-fade-in">
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
              <Tooltip contentStyle={{}} wrapperClassName="chart-tooltip" />
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
        <div className="col-span-7 card animate-fade-in">
          <div className="mb-3 flex items-center gap-2">
            <h2 className="text-sm font-semibold">项目管线</h2>
            <span className="badge badge-electric">
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
                    className="table-row-hover border-b border-border/30 last:border-0"
                  >
                    <td className="py-2.5 font-medium">{p.name}</td>
                    <td className="py-2.5 text-muted-foreground">
                      {p.industry}
                    </td>
                    <td className="py-2.5 text-muted-foreground">{p.stage}</td>
                    <td className="py-2.5">
                      <div className="flex items-center gap-2">
                        <div className="progress-bar w-20">
                          <div
                            className={cn(
                              "progress-bar-fill",
                              p.progress < 40 && "progress-bar-fill-coral",
                              p.progress >= 40 && p.progress < 70 && "progress-bar-fill-amber"
                            )}
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
                      <span className={riskBadge[p.risk]}>
                        {p.risk}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="col-span-5 card animate-fade-in">
          <h2 className="mb-3 text-sm font-semibold flex items-center gap-2">
            <Activity className="h-4 w-4 text-electric" />
            AI 实时动态
          </h2>
          <div className="space-y-1">
            {aiActivities.map((a, i) => (
              <div key={i} className="feed-item rounded-r-lg py-2.5 pr-3 flex gap-3 text-xs">
                <span
                  className={cn(
                    "mt-0.5 shrink-0",
                    sourceColors[a.source] ?? "badge badge-muted"
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

      <div className="card animate-fade-in">
        <h2 className="mb-4 text-sm font-semibold">
          市场概况（年度重整数据）
        </h2>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={marketData}>
            <defs>
              <linearGradient id="barGrad1" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="oklch(78% 0.15 220)" stopOpacity={1} />
                <stop offset="100%" stopColor="oklch(78% 0.15 220)" stopOpacity={0.6} />
              </linearGradient>
              <linearGradient id="barGrad2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="oklch(72% 0.14 175)" stopOpacity={1} />
                <stop offset="100%" stopColor="oklch(72% 0.14 175)" stopOpacity={0.6} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" tick={{ fontSize: 11 }} />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip contentStyle={{}} wrapperClassName="chart-tooltip" />
            <Legend wrapperStyle={{ fontSize: 11 }} />
            <Bar dataKey="重整受理" fill="url(#barGrad1)" radius={[3, 3, 0, 0]} />
            <Bar dataKey="重整批准" fill="url(#barGrad2)" radius={[3, 3, 0, 0]} />
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
  iconBg,
  label,
  value,
  change,
  positive,
}: {
  icon: React.ReactNode
  iconBg: string
  label: string
  value: string
  change: string
  positive: boolean
}) {
  return (
    <div className="card-highlight gradient-border">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-xs text-muted-foreground">{label}</span>
        <div className={cn("stat-card-icon", iconBg)}>
          {icon}
        </div>
      </div>
      <p className="text-2xl font-bold">{value}</p>
      {change && (
        <p
          className={cn(
            "mt-1.5 flex items-center gap-1 text-xs font-medium",
            positive ? "text-green-400" : "text-coral"
          )}
        >
          {positive ? (
            <ArrowUpRight className="h-3.5 w-3.5" />
          ) : (
            <ArrowDownRight className="h-3.5 w-3.5" />
          )}
          {change}
        </p>
      )}
    </div>
  )
}
