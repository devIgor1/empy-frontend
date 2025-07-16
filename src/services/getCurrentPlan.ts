import axios from "axios"

export const getCurrentPlan = async () => {
  const response = await axios.get("http://localhost:3333/my-plan")
  console.log(response.data)
  return response.data
}
