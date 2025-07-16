export type Purchase = {
  id: string
  customerId: string
  customerName: string
  planId: string
  plan: {
    publicName: string
  }
  amount: number
  createdAt: string
  billingCycle: "MONTHLY" | "ANNUAL"
  status: "PAID" | "DECLINED" | "FAILED"
}
