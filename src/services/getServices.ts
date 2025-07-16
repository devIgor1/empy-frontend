import axios from "axios"

export const getPurchases = async () => {
  const response = await axios.get("http://localhost:3333/purchases")
  return response.data
}
