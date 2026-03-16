// Dashboard data
export const dashboardStats = {
  projects: 12,
  aum: 48.6,
  avgIrr: 24.3,
  alerts: 3,
}

export const investmentTrend = [
  { month: "2025/08", 收益率: 18.2, 基准: 12.5 },
  { month: "2025/09", 收益率: 22.1, 基准: 13.1 },
  { month: "2025/10", 收益率: 19.8, 基准: 12.8 },
  { month: "2025/11", 收益率: 25.3, 基准: 13.5 },
  { month: "2025/12", 收益率: 28.7, 基准: 14.0 },
  { month: "2026/01", 收益率: 31.2, 基准: 14.2 },
  { month: "2026/02", 收益率: 27.5, 基准: 13.8 },
  { month: "2026/03", 收益率: 28.6, 基准: 14.5 },
]

export const portfolioDistribution = [
  { name: "制造业", value: 30, color: "oklch(78% 0.15 220)" },
  { name: "房地产", value: 25, color: "oklch(78% 0.16 75)" },
  { name: "新能源", value: 20, color: "oklch(72% 0.14 175)" },
  { name: "科技", value: 15, color: "oklch(70% 0.15 300)" },
  { name: "其他", value: 10, color: "oklch(60% 0.02 250)" },
]

export const pipelineProjects = [
  { name: "ST金科", industry: "房地产", stage: "投后管理", progress: 82, score: 85, risk: "低", amount: "8.2亿" },
  { name: "*ST东易", industry: "家居装饰", stage: "方案执行", progress: 65, score: 72, risk: "中", amount: "3.5亿" },
  { name: "ST聆达", industry: "光伏", stage: "深度尽调", progress: 45, score: 78, risk: "中", amount: "预估35%" },
  { name: "ST金刚", industry: "新材料", stage: "投后管理", progress: 88, score: 90, risk: "低", amount: "5.6亿" },
  { name: "*ST美谷", industry: "消费", stage: "方案设计", progress: 55, score: 68, risk: "高", amount: "2.1亿" },
]

export const aiActivities = [
  { content: "ST聆达舆情异动：光伏行业政策利好，正面情绪上升23%", source: "舆情引擎", time: "2分钟前" },
  { content: "已完成*ST美谷隐性债务扫描，发现3笔未披露担保，总额约1.2亿", source: "AI尽调官", time: "15分钟前" },
  { content: "新标的预警：雪浪环境(300385)申请预重整，匹配盛达投资偏好", source: "困境雷达", time: "32分钟前" },
  { content: "ST金科重整计划执行进度正常，业绩对赌达标概率上调至78%", source: "投后智管", time: "1小时前" },
  { content: "2026年Q1投资组合风险评估报告已生成，整体风险可控", source: "风控引擎", time: "2小时前" },
]

export const marketData = [
  { month: "2025/04", 重整受理: 14, 重整批准: 12 },
  { month: "2025/06", 重整受理: 16, 重整批准: 14 },
  { month: "2025/08", 重整受理: 18, 重整批准: 15 },
  { month: "2025/10", 重整受理: 16, 重整批准: 13 },
  { month: "2025/12", 重整受理: 12, 重整批准: 11 },
  { month: "2026/02", 重整受理: 15, 重整批准: 15 },
]

// Distress Radar data
export const radarTargets = [
  {
    name: "雪浪环境",
    code: "300385",
    status: "申请预重整",
    source: "深交所公告",
    industry: "环保",
    marketCap: "12.3亿",
    score: 82,
    description: "公司因流动性困难，已向法院申请预重整。主营业务为危废处理，核心资产包括3个处理基地。",
    tag: "新发现",
  },
  {
    name: "棒杰股份",
    code: "002634",
    status: "申请预重整",
    source: "深交所公告",
    industry: "纺织",
    marketCap: "8.7亿",
    score: 75,
    description: "公司主营无缝针织服装，因行业下行及债务问题申请预重整。品牌价值和出口渠道具有一定重整价值。",
    tag: "AI分析中",
  },
  {
    name: "*ST惠程",
    code: "002168",
    status: "申请预重整",
    source: "深交所公告",
    industry: "电力设备",
    marketCap: "15.6亿",
    score: 88,
    description: "公司主营固体绝缘开关设备，拥有多项核心专利。目前AI尽调官正在进行初步扫描。",
    tag: "AI分析中",
  },
  {
    name: "ST香雪",
    code: "300147",
    status: "被ST+预重整",
    source: "深交所公告",
    industry: "医药",
    marketCap: "22.1亿",
    score: 91,
    description: "公司主营中成药和抗病毒药物，拥有国家保密配方。核心资产价值高，重整后恢复经营可能性大。",
    tag: "跟踪中",
  },
  {
    name: "*ST交投",
    code: "002013",
    status: "重整计划获批",
    source: "法院公告",
    industry: "交通",
    marketCap: "18.9亿",
    score: 95,
    description: "重整计划已获法院批准，产业投资人为某交通集团。可作为案例参考。",
    tag: "已完成",
  },
]

export const dataSources = [
  { name: "法院公告系统", count: 1247 },
  { name: "证监会/交易所", count: 856 },
  { name: "全国企业破产重整案件信息网", count: 1523 },
  { name: "财经媒体", count: 892 },
  { name: "债权申报平台", count: 432 },
  { name: "裁判文书网", count: 297 },
]

// Due Diligence data
export const ddDimensions = [
  {
    name: "财务尽调",
    icon: "BarChart3",
    items: ["营收趋势分析", "关联交易核查", "资金占用检测", "审计意见追踪", "粉饰报表特征识别"],
    description: "解析历年财报、审计意见，自动计算关键指标趋势，识别异常交易",
  },
  {
    name: "法律尽调",
    icon: "Scale",
    items: ["历史诉讼梳理", "违规担保核查", "监管处罚记录", "隐性债务识别", "合规风险评估"],
    description: "爬取裁判文书、监管函件，NLP提取诉讼涉案金额、类型",
  },
  {
    name: "资产尽调",
    icon: "Building",
    items: ["专利资产评估", "不动产权属核查", "设备资产盘点", "品牌价值评估", "专利权属清晰"],
    description: "分析专利、产权信息，评估核心技术价值和品牌市场地位",
  },
  {
    name: "业务尽调",
    icon: "TrendingUp",
    items: ["市场竞争分析", "客户集中度", "供应链稳定性", "行业前景评估", "运营效率分析"],
    description: "爬取产销数据、舆情，评估品牌与市场地位",
  },
]

export const ddRiskFindings = [
  { title: "发现未披露关联交易", detail: "2024年度存在3笔未充分披露的关联交易，涉及金额约8,200万元，交易对手为实控人关联方。", source: "财务尽调", level: "高风险" },
  { title: "违规担保风险", detail: "发现2笔对外担保未经董事会审议，担保金额合计1.5亿元，存在被追偿风险。", source: "法律尽调", level: "高风险" },
  { title: "资金占用嫌疑", detail: "2023-2024年间，存在多笔大额资金通过关联方账户流转，累计金额约4,500万元。", source: "财务尽调", level: "中风险" },
  { title: "审计意见保留事项", detail: "连续两年审计报告出具保留意见，主要涉及应收账款可回收性和存货跌价准备充分性。", source: "财务尽调", level: "中风险" },
  { title: "专利权属清晰", detail: "核心技术专利12项均权属清晰，无质押或纠纷，有效期至2030年以后。", source: "资产尽调", level: "低风险" },
]

// Restructuring Simulator data
export const simSchemes = [
  {
    name: "方案A：产业投资人主导",
    duration: "8个月",
    description: "引入行业龙头作为产业投资人，注入优质资产，转增比例10:12",
    irr: "28.5%",
    passRate: "78%",
    clearanceRate: "45%",
    risk: "中",
  },
  {
    name: "方案B：财务投资人联合",
    duration: "6个月",
    description: "多家财务投资人联合参与，现金清偿为主，转增比例10:10",
    irr: "22.3%",
    passRate: "85%",
    clearanceRate: "55%",
    risk: "低",
  },
  {
    name: "方案C：混合投资方案",
    duration: "10个月",
    description: "产业+财务投资人组合，分层清偿结构，转增比例10:15",
    irr: "35.2%",
    passRate: "65%",
    clearanceRate: "38%",
    risk: "高",
  },
]

export const creditorGroups = [
  { name: "有财产担保债权", schemeA: 100, schemeB: 100, schemeC: 100 },
  { name: "职工债权", schemeA: 100, schemeB: 100, schemeC: 100 },
  { name: "税款债权", schemeA: 100, schemeB: 100, schemeC: 100 },
  { name: "普通债权", schemeA: 45, schemeB: 55, schemeC: 38 },
  { name: "出资人", schemeA: 12, schemeB: 10, schemeC: 15 },
]

export const schemeComparison = [
  { metric: "方案通过率", schemeA: 78, schemeB: 85, schemeC: 65 },
  { metric: "预期IRR", schemeA: 28.5, schemeB: 22.3, schemeC: 35.2 },
  { metric: "执行难度", schemeA: 60, schemeB: 40, schemeC: 75 },
  { metric: "合规性", schemeA: 85, schemeB: 90, schemeC: 70 },
  { metric: "退出灵活性", schemeA: 70, schemeB: 80, schemeC: 55 },
  { metric: "风险可控", schemeA: 75, schemeB: 85, schemeC: 50 },
]

// Knowledge Graph data
export const kgEntities = [
  { id: "sd", name: "盛达集团", type: "企业", x: 400, y: 300 },
  { id: "stjk", name: "ST金科", type: "企业", x: 250, y: 150 },
  { id: "stjg", name: "ST金刚", type: "企业", x: 550, y: 150 },
  { id: "stdy", name: "*ST东易", type: "企业", x: 200, y: 400 },
  { id: "stnk", name: "ST宁科", type: "企业", x: 600, y: 400 },
  { id: "cq5", name: "重庆五中院", type: "法院", x: 150, y: 250 },
  { id: "pcf", name: "企业破产法", type: "法规", x: 400, y: 480 },
  { id: "fdc", name: "房地产", type: "行业", x: 300, y: 80 },
  { id: "xcl", name: "新材料", type: "行业", x: 500, y: 80 },
  { id: "gf", name: "光伏", type: "行业", x: 650, y: 300 },
]

export const kgEdges = [
  { from: "sd", to: "stjk", label: "投资" },
  { from: "sd", to: "stjg", label: "投资" },
  { from: "sd", to: "stdy", label: "投资" },
  { from: "sd", to: "stnk", label: "投资" },
  { from: "stjk", to: "cq5", label: "重整完成" },
  { from: "stjk", to: "fdc", label: "所属行业" },
  { from: "stjg", to: "xcl", label: "所属行业" },
  { from: "stjk", to: "pcf", label: "适用法规" },
  { from: "stjg", to: "pcf", label: "适用法规" },
]

export const kgCases = [
  { name: "ST金科", court: "重庆市第五中级人民法院", status: "重整完成", type: "上市公司" },
  { name: "*ST交投", court: "云南省昆明市中级人民法院", status: "重整完成", type: "上市公司" },
  { name: "ST聆达", court: "合肥市中级人民法院", status: "预重整中", rate: "预估42%", type: "上市公司" },
  { name: "*ST惠程", court: "深圳市中级人民法院", status: "预重整中", rate: "预估35%", type: "上市公司" },
  { name: "ST香雪", court: "广州市中级人民法院", status: "预重整中", rate: "预估40%", type: "上市公司" },
]

export const kgRegulations = [
  { name: "《企业破产法》", scope: "全国", level: "核心" },
  { name: "《关于审理上市公司破产重整案件工作座谈会纪要》", scope: "全国", level: "核心" },
  { name: "《全国法院破产审判工作会议纪要》", scope: "全国", level: "重要" },
  { name: "《关于推进破产案件依法高效审理的意见》", scope: "全国", level: "重要" },
  { name: "《深圳经济特区个人破产条例》", scope: "深圳", level: "参考" },
]

// Post-Investment data
export const postInvestmentProjects = [
  { name: "ST金科", industry: "房地产", investAmount: "8.2亿", currentValue: "12.8亿", returnRate: 56.1, dueDiligence: "达标", risk: "低", suggestion: "持有，等待最优退出窗口" },
  { name: "ST金刚", industry: "新材料", investAmount: "5.6亿", currentValue: "7.9亿", returnRate: 41.1, dueDiligence: "达标", risk: "低", suggestion: "持有，业绩对赌执行良好" },
  { name: "*ST东易", industry: "家居装饰", investAmount: "3.5亿", currentValue: "3.2亿", returnRate: -8.6, dueDiligence: "预警", risk: "高", suggestion: "关注，业绩对赌达标概率下降至52%" },
  { name: "ST宁科", industry: "科技", investAmount: "4.1亿", currentValue: "5.3亿", returnRate: 29.3, dueDiligence: "进行中", risk: "中", suggestion: "持有，关注Q2业绩表现" },
]

export const stockPriceData = [
  { date: "01/01", "ST金科": 5.2, "ST金刚": 8.1, "*ST东易": 3.8, "ST宁科": 6.5 },
  { date: "01/15", "ST金科": 5.5, "ST金刚": 8.4, "*ST东易": 3.5, "ST宁科": 6.8 },
  { date: "02/01", "ST金科": 5.8, "ST金刚": 8.8, "*ST东易": 3.2, "ST宁科": 7.1 },
  { date: "02/15", "ST金科": 5.6, "ST金刚": 9.1, "*ST东易": 3.0, "ST宁科": 6.9 },
  { date: "03/01", "ST金科": 6.1, "ST金刚": 9.5, "*ST东易": 2.8, "ST宁科": 7.3 },
  { date: "03/08", "ST金科": 6.4, "ST金刚": 9.8, "*ST东易": 2.6, "ST宁科": 7.5 },
]

export const postAlerts = [
  { content: "*ST东易Q4营收同比下降18%，业绩对赌达标风险上升", type: "warning" },
  { content: "ST金科获得地方政府产业扶持资金2.3亿元", type: "success" },
  { content: "ST金刚新材料产线投产，产能提升40%", type: "success" },
  { content: "ST宁科获得3项国家发明专利授权", type: "info" },
]

// AI Assistant data
export const aiConversations = [
  { title: "ST聆达财务分析", time: "今天 14:31" },
  { title: "*ST惠程尽调报告", time: "今天 11:20" },
  { title: "重整方案对比分析", time: "昨天 16:45" },
  { title: "光伏行业政策解读", time: "昨天 09:30" },
]

export const quickCommands = [
  { label: "分析标的财务状况", prompt: "请分析ST聆达(300125)的最新财务状况" },
  { label: "查询法规条文", prompt: "企业破产法中关于重整计划表决的规定是什么？" },
  { label: "生成尽调报告", prompt: "为*ST惠程生成初步尽调摘要报告" },
  { label: "搜索类似案例", prompt: "搜索与光伏行业上市公司破产重整相关的案例" },
]

// Smart Toolkit data
export const toolkitModules = [
  { name: "智能文书生成", description: "自动生成重整计划草案、债权申报书、法律意见书等专业文书", icon: "FileText", category: "文档", tags: ["重整计划草案", "债权申报书", "法律意见书", "投资协议模板"], accuracy: 96.2, usageCount: 1247 },
  { name: "法规智能检索", description: "基于NLP的法规条文精准检索，支持语义搜索和关联推荐", icon: "Scale", category: "法律", tags: ["语义搜索", "条文关联", "案例匹配", "法规更新提醒"], accuracy: 94.8, usageCount: 2356 },
  { name: "财务深度分析", description: "自动解析财报数据，识别异常交易，计算关键财务指标", icon: "Calculator", category: "财务", tags: ["财报解析", "异常检测", "趋势预测", "同行对比"], accuracy: 97.1, usageCount: 1893 },
  { name: "风险扫描引擎", description: "全方位扫描标的公司风险，包括诉讼、担保、关联交易等", icon: "Shield", category: "风控", tags: ["诉讼风险", "担保风险", "关联交易", "合规检查"], accuracy: 95.5, usageCount: 1562 },
  { name: "资产估值模型", description: "多维度资产估值，支持DCF、市场法、成本法等多种方法", icon: "TrendingUp", category: "估值", tags: ["DCF估值", "市场法", "成本法", "清算价值"], accuracy: 93.7, usageCount: 987 },
  { name: "利益相关方分析", description: "分析债权人、股东、管理层等各方利益诉求和博弈关系", icon: "Users", category: "分析", tags: ["债权人画像", "博弈分析", "投票预测", "沟通策略"], accuracy: 91.3, usageCount: 756 },
  { name: "舆情监控系统", description: "实时监控标的公司相关舆情，AI分析情绪趋势和影响", icon: "Radio", category: "监控", tags: ["实时监控", "情绪分析", "传播追踪", "预警推送"], accuracy: 92.8, usageCount: 1345 },
  { name: "知识问答引擎", description: "基于知识图谱的智能问答，快速获取破产重整领域专业知识", icon: "BookOpen", category: "知识", tags: ["智能问答", "知识推荐", "学习路径", "专家观点"], accuracy: 90.5, usageCount: 2134 },
]

// Multi-Channel data
export const channelConfig = [
  {
    name: "微信",
    description: "企业微信机器人，支持群聊和私聊AI交互",
    features: ["预警推送", "自然语言查询", "报告订阅", "任务布置"],
    connected: true,
    users: 28,
    todayMessages: 156,
  },
  {
    name: "钉钉",
    description: "钉钉机器人，集成审批流和AI分析",
    features: ["智能审批", "数据查询", "会议纪要", "任务跟踪"],
    connected: true,
    users: 35,
    todayMessages: 203,
  },
  {
    name: "飞书",
    description: "飞书机器人，深度集成文档和多维表格",
    features: ["文档协作", "数据看板", "机器人对话", "自动报表"],
    connected: true,
    users: 22,
    todayMessages: 134,
  },
]

export const pushRules = [
  { name: "新标的预警", channel: "全渠道", frequency: "实时", description: "AI匹配度≥70分的新标的立即推送", enabled: true },
  { name: "风险预警", channel: "全渠道", frequency: "实时", description: "在管项目风险等级变化时推送", enabled: true },
  { name: "每日简报", channel: "飞书", frequency: "每日08:30", description: "每日投资市场和项目动态汇总", enabled: true },
  { name: "周报", channel: "飞书+钉钉", frequency: "每周五17:00", description: "自动生成周度投资分析报告", enabled: true },
  { name: "业绩对赌提醒", channel: "微信", frequency: "季度", description: "对赌节点前30天提醒", enabled: true },
  { name: "退出窗口提醒", channel: "全渠道", frequency: "触发式", description: "AI判断最优退出时机时推送", enabled: false },
]

// Navigation items
export type PageId = "dashboard" | "radar" | "duediligence" | "simulator" | "knowledge" | "postinvest" | "assistant" | "toolkit" | "multichannel"

export interface NavItem {
  id: PageId
  label: string
  icon: string
  category: string
  categoryLabel: string
}

export const navItems: NavItem[] = [
  { id: "dashboard", label: "决策驾驶舱", icon: "LayoutDashboard", category: "core", categoryLabel: "核心" },
  { id: "radar", label: "困境雷达", icon: "Radar", category: "pre", categoryLabel: "投前" },
  { id: "duediligence", label: "AI尽调官", icon: "Search", category: "pre", categoryLabel: "投前" },
  { id: "simulator", label: "重整模拟器", icon: "FlaskConical", category: "mid", categoryLabel: "投中" },
  { id: "knowledge", label: "知识图谱", icon: "GitBranch", category: "data", categoryLabel: "数据" },
  { id: "postinvest", label: "投后智管", icon: "LineChart", category: "post", categoryLabel: "投后" },
  { id: "assistant", label: "AI助手", icon: "Bot", category: "tool", categoryLabel: "工具" },
  { id: "toolkit", label: "智能装备库", icon: "Wrench", category: "tool", categoryLabel: "工具" },
  { id: "multichannel", label: "多端接入", icon: "Smartphone", category: "tool", categoryLabel: "工具" },
]
