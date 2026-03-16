import { useState } from "react"
import {
  LayoutDashboard, Radar, Search, FlaskConical, GitBranch,
  LineChart, Bot, Wrench, Smartphone, Settings, Zap
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
  const [collapsed] = useState(false)

  const grouped = navItems.reduce<Record<string, typeof navItems>>((acc, item) => {
    const key = item.categoryLabel
    if (!acc[key]) acc[key] = []
    acc[key] = [...acc[key], item]
    return acc
  }, {})

  return (
    <div className={cn(
      "flex flex-col border-r border-border/50 bg-sidebar relative z-20",
      collapsed ? "w-16" : "w-56"
    )}>
      {/* Logo */}
      <div className="flex items-center h-14 px-3 border-b border-border/50">
        <div className="flex items-center gap-2 overflow-hidden">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-electric to-teal flex items-center justify-center shrink-0">
            <Zap className="w-4 h-4 text-background" />
          </div>
          {!collapsed && (
            <span className="text-sm font-bold tracking-wide text-electric overflow-hidden whitespace-nowrap">
              AlphaRenew
            </span>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-3 px-2 space-y-4">
        {Object.entries(grouped).map(([category, items]) => (
          <div key={category}>
            {!collapsed && (
              <div className="px-2 mb-1.5 text-[10px] font-mono uppercase tracking-widest text-muted-foreground/60">
                {category}
              </div>
            )}
            <div className="space-y-0.5">
              {items.map((item) => {
                const Icon = iconMap[item.icon]
                const isActive = activePage === item.id
                return (
                  <button
                    key={item.id}
                    onClick={() => onNavigate(item.id)}
                    className={cn(
                      "w-full flex items-center gap-2.5 px-2.5 py-2 rounded-md text-sm transition-colors relative",
                      isActive
                        ? "bg-electric/10 text-electric"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                    )}
                  >
                    {isActive && (
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-electric rounded-r" />
                    )}
                    {Icon && <Icon className="w-4 h-4 shrink-0" />}
                    {!collapsed && (
                      <span className="text-sm whitespace-nowrap overflow-hidden">{item.label}</span>
                    )}
                  </button>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Status indicators */}
      <div className="px-3 py-3 border-t border-border/50 space-y-2">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <div className="status-dot status-dot-green" />
          <span>AI引擎 运行中</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="font-mono text-electric">5,247</span>
          <span>数据源</span>
        </div>
      </div>

      {/* Settings */}
      <div className="flex items-center justify-center h-10 border-t border-border/50 text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
        <Settings className="w-4 h-4" />
      </div>
    </div>
  )
}
