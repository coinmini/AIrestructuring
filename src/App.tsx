import { useState } from "react"
import Sidebar from "./components/layout/Sidebar"
import Header from "./components/layout/Header"
import Dashboard from "./pages/Dashboard"
import DistressRadar from "./pages/DistressRadar"
import DueDiligence from "./pages/DueDiligence"
import RestructuringSimulator from "./pages/RestructuringSimulator"
import KnowledgeGraph from "./pages/KnowledgeGraph"
import PostInvestment from "./pages/PostInvestment"
import AIAssistant from "./pages/AIAssistant"
import SmartToolkit from "./pages/SmartToolkit"
import MultiChannel from "./pages/MultiChannel"
import type { PageId } from "./data/mock-data"

const pageComponents: Record<PageId, React.ComponentType> = {
  dashboard: Dashboard,
  radar: DistressRadar,
  duediligence: DueDiligence,
  simulator: RestructuringSimulator,
  knowledge: KnowledgeGraph,
  postinvest: PostInvestment,
  assistant: AIAssistant,
  toolkit: SmartToolkit,
  multichannel: MultiChannel,
}

export default function App() {
  const [activePage, setActivePage] = useState<PageId>("dashboard")

  const PageComponent = pageComponents[activePage]

  return (
    <div className="flex h-screen overflow-hidden bg-background hex-pattern">
      <Sidebar activePage={activePage} onNavigate={setActivePage} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header activePage={activePage} />
        <div className="flex-1 overflow-y-auto p-4 lg:p-6">
          <PageComponent />
        </div>
      </div>
    </div>
  )
}
