import { useState, useEffect } from "react"
import { Bell, Activity } from "lucide-react"
import { navItems, type PageId } from "../../data/mock-data"

interface HeaderProps {
  activePage: PageId
}

export default function Header({ activePage }: HeaderProps) {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const currentNav = navItems.find((n) => n.id === activePage)

  return (
    <div className="h-14 border-b border-border/50 bg-sidebar/80 backdrop-blur-sm flex items-center justify-between px-4 shrink-0 z-10">
      <div className="flex items-center gap-6">
        <h1 className="text-sm font-medium text-foreground">{currentNav?.label}</h1>
        <div className="flex items-center gap-2 text-xs">
          <span className="text-muted-foreground">COMMAND CENTER</span>
          <span className="text-muted-foreground">·</span>
          <span className="font-mono text-foreground">
            数据更新于 {time.toLocaleDateString("zh-CN")} {time.toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit" })} CST
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-electric/10 text-electric text-xs font-mono">
          <Activity className="w-3 h-3" />
          <span>OpenClaw 在线</span>
        </div>

        <div className="relative p-2 rounded-md hover:bg-secondary/50 transition-colors text-muted-foreground hover:text-foreground cursor-pointer">
          <Bell className="w-4 h-4" />
          <div className="absolute top-1 right-1 w-2 h-2 bg-coral rounded-full" />
        </div>

        <div className="flex items-center gap-2 pl-3 border-l border-border/50">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-electric to-amber flex items-center justify-center text-xs font-bold text-background">
            盛
          </div>
          <span className="text-sm text-foreground hidden lg:block">盛达集团</span>
        </div>
      </div>
    </div>
  )
}
