interface TradePlan {
  id: string
  symbol: string
  type: 'swing' | 'day' | 'scalping'
  expectedHoldingPeriod: number
  investment: {
    amount: number
    currency: string
  }
  entry: {
    targetPrice: number
    splitEntry: {
      price: number
      percentage: number
    }[]
    reason: string
    analysis: string[]
  }
  exit: {
    takeProfit: number
    stopLoss: number
    splitExit: {
      price: number
      percentage: number
    }[]
  }
  riskManagement: {
    portfolioWeight: number
    maxLoss: number
    checkList: {
      item: string
      checked: boolean
    }[]
  }
  status: 'draft' | 'active' | 'completed' | 'cancelled'
  createdAt: Date
  updatedAt: Date
} 