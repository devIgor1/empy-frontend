import CheckoutForm from "../components/CheckoutForm"
import Navbar from "../components/Navbar"
import Stepper from "../components/Stepper"
import { useParams, useSearchParams } from "react-router-dom"

const Checkout = () => {
  const { cycle } = useParams()
  const [searchParams] = useSearchParams()
  const planId = searchParams.get("planId")

  if (!planId || !cycle) {
    return <p className="text-red-500 mt-10">Erro: plano ou ciclo inválido.</p>
  }

  return (
    <div className="flex flex-col items-center justify-center max-w-7xl mx-auto">
      <Navbar />
      <main className="px-4 py-10 flex flex-col items-center">
        <div className="bg-white rounded-xl shadow-md px-10 py-8 space-y-8 flex flex-col items-center justify-center w-full max-w-2xl">
          <Stepper />
          <CheckoutForm planId={planId} cycle={cycle} />
        </div>
      </main>
    </div>
  )
}

export default Checkout
