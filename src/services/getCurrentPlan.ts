import { api } from "@/lib/axios"

export const getCurrentPlan = async () => {
  const response = await api.get("/my-plan")
  return response.data
}
