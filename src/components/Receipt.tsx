import { useLocation, useNavigate } from "react-router-dom"

const Receipt = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { plan, amount, last4Digits } = location.state || {}

  if (!plan) return <p>Erro: dados não encontrados.</p>

  return (
    <div className="p-10 flex flex-col items-center gap-10">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-3xl">
        <h2 className="text-xl font-bold text-[#2F51FB]">Comprovante Empy</h2>
        <p className="mt-2">Pagamento via Cartão</p>
        <p className="mt-4 text-gray-600 font-semibold">
          Cartão de crédito: Mastercard - final {last4Digits}
        </p>
        <button
          className="mt-6 bg-[#2F51FB] text-white px-6 py-2 rounded-full"
          onClick={() => navigate("/")}
        >
          Ir para meu plano
        </button>
      </div>

      <div className="bg-white p-6 rounded-xl shadow w-full max-w-sm">
        <h3 className="font-semibold">{plan.publicName}</h3>
        <ul className="text-sm text-gray-600 my-2">
          <li>✔️ Consulta de benefícios do INSS</li>
          <li>🟢 {plan.offlineCredits} Créditos Offline</li>
          <li>🔴 {plan.onlineCredits} Créditos Online</li>
        </ul>
        <hr className="my-2" />
        <p className="font-medium">
          Valor: <span className="text-black">R$ {amount.toFixed(2)}</span>
        </p>
        <p className="font-bold text-[#2F51FB] text-lg">
          Total: R$ {amount.toFixed(2)}
        </p>
      </div>
    </div>
  )
}

export default Receipt
