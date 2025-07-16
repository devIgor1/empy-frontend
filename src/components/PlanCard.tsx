import { PiCheckCircle } from "react-icons/pi"
import type { Plan } from "../types/Plan"
import { Link } from "react-router-dom"
import { formatToBRL } from "../helpers/formatPriceToBRL"

const PlanCard = ({
  id,
  publicName,
  annualPrice,
  monthlyPrice,
  offlineCredits,
  onlineCredits,
}: Plan) => {
  return (
    <div className="empy-border-gray shadow-sm flex flex-col justify-between p-[10px]">
      <div>
        <h3 className="text-lg">Plano</h3>
        <span className="text-black font-bold text-2xl">{publicName}</span>

        <div className="empy-border-blue my-3 text-center p-[5px]">
          <p className="empy-text-blue text-md font-medium w-full">
            Ganhe 2 meses de desconto na contratação anual com 12 meses de
            fidelidade
          </p>
          <p className="empy-text-gray font-bold flex items-center justify-center gap-1">
            Anual R$
            <span className="empy-text-blue font-bold text-4xl">
              {formatToBRL(annualPrice / 12)}
            </span>
            / mensais
          </p>
        </div>

        <div>
          <p className="empy-text-gray font-bold flex items-center justify-center gap-1">
            Mensal R$
            <span className="text-black font-bold text-4xl">
              {formatToBRL(monthlyPrice)}
            </span>
            / mensais
          </p>
        </div>

        <div className="empy-bg-blue rounded-lg text-white mt-4 px-4 py-3 space-y-2">
          <p className="font-semibold flex justify-start items-center gap-2">
            <PiCheckCircle size={20} color="white" />
            Consulta de benefícios do INSS
          </p>

          <p className="text-sm flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-green-500" />
            {offlineCredits} créditos offline
          </p>
          <p className="text-sm flex items-center gap-2">
            <span
              className={`h-2 w-2 rounded-full ${
                onlineCredits.includes("ILIMITADOS")
                  ? "bg-red-500"
                  : "bg-green-500"
              }`}
            />
            {onlineCredits} créditos online
          </p>

          <div className="flex flex-col gap-2 mt-4">
            <Link
              to={`/checkout/anual?planId=${id}`}
              className="empy-button-blue hover:bg-[#006EB6] flex justify-center items-center"
            >
              Assinar anual
            </Link>
            <Link
              to={`/checkout/mensal?planId=${id}`}
              className="empy-button-blue hover:bg-[#006EB6] flex justify-center items-center"
            >
              Assinar mensal
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlanCard
