import AuthenticatedLayout from "../layouts/AuthenticatedLayout"
import { useState, useEffect } from "react"
import { getCurrentPlan } from "../services/getCurrentPlan"
import dayjs from "dayjs"
import type { CurrentPlan } from "../types/currentPlan"
import PlanHeader from "../components/PlanHeader"
import { formatToBRL } from "../helpers/formatPriceToBRL"
import { Link } from "react-router-dom"
import PlanInfoRow from "../components/PlanInfoRow"

const MyPlanPage = () => {
  const [plan, setPlan] = useState<CurrentPlan | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getCurrentPlan()
      .then((data) => setPlan(data))
      .catch((err) => console.error("Erro ao buscar plano:", err))
      .finally(() => setLoading(false))
    console.log(plan)
  }, [])

  if (!plan) return <p>Nenhum plano encontrado.</p>

  const { cardLastDigits, billingCycle, createdAt, plan: planData } = plan
  const { publicName, monthlyPrice, annualPrice } = planData

  if (loading) return <p>Carregando plano...</p>
  if (!plan) return <p>Nenhum plano encontrado.</p>
  return (
    <AuthenticatedLayout>
      <div className="flex">
        <div className="flex-1 p-3 sm:p-6">
          <PlanHeader />

          <div className="bg-white p-4 sm:p-6 rounded-lg shadow">
            {/* Header do Plano */}
            <p className="text-lg sm:text-xl text-[#3B51FF] font-semibold">
              {publicName}
              {planData.isActive ? " (ATIVO)" : " (INATIVO)"}
            </p>

            <p className="bg-[#F96E0F] text-xs sm:text-sm mt-2 rounded-sm p-2 sm:p-1 text-center font-bold text-white">
              Assinatura expira em{" "}
              {dayjs(createdAt).add(1, "month").format("DD/MM/YYYY")}
            </p>

            <div className="mt-5">
              <PlanInfoRow
                label="Frequência de Pagamento"
                value={
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-0">
                    <span className="text-sm sm:text-base">
                      {formatToBRL(
                        billingCycle === "MONTHLY" ? monthlyPrice : annualPrice
                      )}
                      {billingCycle === "MONTHLY" ? " MENSAL" : " ANUAL"}
                    </span>
                    <span className="text-white bg-[#F96E0F] px-3 py-2 sm:px-2 sm:py-1 rounded-full text-xs sm:text-sm hover:bg-[#F96E0F]/80 transition-all duration-300 cursor-pointer text-center sm:text-left">
                      Pagar agora
                    </span>
                  </div>
                }
                rightContent={
                  <Link to="/history">
                    <p className="text-xs sm:text-sm text-blue-600 hover:text-blue-800">
                      Ver histórico completo
                    </p>
                  </Link>
                }
                showTopSpacing
              />
            </div>

            <hr className="my-4 sm:my-5" />

            <PlanInfoRow
              label="Acesso"
              value={billingCycle === "MONTHLY" ? "30 dias" : "365 dias"}
              showTopSpacing
            />
            <hr className="my-4 sm:my-5" />

            <PlanInfoRow
              label="Créditos Online"
              value={`${planData.onlineCredits} Créditos recarregados automaticamente`}
              showTopSpacing
            />
            <hr className="my-4 sm:my-5" />

            <PlanInfoRow
              label="Créditos Offline"
              value={`${planData.offlineCredits} Créditos recarregados manualmente`}
              showTopSpacing
            />
            <hr className="my-4 sm:my-5" />

            <PlanInfoRow
              label="Tipo de Pagamento"
              value={`Cartão - ${cardLastDigits}`}
              showTopSpacing
              rightContent={
                <span className="text-white bg-[#3B51FF] px-3 py-2 sm:p-2 rounded-full text-xs sm:text-sm hover:bg-[#3B51FF]/80 transition-all duration-300 cursor-pointer whitespace-nowrap">
                  Meus Cartões
                </span>
              }
            />
            <hr className="my-4 sm:my-5" />

            <PlanInfoRow
              label="Email de Cobrança"
              value="EMPBANK@google.com"
              showTopSpacing
            />
            <hr className="my-4 sm:my-5" />

            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4 lg:gap-0">
              <PlanInfoRow
                label="Recarga da Assinatura"
                value={dayjs(planData.createdAt).format("DD/MM/YYYY")}
                showTopSpacing
              />

              <div className="flex flex-col items-start text-sm">
                <p>Última cobrança enviada</p>
                <p className="text-gray-600">
                  {dayjs(planData.createdAt).format("DD/MM/YYYY")}
                </p>
              </div>

              <div className="flex flex-col items-start mr-45">
                <p className="text-sm">Parcelamento da Assinatura Ativa</p>
                <p className="text-gray-600">-</p>
              </div>
            </div>

            <hr className="my-4 sm:my-5 text-[#3B51FF]" />

            <div className="flex items-end justify-end">
              <span className="text-white bg-[#EC5F6D] px-4 py-2 sm:p-2 rounded-full text-xs sm:text-sm hover:bg-[#EC5F6D]/80 transition-all duration-300 cursor-pointer">
                Cancelar Plano
              </span>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  )
}

export default MyPlanPage
