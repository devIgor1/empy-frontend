import { useEffect, useState } from "react"
import { useParams, useSearchParams } from "react-router-dom"
import CheckoutForm from "../components/CheckoutForm"
import Navbar from "../components/Navbar"
import Stepper from "../components/Stepper"
import axios from "axios"

const Checkout = () => {
  const { cycle } = useParams()
  const [searchParams] = useSearchParams()
  const planId = searchParams.get("planId")

  console.log(planId)
  const [planData, setPlanData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!planId) {
      setError("ID do plano inválido.")
      return
    }

    const fetchPlan = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/plans/${planId}`
        )
        setPlanData(response.data)
      } catch (err) {
        setError("Erro ao carregar o plano.")
      } finally {
        setLoading(false)
      }
    }

    fetchPlan()
  }, [planId])

  if (!planId || !cycle) {
    return <p className="text-red-500 mt-10">Erro: plano ou ciclo inválido.</p>
  }

  if (loading) {
    return <p className="text-gray-500 mt-10">Carregando plano...</p>
  }

  if (error || !planData) {
    return <p className="text-red-500 mt-10">{error}</p>
  }

  return (
    <div className="flex flex-col items-center justify-center max-w-7xl mx-auto">
      <Navbar />
      <main className="px-4 py-10 flex flex-col items-center">
        <div className="bg-white rounded-xl shadow-md px-10 py-8 space-y-8 flex flex-col items-center justify-center w-full max-w-2xl">
          <Stepper />
          <CheckoutForm planId={planId} cycle={cycle} planData={planData} />
        </div>
      </main>
    </div>
  )
}

export default Checkout
