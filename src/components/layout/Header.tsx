import { useState, useEffect } from "react"
import { Bell, Activity, RefreshCw } from "lucide-react"
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
    <div className="h-14 border-b border-border/50 bg-sidebar/60 backdrop-blur-xl flex items-center justify-between px-5 shrink-0 z-10">
      <div className="flex items-center gap-6">
        <h1 className="text-sm font-semibold text-foreground tracking-tight">{currentNav?.label}</h1>
        <div className="hidden md:flex items-center gap-2 text-xs">
          <span className="text-muted-foreground/70 font-mono uppercase tracking-wider text-[10px]">Command Center</span>
          <span className="text-muted-foreground/30">·</span>
          <span className="font-mono text-muted-foreground">
            {time.toLocaleDateString("zh-CN")} {time.toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
          </span>
          <button className="p-1 rounded hover:bg-secondary/50 transition-colors text-muted-foreground hover:text-foreground cursor-pointer">
            <RefreshCw className="w-3 h-3" />
          </button>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="badge badge-electric">
          <span className="status-dot status-dot-green !w-[6px] !h-[6px]" />
          <Activity className="w-3 h-3" />
          <span>OpenClaw 在线</span>
        </div>

        <div className="hidden sm:flex items-center gap-1 badge badge-muted">
          <span className="text-electric font-mono">5,247</span>
          <span>数据源</span>
        </div>

        <div className="relative p-2 rounded-lg hover:bg-secondary/50 transition-all text-muted-foreground hover:text-foreground cursor-pointer group">
          <Bell className="w-4 h-4 group-hover:scale-110 transition-transform" />
          <div className="absolute top-1.5 right-1.5 w-2 h-2 bg-coral rounded-full shadow-sm shadow-coral/50">
            <div className="absolute inset-0 bg-coral rounded-full animate-ping opacity-75" />
          </div>
        </div>

        <div className="flex items-center gap-2.5 pl-3 border-l border-border/50 cursor-pointer group">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-electric to-amber flex items-center justify-center text-xs font-bold text-background shadow-lg shadow-electric/10 group-hover:shadow-electric/20 transition-shadow">
            盛
          </div>
          <div className="hidden lg:block">
            <div className="text-sm font-medium text-foreground leading-tight">盛达集团</div>
            <div className="text-[10px] text-muted-foreground font-mono">Admin</div>
          </div>
        </div>
      </div>
    </div>
  )
}
