import { useEffect, useState } from "react"
import { getCurrentPlan } from "../services/getCurrentPlan"
import type { CurrentPlan } from "../types/currentPlan"
import wppLogo from "../assets/wppLogo.svg"

const PlanHeader = () => {
  const [planName, setPlanName] = useState<string | null>(null)

  useEffect(() => {
    getCurrentPlan()
      .then((data: CurrentPlan) => setPlanName(data.plan.publicName))
      .catch((err) => {
        console.error("Erro ao buscar nome do plano:", err)
        setPlanName(null)
      })
  }, [])

  return (
    <div className="flex items-center justify-between">
      <h2 className="text-2xl font-bold mb-4">Meu Plano</h2>
      {planName && (
        <div className="flex items-center justify-center gap-4">
          <span className="bg-[#2F51FB] text-white text-sm font-bold px-4 py-1 rounded">
            Plano: {planName}
          </span>
          <img src={wppLogo} alt="wppLogo" />
        </div>
      )}
    </div>
  )
}

export default PlanHeader
