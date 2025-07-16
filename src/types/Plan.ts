export type Plan = {
  id: string
  publicName: string
  internalName?: string
  monthlyPrice: number
  annualPrice: number
  discount?: number
  isCustom: boolean
  offlineCredits: number
  onlineCredits: string
  isActive: boolean
  isRecommended: boolean
  paymentLink?: string
  createdAt: string
}
