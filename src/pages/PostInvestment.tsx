import { LineChart as LineChartIcon, AlertTriangle, CheckCircle, Info, TrendingUp, BarChart3 } from "lucide-react"
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, ComposedChart } from "recharts"
import { cn } from "../lib/utils"
import { postInvestmentProjects, stockPriceData, postAlerts } from "../data/mock-data"

const riskBadgeMap: Record<string, string> = {
  "低": "badge badge-teal",
  "中": "badge badge-amber",
  "高": "badge badge-coral",
}

const ddBadgeMap: Record<string, string> = {
  "达标": "badge badge-green",
  "预警": "badge badge-coral",
  "进行中": "badge badge-amber",
}

const alertConfig: Record<string, { icon: typeof AlertTriangle; cls: string; bg: string }> = {
  warning: { icon: AlertTriangle, cls: "text-amber", bg: "bg-amber/10" },
  success: { icon: CheckCircle, cls: "text-teal", bg: "bg-teal/10" },
  info: { icon: Info, cls: "text-electric", bg: "bg-electric/10" },
}

const lineColors = ["oklch(78% 0.15 220)", "oklch(72% 0.14 175)", "oklch(65% 0.2 25)", "oklch(78% 0.16 75)"]
const companies = ["ST金科", "ST金刚", "*ST东易", "ST宁科"] as const

const sentimentDays = ["03/10", "03/11", "03/12", "03/13", "03/14", "03/15", "03/16"]
const sentimentData = sentimentDays.map((day) => ({
  day,
  正面: Math.round(40 + Math.random() * 30),
  负面: Math.round(10 + Math.random() * 20),
  中性: Math.round(20 + Math.random() * 15),
}))

export default function PostInvestment() {
  return (
    <div className="space-y-5">
      <div className="animate-slide-up">
        <div className="flex items-center gap-2">
          <LineChartIcon className="w-5 h-5 text-electric" />
          <h2 className="text-lg font-bold text-foreground">投后智管</h2>
        </div>
        <p className="text-xs text-muted-foreground mt-1">实时监控标的公司动态，AI智能预警与退出时机推荐</p>
      </div>

      <div className="card animate-slide-up overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-border/50">
              <th className="text-left py-2 text-muted-foreground font-medium">标的公司</th>
              <th className="text-left py-2 text-muted-foreground font-medium">投资金额</th>
              <th className="text-left py-2 text-muted-foreground font-medium">当前估值</th>
              <th className="text-left py-2 text-muted-foreground font-medium">回报率</th>
              <th className="text-left py-2 text-muted-foreground font-medium">尽调状态</th>
              <th className="text-left py-2 text-muted-foreground font-medium">风险</th>
              <th className="text-left py-2 text-muted-foreground font-medium">AI建议</th>
            </tr>
          </thead>
          <tbody>
            {postInvestmentProjects.map((p) => (
              <tr key={p.name} className="border-b border-border/30 table-row-hover">
                <td className="py-3">
                  <span className="font-medium text-foreground">{p.name}</span>
                  <span className="text-muted-foreground ml-1.5">{p.industry}</span>
                </td>
                <td className="py-3 font-mono text-foreground">{p.investAmount}</td>
                <td className="py-3 font-mono text-foreground">{p.currentValue}</td>
                <td className="py-3">
                  <span className={cn(
                    "font-mono font-bold",
                    p.returnRate >= 0 ? "text-teal glow-text-blue" : "text-coral",
                  )} style={p.returnRate < 0 ? { textShadow: "0 0 10px oklch(65% 0.2 25 / 0.5)" } : {}}>
                    {p.returnRate >= 0 ? "+" : ""}{p.returnRate}%
                  </span>
                </td>
                <td className="py-3">
                  <span className={ddBadgeMap[p.dueDiligence]}>{p.dueDiligence}</span>
                </td>
                <td className="py-3">
                  <span className={riskBadgeMap[p.risk]}>{p.risk}</span>
                </td>
                <td className="py-3 max-w-[200px]">
                  <span className="text-electric text-[10px] font-medium">AI建议：</span>
                  <span className="text-muted-foreground">{p.suggestion}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="card animate-slide-up">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-4 h-4 text-electric" />
            <h3 className="text-sm font-bold text-foreground">标的股价走势（2026年）</h3>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={stockPriceData}>
                <defs>
                  {companies.map((name, i) => (
                    <linearGradient key={name} id={`area-fill-${i}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={lineColors[i]} stopOpacity={0.15} />
                      <stop offset="100%" stopColor={lineColors[i]} stopOpacity={0} />
                    </linearGradient>
                  ))}
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} label={{ value: "元", position: "insideTopLeft", offset: -5, style: { fontSize: 10, fill: "oklch(60% 0.02 250)" } }} />
                <Tooltip
                  wrapperClassName="chart-tooltip"
                  contentStyle={{}}
                  labelStyle={{}}
                />
                <Legend wrapperStyle={{ fontSize: "11px" }} />
                {companies.map((name, i) => (
                  <Area key={`area-${name}`} type="monotone" dataKey={name} fill={`url(#area-fill-${i})`} stroke="none" />
                ))}
                {companies.map((name, i) => (
                  <Line key={name} type="monotone" dataKey={name} stroke={lineColors[i]} strokeWidth={2} dot={{ r: 2 }} />
                ))}
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card animate-slide-up">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="w-4 h-4 text-electric" />
            <h3 className="text-sm font-bold text-foreground">舆情情绪分析（近7日）</h3>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sentimentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip
                  wrapperClassName="chart-tooltip"
                  contentStyle={{}}
                  labelStyle={{}}
                />
                <Legend wrapperStyle={{ fontSize: "11px" }} />
                <Bar dataKey="正面" fill="oklch(72% 0.14 175)" radius={[3, 3, 0, 0]} />
                <Bar dataKey="负面" fill="oklch(65% 0.2 25)" radius={[3, 3, 0, 0]} />
                <Bar dataKey="中性" fill="oklch(60% 0.02 250)" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="card animate-slide-up">
        <h3 className="text-sm font-bold text-foreground mb-3">今日预警动态</h3>
        <div className="space-y-0 stagger-children">
          {postAlerts.map((alert, i) => {
            const config = alertConfig[alert.type]
            const Icon = config.icon
            return (
              <div key={i} className="feed-item flex items-start gap-3 py-2.5">
                <div className={cn("w-7 h-7 rounded-lg flex items-center justify-center shrink-0", config.bg)}>
                  <Icon className={cn("w-3.5 h-3.5", config.cls)} />
                </div>
                <span className="text-xs text-foreground leading-relaxed pt-1">{alert.content}</span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
