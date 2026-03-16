import { useState } from "react"
import { FlaskConical, Settings, Play, TrendingUp, Vote, BarChart3, SlidersHorizontal } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { cn } from "../lib/utils"
import { simSchemes, creditorGroups, schemeComparison } from "../data/mock-data"

const riskColorMap: Record<string, { dot: string; text: string }> = {
  "低": { dot: "bg-teal", text: "text-teal" },
  "中": { dot: "bg-amber", text: "text-amber" },
  "高": { dot: "bg-coral", text: "text-coral" },
}

const schemeColors = ["text-electric", "text-teal", "text-amber"]
const schemeBarColors = ["bg-electric", "bg-teal", "bg-amber"]
const schemeBorderColors = ["border-electric/30", "border-teal/30", "border-amber/30"]

const histogramData = Array.from({ length: 20 }, (_, i) => {
  const range = `${10 + i * 2}%`
  const center = 9
  const count = Math.round(800 * Math.exp(-0.5 * ((i - center) / 3.5) ** 2) + Math.random() * 50)
  return { range, count }
})

const params = [
  { label: "转增比例", value: "12股", unit: "(每10股转增)" },
  { label: "普通债权清偿率", value: "45%", unit: "" },
  { label: "投资人入股价", value: "2.35元/股", unit: "" },
  { label: "锁定期", value: "18个月", unit: "" },
  { label: "投资总额", value: "6.8亿元", unit: "" },
]

export default function RestructuringSimulator() {
  const [activeScheme, setActiveScheme] = useState(0)

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <FlaskConical className="w-5 h-5 text-electric" />
            <h2 className="text-lg font-bold text-foreground">重整模拟器</h2>
          </div>
          <p className="text-xs text-muted-foreground mt-1">蒙特卡洛模拟 + 博弈论模型，多方案比选与优化</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-secondary text-secondary-foreground text-xs hover:bg-secondary/80 transition-colors">
            <Settings className="w-3.5 h-3.5" />
            参数配置
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-electric text-primary-foreground text-xs hover:bg-electric/90 transition-colors">
            <Play className="w-3.5 h-3.5" />
            运行模拟
          </button>
        </div>
      </div>

      <div className="bg-card rounded-lg border border-border/50 p-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-sm font-medium text-foreground">*ST惠程 (002168) 重整方案模拟</span>
            <p className="text-xs text-muted-foreground mt-0.5">总债务: 28.3亿 · 总资产: 15.6亿 · 资产负债率: 92.1%</p>
          </div>
          <span className="px-2 py-0.5 rounded text-xs bg-electric/10 text-electric font-mono">已运行 10,000 次模拟</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {simSchemes.map((scheme, i) => {
          const risk = riskColorMap[scheme.risk]
          return (
            <div
              key={scheme.name}
              className={cn(
                "bg-card rounded-lg border p-4 cursor-pointer transition-all",
                activeScheme === i ? schemeBorderColors[i] : "border-border/50",
              )}
              onClick={() => setActiveScheme(i)}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={cn("text-sm font-bold", schemeColors[i])}>{scheme.name}</span>
                <span className="px-1.5 py-0.5 rounded text-[10px] bg-secondary text-muted-foreground">{scheme.duration}</span>
              </div>
              <p className="text-xs text-muted-foreground mb-3">{scheme.description}</p>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-secondary/50 rounded p-2">
                  <span className="text-muted-foreground">预期IRR</span>
                  <p className={cn("font-mono font-bold mt-0.5", schemeColors[i])}>{scheme.irr}</p>
                </div>
                <div className="bg-secondary/50 rounded p-2">
                  <span className="text-muted-foreground">通过概率</span>
                  <p className="font-mono font-bold mt-0.5 text-foreground">{scheme.passRate}</p>
                </div>
                <div className="bg-secondary/50 rounded p-2">
                  <span className="text-muted-foreground">清偿率</span>
                  <p className="font-mono font-bold mt-0.5 text-foreground">{scheme.clearanceRate}</p>
                </div>
                <div className="bg-secondary/50 rounded p-2">
                  <span className="text-muted-foreground">预计周期</span>
                  <p className="font-mono font-bold mt-0.5 text-foreground">{scheme.duration}</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5 mt-3">
                <div className={cn("w-2 h-2 rounded-full", risk.dot)} />
                <span className={cn("text-xs", risk.text)}>风险等级：{scheme.risk}</span>
              </div>
            </div>
          )
        })}
      </div>

      <div className="bg-card rounded-lg border border-border/50 p-5">
        <div className="flex items-center gap-2 mb-4">
          <Vote className="w-4 h-4 text-electric" />
          <h3 className="text-sm font-bold text-foreground">债权人投票模拟</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-border/50">
                <th className="text-left py-2 text-muted-foreground font-medium">债权人组</th>
                <th className="text-left py-2 text-electric font-medium">方案A</th>
                <th className="text-left py-2 text-teal font-medium">方案B</th>
                <th className="text-left py-2 text-amber font-medium">方案C</th>
              </tr>
            </thead>
            <tbody>
              {creditorGroups.map((group) => (
                <tr key={group.name} className="border-b border-border/30">
                  <td className="py-2.5 text-foreground">{group.name}</td>
                  {[group.schemeA, group.schemeB, group.schemeC].map((val, j) => (
                    <td key={j} className="py-2.5">
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-1.5 bg-secondary rounded-full overflow-hidden">
                          <div className={cn("h-full rounded-full", schemeBarColors[j])} style={{ width: `${val}%` }} />
                        </div>
                        <span className="font-mono text-foreground">{val}%</span>
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-card rounded-lg border border-border/50 p-5">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-4 h-4 text-electric" />
          <h3 className="text-sm font-bold text-foreground">方案综合对比</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-border/50">
                <th className="text-left py-2 text-muted-foreground font-medium">指标</th>
                <th className="text-left py-2 text-electric font-medium">方案A</th>
                <th className="text-left py-2 text-teal font-medium">方案B</th>
                <th className="text-left py-2 text-amber font-medium">方案C</th>
              </tr>
            </thead>
            <tbody>
              {schemeComparison.map((row) => (
                <tr key={row.metric} className="border-b border-border/30">
                  <td className="py-2.5 text-foreground">{row.metric}</td>
                  {[row.schemeA, row.schemeB, row.schemeC].map((val, j) => (
                    <td key={j} className="py-2.5">
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-1.5 bg-secondary rounded-full overflow-hidden">
                          <div className={cn("h-full rounded-full", schemeBarColors[j])} style={{ width: `${val}%` }} />
                        </div>
                        <span className="font-mono text-foreground">{val}</span>
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-card rounded-lg border border-border/50 p-5">
        <div className="flex items-center gap-2 mb-1">
          <BarChart3 className="w-4 h-4 text-electric" />
          <h3 className="text-sm font-bold text-foreground">蒙特卡洛模拟 · IRR分布（10,000次）</h3>
        </div>
        <p className="text-xs text-muted-foreground mb-4">中位数IRR: 28.5% · 置信区间(95%): 15.2% - 41.8%</p>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={histogramData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="range" tick={{ fontSize: 10 }} interval={1} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip
                contentStyle={{ background: "oklch(16% 0.015 260)", border: "1px solid oklch(25% 0.015 260)", borderRadius: "6px", fontSize: "12px" }}
                labelStyle={{ color: "oklch(92% 0.01 250)" }}
              />
              <Bar dataKey="count" fill="oklch(78% 0.15 220)" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-card rounded-lg border border-border/50 p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-electric" />
            <h3 className="text-sm font-bold text-foreground">参数调节</h3>
          </div>
          <button className="px-3 py-1.5 rounded-md bg-electric text-primary-foreground text-xs hover:bg-electric/90 transition-colors">
            重新计算
          </button>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          {params.map((p) => (
            <div key={p.label} className="space-y-1">
              <label className="text-xs text-muted-foreground">{p.label}</label>
              <div className="flex items-center gap-1">
                <input
                  type="text"
                  defaultValue={p.value}
                  className="w-full px-2 py-1.5 rounded-md bg-input border border-border/50 text-xs text-foreground font-mono focus:outline-none focus:border-electric/50"
                />
                {p.unit && <span className="text-[10px] text-muted-foreground whitespace-nowrap">{p.unit}</span>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
