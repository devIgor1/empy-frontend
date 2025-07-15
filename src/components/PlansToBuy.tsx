import PlanCard from "./PlanCard"
import { PiWhatsappLogo } from "react-icons/pi"
import { api } from "../lib/axios"
import { useEffect, useState } from "react"
import type { Plan } from "../types"

const Plans = () => {
  const [plans, setPlans] = useState<Plan[]>([])

  useEffect(() => {
    api.get("/plans").then((response) => {
      setPlans(response.data)
    })
  }, [])

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-xl font-bold mb-6">Planos de acesso</h2>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
        {plans.map((plan) => (
          <PlanCard
            createdAt={plan.createdAt}
            key={plan.id}
            id={plan.id}
            publicName={plan.publicName}
            internalName={plan.internalName}
            monthlyPrice={plan.monthlyPrice}
            annualPrice={plan.annualPrice}
            discount={plan.discount}
            isCustom={plan.isCustom}
            offlineCredits={plan.offlineCredits}
            onlineCredits={plan.onlineCredits}
            isActive={plan.isActive}
            isRecommended={plan.isRecommended}
            paymentLink={plan.paymentLink}
          />
        ))}
      </div>

      <div className="mt-8 flex justify-start">
        <div className="bg-[#5E17F5] text-white px-5 py-3 rounded-full text-sm flex items-center justify-center gap-2 cursor-pointer hover:bg-[#4c0ed1] transition">
          <PiWhatsappLogo size={17} color="white" />
          <span className="text-sm">Tire suas dúvidas</span>
        </div>
      </div>
    </section>
  )
}

export default Plans
