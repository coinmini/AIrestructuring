import { useState } from "react"
import {
  Smartphone,
  CheckCircle,
  MessageCircle,
  Bell,
  ArrowRight,
  Download,
  Search,
  Zap,
} from "lucide-react"
import { cn } from "../lib/utils"
import { channelConfig, pushRules } from "../data/mock-data"

const channelAccentBorders: Record<string, string> = {
  微信: "border-t-2 border-t-green-400",
  钉钉: "border-t-2 border-t-blue-400",
  飞书: "border-t-2 border-t-purple-400",
}

const channelIconColors: Record<string, string> = {
  微信: "bg-gradient-to-br from-green-500/25 to-green-500/10 text-green-400",
  钉钉: "bg-gradient-to-br from-blue-500/25 to-blue-500/10 text-blue-400",
  飞书: "bg-gradient-to-br from-purple-500/25 to-purple-500/10 text-purple-400",
}

const modeIcons = [Download, Search, Zap]

const chatSimulations: Record<string, Array<{ type: "notification" | "user" | "ai"; content: string; label?: string }>> = {
  微信: [
    {
      type: "notification",
      label: "AIrestructuring AI 预警",
      content: "【AIrestructuring AI 预警】雪浪环境(300385)申请预重整，AI匹配度82分，建议关注。主营危废处理，核心资产包括3个处理基地。",
    },
    {
      type: "user",
      content: "查一下ST金科最新的业绩对赌进度",
    },
  ],
  钉钉: [
    {
      type: "notification",
      label: "审批通知",
      content: "【审批通知】*ST惠程初步尽调报告已生成，请审批是否进入深度尽调阶段。AI评分88分，推荐跟进。",
    },
    {
      type: "user",
      content: "同意，安排投资一部跟进",
    },
  ],
  飞书: [
    {
      type: "user",
      content: "@AIrestructuring 帮我生成一份本周投资委员会汇报材料",
    },
    {
      type: "ai",
      content: "已生成本周投委会汇报材料草稿，包含5个在管项目进展、2个新标的分析、风险预警汇总。需要我把ST聆达的尽调进度加到第3部分吗？",
    },
    {
      type: "user",
      content: "把ST聆达的尽调进度加到第3部分",
    },
  ],
}

const interactionModes = [
  {
    title: "被动接收",
    description: "AI后台持续运行，通过大模型和OpenClaw引擎分析数据，当发现重要信息时主动推送到微信、钉钉、飞书等渠道，确保关键信息不遗漏。",
  },
  {
    title: "主动查询",
    description: "用户可以在任意端直接向AI发送自然语言问题，如「ST聆达的偿债能力如何」，AI将实时调用知识库和分析引擎生成专业回答。",
  },
  {
    title: "任务布置",
    description: "用户可以通过消息向AI布置任务，如「监控XX标的舆情」「每周五生成投资周报」，AI将自动执行并按要求反馈结果。",
  },
]

const totalUsers = channelConfig.reduce((sum, c) => sum + c.users, 0)
const totalMessages = channelConfig.reduce((sum, c) => sum + c.todayMessages, 0)

export default function MultiChannel() {
  const [activeTab, setActiveTab] = useState("微信")
  const [ruleStates, setRuleStates] = useState(
    pushRules.map((r) => r.enabled)
  )

  const handleToggle = (index: number) => {
    setRuleStates((prev) => prev.map((v, i) => (i === index ? !v : v)))
  }

  return (
    <div className="space-y-5 animate-slide-up">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight glow-text-blue">
            多端接入
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            微信、钉钉、飞书全渠道AI交互，被动接收推送或主动布置任务
          </p>
        </div>
        <div className="flex items-center gap-3 text-xs">
          <span className="badge badge-green">
            <CheckCircle className="h-3 w-3" />
            已连接 3端
          </span>
          <span className="badge badge-muted">
            接入用户 {totalUsers}
          </span>
          <span className="badge badge-muted">
            今日消息 {totalMessages}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 stagger-children">
        {channelConfig.map((channel) => (
          <div
            key={channel.name}
            className={cn(
              "card hover-lift",
              channelAccentBorders[channel.name]
            )}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-lg",
                    channelIconColors[channel.name]
                  )}
                >
                  <Smartphone className="h-4 w-4" />
                </div>
                <h3 className="text-sm font-bold">{channel.name}</h3>
              </div>
              <span className="badge badge-green">
                <span className="status-dot status-dot-green !w-[6px] !h-[6px]" />
                已连接
              </span>
            </div>
            <p className="text-xs text-foreground/70 mb-3">{channel.description}</p>
            <div className="flex flex-wrap gap-1 mb-3">
              {channel.features.map((f) => (
                <span
                  key={f}
                  className="badge badge-muted"
                >
                  {f}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span>
                用户 <span className="font-semibold text-foreground/80">{channel.users}</span>
              </span>
              <span>
                今日消息 <span className="font-semibold text-foreground/80">{channel.todayMessages}</span>
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="card-glass">
        <div className="flex items-center gap-2 mb-4">
          <MessageCircle className="h-4 w-4 text-electric" />
          <h2 className="text-sm font-semibold">消息模拟</h2>
          <div className="ml-auto flex gap-4">
            {Object.keys(chatSimulations).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "tab-underline text-xs font-medium transition-colors",
                  activeTab === tab
                    ? "active text-electric"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
        <div className="space-y-3 max-w-2xl">
          {chatSimulations[activeTab]?.map((msg, i) => {
            if (msg.type === "notification") {
              return (
                <div key={i} className="rounded-xl bg-amber/5 border border-amber/20 px-4 py-3 animate-fade-in">
                  <div className="flex items-center gap-1.5 mb-1">
                    <Bell className="h-3 w-3 text-amber" />
                    <span className="badge badge-amber !text-[10px]">
                      {msg.label}
                    </span>
                  </div>
                  <p className="text-xs text-foreground/80 leading-relaxed">
                    {msg.content}
                  </p>
                  {activeTab === "钉钉" && (
                    <button className="btn-secondary mt-2 !px-3 !py-1 !text-[10px]">
                      审批
                    </button>
                  )}
                </div>
              )
            }
            if (msg.type === "user") {
              return (
                <div key={i} className="flex justify-end animate-slide-in-right">
                  <div className="rounded-xl bg-gradient-to-br from-electric/10 to-electric/5 border border-electric/20 px-4 py-2.5">
                    <p className="text-xs leading-relaxed">{msg.content}</p>
                  </div>
                </div>
              )
            }
            return (
              <div key={i} className="animate-fade-in">
                <div className="card-glass !rounded-xl !py-2.5 !px-4">
                  <p className="text-xs text-foreground/80 leading-relaxed">
                    {msg.content}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="card">
        <h2 className="mb-3 text-sm font-semibold flex items-center gap-2">
          <Bell className="h-4 w-4 text-electric" />
          推送规则配置
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-border/50 text-muted-foreground">
                <th className="pb-2 text-left font-medium">规则名称</th>
                <th className="pb-2 text-left font-medium">渠道</th>
                <th className="pb-2 text-left font-medium">频率</th>
                <th className="pb-2 text-left font-medium">说明</th>
                <th className="pb-2 text-right font-medium">状态</th>
              </tr>
            </thead>
            <tbody>
              {pushRules.map((rule, i) => (
                <tr
                  key={rule.name}
                  className="table-row-hover border-b border-border/30 last:border-0"
                >
                  <td className="py-2.5 font-medium">{rule.name}</td>
                  <td className="py-2.5 text-muted-foreground">
                    {rule.channel}
                  </td>
                  <td className="py-2.5 text-muted-foreground">
                    {rule.frequency}
                  </td>
                  <td className="py-2.5 text-muted-foreground max-w-xs truncate">
                    {rule.description}
                  </td>
                  <td className="py-2.5 text-right">
                    <div
                      onClick={() => handleToggle(i)}
                      className={cn(
                        "toggle-switch inline-block",
                        ruleStates[i] && "active"
                      )}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card">
        <h2 className="mb-3 text-sm font-semibold flex items-center gap-2">
          <ArrowRight className="h-4 w-4 text-electric" />
          交互模式说明
        </h2>
        <div className="grid grid-cols-3 gap-4 stagger-children">
          {interactionModes.map((mode, i) => {
            const ModeIcon = modeIcons[i]
            return (
              <div
                key={mode.title}
                className="card hover-lift"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-electric/20 to-electric/5">
                    <ModeIcon className="h-3.5 w-3.5 text-electric" />
                  </div>
                  <h3 className="text-sm font-semibold text-electric">
                    {mode.title}
                  </h3>
                </div>
                <p className="text-xs text-foreground/70 leading-relaxed">
                  {mode.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
