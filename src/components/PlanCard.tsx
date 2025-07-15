import { PiCheckCircle } from "react-icons/pi"

type PlanCardProps = {
  title: string
  priceAnual: string
  priceMensal: string
  beneficios: string[]
}

const PlanCard = ({
  title,
  priceAnual,
  priceMensal,
  beneficios,
}: PlanCardProps) => {
  return (
    <div className="empy-border-gray shadow-sm flex flex-col justify-between p-[10px]">
      <div>
        <h3 className="text-lg">Plano</h3>
        <span className="text-black font-bold text-2xl">{title}</span>

        <div className="empy-border-blue p-1 my-3 text-center p-[5px]">
          <p className="empy-text-blue text-md font-medium w-full">
            Ganhe 2 meses de desconto na contratação anual com 12 meses de
            fidelidade
          </p>
          <p className="empy-text-gray font-bold flex items-center justify-center gap-1">
            Anual R$
            <span className="empy-text-blue font-bold text-4xl">
              {priceAnual}
            </span>
            / mensais
          </p>
        </div>

        <div className="">
          <p className="empy-text-gray font-bold flex items-center justify-center gap-1">
            Mensal R$
            <span className="text-black font-bold text-4xl">{priceMensal}</span>
            / mensais
          </p>
        </div>

        <div className="empy-bg-blue rounded-lg text-white mt-4 px-4 py-3 space-y-2">
          <p className="font-semibold flex justify-start items-center gap-2">
            <PiCheckCircle size={20} color="white" />
            Consulta de benefícios do INSS
          </p>
          {beneficios.map((b, i) => (
            <p key={i} className="text-sm flex items-center gap-2">
              <span
                className={`h-2 w-2 rounded-full ${
                  b.includes("ILIMITADOS") ? "bg-red-500" : "bg-green-500"
                }`}
              />
              {b}
            </p>
          ))}
          <div className="flex flex-col gap-2 mt-4">
            <button className="empy-button-blue hover:bg-[#006EB6] transition-all duration-300 hover:text-white">
              Assinar anual
            </button>
            <button className="empy-button-blue hover:bg-[#006EB6] transition-all duration-300 hover:text-white">
              Assinar mensal
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlanCard
