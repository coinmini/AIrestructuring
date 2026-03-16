import { useState } from "react"
import {
  Send,
  Bot,
  User,
  MessageSquare,
  Zap,
  BarChart3,
  Search,
  FileText,
  Lightbulb,
} from "lucide-react"
import { cn } from "../lib/utils"
import { aiConversations, quickCommands } from "../data/mock-data"

const commandIcons = [BarChart3, Search, FileText, Lightbulb]

const messages = [
  {
    role: "user" as const,
    content: "请分析ST聆达(300125)的最新财务状况，重点关注其偿债能力和核心资产价值",
  },
  {
    role: "ai" as const,
    content: [
      {
        text: "根据ST聆达(300125)2024年年报及相关公开信息，以下是其财务状况的深度分析：",
      },
      {
        heading: "一、偿债能力分析",
        text: "流动比率为0.43，速动比率为0.31，均远低于行业平均水平（1.2和0.8），表明短期偿债能力严重不足。资产负债率高达89.3%，已资不抵债。截至2024年末，公司总负债约12.8亿元，其中有息负债6.2亿元，逾期债务4.1亿元。",
      },
      {
        heading: "二、核心资产价值评估",
        text: "公司持有光伏电池片相关专利18项（其中发明专利7项），经评估市场价值约1.8-2.5亿元。安徽合肥生产基地土地使用权及厂房评估价值约3.2亿元。品牌及客户渠道残余价值约0.5亿元。核心资产合计评估价值约5.5-6.2亿元。",
      },
      {
        heading: "三、重整可行性判断",
        text: "尽管财务状况严峻，但公司核心资产具备一定价值基础，光伏行业近期政策利好（2025年新型电力系统建设规划），若引入优质产业投资人注入资产，重整后恢复经营的可能性较高。建议重点关注清偿率测算和潜在投资人匹配。",
      },
    ],
    sources: ["2024年年报", "国家知识产权局", "合肥市不动产登记中心"],
  },
  {
    role: "user" as const,
    content: "这个标的和盛达之前投资的ST金科在行业和资产结构上有什么异同？",
  },
]

export default function AIAssistant() {
  const [activeConversation, setActiveConversation] = useState(0)
  const [inputValue, setInputValue] = useState("")

  return (
    <div className="flex h-[calc(100vh-8rem)] gap-0">
      <div className="w-64 shrink-0 border-r border-border/50 bg-card/50 pr-4 pl-1 flex flex-col">
        <div className="mb-5">
          <h1 className="text-lg font-bold tracking-tight glow-text-blue">
            AI 助手
          </h1>
          <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
            自助式AI分析，支持自然语言交互、文档上传、多轮对话
          </p>
        </div>

        <div className="mb-5">
          <h3 className="mb-2 text-xs font-semibold text-muted-foreground flex items-center gap-1.5">
            <Zap className="h-3 w-3" />
            快捷指令
          </h3>
          <div className="space-y-1.5">
            {quickCommands.map((cmd, i) => {
              const CmdIcon = commandIcons[i] ?? Zap
              return (
                <button
                  key={cmd.label}
                  className="btn-ghost w-full text-left flex items-center gap-2 !px-2.5 !py-1.5 !text-xs !rounded-lg border border-transparent hover:border-border/50"
                >
                  <CmdIcon className="h-3 w-3 shrink-0 text-electric/60" />
                  {cmd.label}
                </button>
              )
            })}
          </div>
        </div>

        <div className="flex-1 min-h-0">
          <h3 className="mb-2 text-xs font-semibold text-muted-foreground flex items-center gap-1.5">
            <MessageSquare className="h-3 w-3" />
            最近会话
          </h3>
          <div className="space-y-1">
            {aiConversations.map((conv, i) => (
              <button
                key={conv.title}
                onClick={() => setActiveConversation(i)}
                className={cn(
                  "w-full text-left rounded-lg px-2.5 py-2 transition-all",
                  activeConversation === i
                    ? "bg-electric/10 border-l-2 border-l-electric border border-electric/20"
                    : "hover:bg-secondary/50 border-l-2 border-l-transparent border border-transparent"
                )}
              >
                <p className="text-xs font-medium truncate">{conv.title}</p>
                <p className="text-[10px] text-muted-foreground mt-0.5">
                  {conv.time}
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col min-w-0 pl-4">
        <div className="flex-1 overflow-y-auto space-y-4 pb-4">
          {messages.map((msg, i) =>
            msg.role === "user" ? (
              <div key={i} className="flex justify-end animate-slide-in-right">
                <div className="max-w-[70%] flex gap-2">
                  <div className="rounded-xl bg-gradient-to-br from-electric/10 to-electric/5 border border-electric/20 px-4 py-3">
                    <p className="text-sm leading-relaxed">{msg.content as string}</p>
                  </div>
                  <div className="shrink-0 mt-1 flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-electric/30 to-electric/10 border border-electric/20">
                    <User className="h-3.5 w-3.5 text-electric" />
                  </div>
                </div>
              </div>
            ) : (
              <div key={i} className="flex gap-2 animate-fade-in">
                <div className="shrink-0 mt-1 flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-teal/30 to-teal/10 border border-teal/20">
                  <Bot className="h-3.5 w-3.5 text-teal" />
                </div>
                <div className="max-w-[75%] card-glass !py-3 !px-4">
                  {(msg.content as Array<{ heading?: string; text: string }>).map(
                    (section, j) => (
                      <div key={j} className={cn(j > 0 && "mt-3")}>
                        {section.heading && (
                          <p className="text-sm font-semibold mb-1">
                            {section.heading}
                          </p>
                        )}
                        <p className="text-sm text-foreground/85 leading-relaxed">
                          {section.text}
                        </p>
                      </div>
                    )
                  )}
                  {msg.sources && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {msg.sources.map((src) => (
                        <span
                          key={src}
                          className="badge badge-muted"
                        >
                          来源: {src}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )
          )}

          <div className="flex gap-2 animate-fade-in">
            <div className="shrink-0 mt-1 flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-teal/30 to-teal/10 border border-teal/20">
              <Bot className="h-3.5 w-3.5 text-teal" />
            </div>
            <div className="card-glass !py-3 !px-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>AI 正在思考</span>
                <span className="inline-flex items-center gap-1">
                  <span className="animate-bounce [animation-delay:0ms] h-1.5 w-1.5 rounded-full bg-electric" />
                  <span className="animate-bounce [animation-delay:150ms] h-1.5 w-1.5 rounded-full bg-electric/70" />
                  <span className="animate-bounce [animation-delay:300ms] h-1.5 w-1.5 rounded-full bg-electric/40" />
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="shrink-0 border-t border-border/50 pt-3">
          <div className="flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="输入您的问题，AI将基于OpenClaw引擎为您分析..."
              className="flex-1 rounded-xl border border-border/50 bg-secondary/50 px-4 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:border-electric/50 focus:ring-1 focus:ring-electric/20 focus:shadow-[0_0_12px_oklch(78%_0.15_220_/_0.15)] transition-all"
            />
            <button className="btn-primary shrink-0 flex items-center gap-1.5 !rounded-xl">
              <Send className="h-4 w-4" />
              发送
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
