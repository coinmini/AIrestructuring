import { useState } from "react"
import {
  LayoutDashboard, Radar, Search, FlaskConical, GitBranch,
  LineChart, Bot, Wrench, Smartphone, Settings, Zap, ChevronLeft
} from "lucide-react"
import { cn } from "../../lib/utils"
import { navItems, type PageId } from "../../data/mock-data"

const iconMap: Record<string, React.ElementType> = {
  LayoutDashboard, Radar, Search, FlaskConical, GitBranch,
  LineChart, Bot, Wrench, Smartphone,
}

interface SidebarProps {
  activePage: PageId
  onNavigate: (page: PageId) => void
}

export default function Sidebar({ activePage, onNavigate }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false)

  const grouped = navItems.reduce<Record<string, typeof navItems>>((acc, item) => {
    const key = item.categoryLabel
    if (!acc[key]) acc[key] = []
    acc[key] = [...acc[key], item]
    return acc
  }, {})

  return (
    <div className={cn(
      "flex flex-col border-r border-border/50 bg-sidebar relative z-20 transition-all duration-300 ease-in-out",
      collapsed ? "w-16" : "w-56"
    )}>
      <div className="flex items-center h-14 px-3 border-b border-border/50">
        <div className="flex items-center gap-2 overflow-hidden">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-electric to-teal flex items-center justify-center shrink-0 shadow-lg shadow-electric/20">
            <Zap className="w-4 h-4 text-background" />
          </div>
          <span className={cn(
            "text-sm font-bold tracking-wide text-electric whitespace-nowrap glow-text-blue transition-all duration-300",
            collapsed ? "opacity-0 w-0" : "opacity-100"
          )}>
            AIrestructuring
          </span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto py-3 px-2 space-y-4">
        {Object.entries(grouped).map(([category, items]) => (
          <div key={category}>
            <div className={cn(
              "px-2 mb-1.5 text-[10px] font-mono uppercase tracking-widest text-muted-foreground/60 transition-all duration-300",
              collapsed ? "opacity-0 h-0 mb-0 overflow-hidden" : "opacity-100 h-auto"
            )}>
              {category}
            </div>
            <div className="space-y-0.5">
              {items.map((item) => {
                const Icon = iconMap[item.icon]
                const isActive = activePage === item.id
                return (
                  <button
                    key={item.id}
                    onClick={() => onNavigate(item.id)}
                    title={collapsed ? item.label : undefined}
                    className={cn(
                      "w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm transition-all duration-200 relative group",
                      collapsed && "justify-center px-0",
                      isActive
                        ? "bg-electric/10 text-electric shadow-sm shadow-electric/5"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                    )}
                  >
                    {isActive && (
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-electric rounded-r shadow-sm shadow-electric/50" />
                    )}
                    {Icon && <Icon className={cn("w-4 h-4 shrink-0 transition-transform duration-200", !isActive && "group-hover:scale-110")} />}
                    <span className={cn(
                      "text-sm whitespace-nowrap transition-all duration-300",
                      collapsed ? "opacity-0 w-0 overflow-hidden" : "opacity-100"
                    )}>
                      {item.label}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      <div className={cn(
        "px-3 py-3 border-t border-border/50 space-y-2.5 transition-all duration-300",
        collapsed && "px-1"
      )}>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <div className="status-dot status-dot-green shrink-0" />
          <span className={cn("transition-all duration-300", collapsed ? "opacity-0 w-0 overflow-hidden" : "opacity-100")}>
            AI引擎 运行中
          </span>
        </div>
        <div className={cn(
          "flex items-center gap-2 text-xs text-muted-foreground transition-all duration-300",
          collapsed && "hidden"
        )}>
          <span className="font-mono text-electric glow-text-blue">5,247</span>
          <span>数据源</span>
        </div>
      </div>

      <div className="flex items-center justify-between h-10 border-t border-border/50 px-2">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 rounded-md hover:bg-secondary/50 transition-all text-muted-foreground hover:text-foreground cursor-pointer"
        >
          <ChevronLeft className={cn("w-4 h-4 transition-transform duration-300", collapsed && "rotate-180")} />
        </button>
        {!collapsed && (
          <button className="p-1.5 rounded-md hover:bg-secondary/50 transition-colors text-muted-foreground hover:text-foreground cursor-pointer">
            <Settings className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  )
}
