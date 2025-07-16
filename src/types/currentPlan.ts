import type { Plan } from "./Plan"

export type CurrentPlan = {
  id: string
  customerId: string
  customerName: string
  planId: string
  amount: number
  billingCycle: "MONTHLY" | "ANNUAL"
  createdAt: string
  status: string
  cardLastDigits: string
  plan: Plan
}
