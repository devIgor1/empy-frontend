import { api } from "@/lib/axios"

export const getPlans = async () => {
  const response = await api.get("/plans")
  return response.data
}
