import { useEffect, useState } from "react"
import type { Plan } from "@/types/Plan"
import { getPlans } from "@/services/getPlans"
import { api } from "@/lib/axios"
import { useNavigate } from "react-router-dom"
import { IoIosAlert } from "react-icons/io"
import { toast } from "react-toastify"
import {
  CreateCustomPlanSchema,
  type CreateCustomPlanDTO,
} from "@/schemas/customPlan.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

const NewPlanForm = () => {
  const navigate = useNavigate()
  const [plans, setPlans] = useState<Plan[]>([])
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateCustomPlanDTO>({
    resolver: zodResolver(CreateCustomPlanSchema),
  })

  useEffect(() => {
    getPlans().then((data) => {
      setPlans(data)
    })
  }, [])

  const onSubmit = async (data: CreateCustomPlanDTO) => {
    const payload = { ...data, basePlanId: "2" }

    try {
      await api.post("/plans/custom", payload)
      toast.success("Plano criado com sucesso!")
      navigate("/admin/active-plans")
    } catch (error: any) {
      console.error("Erro ao criar plano:", error)
      if (error.response?.data) {
        console.log("Erro da API:", error.response.data)
      }
      toast.error("Erro ao criar plano. Verifique os dados.")
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-7xl mx-auto p-6 bg-white rounded-lg"
    >
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Criar Plano</h1>

      <div className="border-l-4 border-blue-600 pl-4 mb-6">
        <div className="bg-[#FAA61A1A] border border-[#FAA61A] px-4 py-3 rounded mb-4 text-sm flex items-center gap-2">
          <IoIosAlert color="#FAA61A" size={30} />
          Seu plano terá as configurações do plano base.
        </div>

        <label className="block text-sm mb-1">
          Escolher Plano Base (Obrigatório)
        </label>

        <input type="hidden" {...register("basePlanId")} value="2" />

        <select
          disabled
          className="w-full p-2 border border-gray-300 rounded-lg text-gray-700 bg-gray-100"
          value="2"
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
        <input
          {...register("namePublic")}
          type="text"
          placeholder="Título Comercial"
          className="w-full p-2 border border-gray-300 rounded-lg mb-1"
        />
        {errors.namePublic && (
          <p className="text-red-500 text-sm">{errors.namePublic.message}</p>
        )}
      </div>

      <div className="border-l-4 border-blue-600 pl-4 mb-2 mt-4">
        <label className="block text-sm mb-1">Título Interno (Privado)</label>
        <input
          {...register("nameInternal")}
          type="text"
          placeholder="Título Interno"
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
        {errors.nameInternal && (
          <p className="text-red-500 text-sm">{errors.nameInternal.message}</p>
        )}
      </div>

      <div className="border-l-4 border-blue-600 pl-4 mb-2 mt-4">
        <label className="block text-sm mb-1">Desconto (%)</label>
        <input
          {...register("discount", { valueAsNumber: true })}
          type="number"
          placeholder="Ex: 10"
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
        {errors.discount && (
          <p className="text-red-500 text-sm">{errors.discount.message}</p>
        )}
      </div>

      <div className="border-l-4 border-blue-600 pl-4 mb-2 mt-4">
        <label className="block text-sm mb-1">Preço Mensal</label>
        <input
          {...register("monthlyPrice", { valueAsNumber: true })}
          type="number"
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
        {errors.monthlyPrice && (
          <p className="text-red-500 text-sm">{errors.monthlyPrice.message}</p>
        )}
      </div>

      <div className="border-l-4 border-blue-600 pl-4 mb-2 mt-4">
        <label className="block text-sm mb-1">Preço Anual</label>
        <input
          {...register("annualPrice", { valueAsNumber: true })}
          type="number"
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
        {errors.annualPrice && (
          <p className="text-red-500 text-sm">{errors.annualPrice.message}</p>
        )}
      </div>

      <div className="flex justify-center items-center mt-6">
        <button
          type="submit"
          className="bg-[#3B51FF] hover:bg-[#3B51FF]/80  text-white px-40 py-3 rounded-full font-bold cursor-pointer"
        >
          Salvar
        </button>
      </div>
    </form>
  )
}

export default NewPlanForm
