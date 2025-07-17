import { useEffect, useState } from "react"
import type { Plan } from "@/types/Plan"
import { getPlans } from "@/services/getPlans"
import { api } from "@/lib/axios"
import { useNavigate } from "react-router-dom"
import { IoIosAlert } from "react-icons/io"

const NewPlanForm = () => {
  const navigate = useNavigate()
  const [plans, setPlans] = useState<Plan[]>([])
  const [selectedPlanId, setSelectedPlanId] = useState<string | undefined>(
    undefined
  )
  const [publicName, setPublicName] = useState("")
  const [internalName, setInternalName] = useState("")
  const [discount, setDiscount] = useState(0)
  const [monthlyPrice, setMonthlyPrice] = useState(0)
  const [annualPrice, setAnnualPrice] = useState(0)

  useEffect(() => {
    getPlans().then((data) => {
      setPlans(data)
      const standard = data.find((plan: Plan) => plan.publicName === "Standard")
      if (standard) setSelectedPlanId(standard.id)
    })
  }, [])

  const handleSubmit = async () => {
    if (!selectedPlanId) return

    const body = {
      basePlanId: selectedPlanId,
      namePublic: publicName,
      nameInternal: internalName,
      discount,
      monthlyPrice,
      annualPrice,
    }

    try {
      const { data } = await api.post("/plans/custom", body)
      console.log("Plano criado:", data)
      alert("Plano criado com sucesso!")
      navigate("/admin/active-plans")
    } catch (error: any) {
      console.error("Erro ao criar plano:", error)
      alert("Erro ao criar plano. Verifique os dados.")
    }
  }

  return (
    <div className="w-full max-w-7xl mx-auto p-6 bg-white rounded-lg">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Criar Plano</h1>

      <div className="border-l-4 border-blue-600 pl-4 mb-6">
        <div className="bg-[#FAA61A1A] border border-[#FAA61A] px-4 py-3 rounded mb-4 text-sm flex items-center gap-2">
          <IoIosAlert color="#FAA61A" size={30} />
          Seu plano terá as configurações do plano base.
        </div>

        <label className="block text-sm mb-1">
          Defina um plano base para seu novo plano:
        </label>
        <hr className="my-3" />
        <label className="block text-sm mb-1">
          Escolher Plano Base (Obrigatório)
        </label>
        <select
          value={selectedPlanId}
          onChange={(e) => setSelectedPlanId(e.target.value)}
          disabled
          className="w-full p-2 border border-gray-300 rounded-lg cursor-not-allowed text-gray-400"
        >
          {plans.map((plan) => (
            <option key={plan.id} value={plan.id}>
              {plan.publicName}
            </option>
          ))}
        </select>
      </div>

      <div className="border-l-4 border-blue-600 pl-4 mb-2">
        <label className="block text-sm mb-1">Título Comercial (Público)</label>
        <hr className="my-3" />
        <input
          type="text"
          placeholder="Título Comercial"
          className="w-full p-2 border border-gray-300 rounded mb-3 rounded-lg"
          value={publicName}
          onChange={(e) => setPublicName(e.target.value)}
        />
        <label className="block text-sm mb-1">Título Interno (Privado)</label>
        <hr className="my-3" />
        <input
          type="text"
          placeholder="Título Interno"
          className="w-full p-2 border border-gray-300 rounded rounded-lg"
          value={internalName}
          onChange={(e) => setInternalName(e.target.value)}
        />
      </div>
      <hr className="my-3" />

      <div className="border-l-4 border-blue-600 pl-4 mb-2">
        <label className="block text-sm">Aplicar desconto:</label>
        <hr className="my-3" />
        <p className="text-sm mb-2">
          Exemplo, se deseja um desconto de 30% basta inserir 30 no campo de
          desconto.
        </p>
        <label className="block text-sm mb-1">Desconto em porcentagem</label>
        <input
          type="number"
          placeholder="Placeholder"
          className="w-full p-2 border border-gray-300 rounded rounded-lg"
          value={discount}
          onChange={(e) => setDiscount(Number(e.target.value))}
        />
      </div>
      <hr className="my-3" />

      <div className="border-l-4 border-blue-600 pl-4 mb-2">
        <label className="block text-sm mb-1">Configurar valores:</label>
        <hr className="my-3" />
        <label className="block text-sm mb-1">Preço Mensal</label>
        <input
          type="number"
          placeholder="Preço Mensal"
          className="w-full p-2 border border-gray-300 rounded mb-3 rounded-lg"
          value={monthlyPrice}
          onChange={(e) => setMonthlyPrice(Number(e.target.value))}
        />
        <label className="block text-sm mb-1">Preço Anual</label>
        <input
          type="number"
          placeholder="Preço Anual"
          className="w-full p-2 border border-gray-300 rounded rounded-lg"
          value={annualPrice}
          onChange={(e) => setAnnualPrice(Number(e.target.value))}
        />
      </div>
      <hr className="my-3" />
      <div className="flex justify-center items-center">
        <button
          className="bg-blue-600 text-white px-40 py-3 rounded-full font-bold"
          onClick={handleSubmit}
        >
          Salvar
        </button>
      </div>
    </div>
  )
}

export default NewPlanForm
