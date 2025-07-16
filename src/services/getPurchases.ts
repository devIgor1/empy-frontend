import { api } from "@/lib/axios"

export const getPurchases = async () => {
  const response = await api.get("/purchases")
  return response.data
}
