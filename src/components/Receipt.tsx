import { useLocation, useNavigate } from "react-router-dom"
import empyLogo from "../assets/empy, icon2.svg"
import { PiCheckCircleLight } from "react-icons/pi"

const Receipt = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { plan, amount, last4Digits } = location.state || {}

  if (!plan) return <p>Erro: dados não encontrados.</p>

  return (
    <div className="p-10 flex justify-center items-start lg:flex-row flex-col gap-10 h-screen ">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-3xl">
        <div className="bg-[#3342B7] max-w-2xl h-[295px] rounded-xl p-7">
          <img
            src={empyLogo}
            alt="empty"
            width={100}
            height={100}
            className="bg-"
          />
          <h2 className="text-2xl font-light text-white mt-6">
            Comprovante Empy
          </h2>
          <p className="mt-6 text-white font-bold text-xl">
            Pagamento via Cartão
          </p>
        </div>
        <p className="mt-4 text-gray-600 text-sm">Cartão de crédito</p>
        <p className=" font-bold text-xl">Mastercard - final {last4Digits}</p>
        <div className="mt-6 flex justify-center">
          <button
            className="bg-[#3B51FF] text-white px-25 py-2 rounded-full"
            onClick={() => navigate("/")}
          >
            Ir para meu plano
          </button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow w-full max-w-sm">
        <div className="w-[230px]">
          <h3 className="font-semibold">{plan.publicName}</h3>
          <ul className="text-sm text-gray-600 my-2">
            <li className="flex items-center gap-2">
              <PiCheckCircleLight size={20} color="#000000" />
              Consulta de benefícios do INSS
            </li>
            <div className="flex flex-col items-start gap-2 ml-7 mt-2">
              <p className="text-sm flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-green-500" />
                {plan.offlineCredits} créditos offline
              </p>
              <p className="text-sm flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-red-500" />
                {plan.onlineCredits} créditos online
              </p>
            </div>
          </ul>
          <hr className="my-2 border-gray-200 w-full" />
          <div className="flex justify-between items-center p-2">
            <p className="font-light text-[#121929A3]">Valor:</p>
            <span className="text-[#121929A3] font-bold text-xl">
              R$ {amount.toFixed(2)}
            </span>
          </div>
          <hr className="my-2 border-gray-200 w-full" />
          <div className="flex justify-between items-center p-2">
            <p className="font-bold text-[#3F4FFF]">Total:</p>
            <span className="text-[#3F4FFF] font-bold text-xl">
              R$ {amount.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Receipt
