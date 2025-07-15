import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { IMaskMixin } from "react-imask"
import axios from "axios"
import { PaymentSchema, type PaymentDTO } from "../schemas/payment.schema"
import { toast } from "react-toastify"

const CFormInputWithMask = IMaskMixin(({ inputRef, ...props }: any) => (
  <input {...props} ref={inputRef} />
))

const CheckoutForm = ({ planId, cycle }: { planId: string; cycle: string }) => {
  const [cardNumber, setCardNumber] = useState("")

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<PaymentDTO>({
    resolver: zodResolver(PaymentSchema),
  })

  const onSubmit = async (data: PaymentDTO) => {
    try {
      const response = await axios.post(
        `http://localhost:3333/checkout/${planId}/${cycle}`,
        {
          namePublic: data.name,
          cardNumber: cardNumber,
          expiry: data.expiry,
          cvv: data.cvv,
          monthlyPrice: 189.9,
          annualPrice: 1899,
        }
      )
      console.log(response.data)
    } catch (err) {
      toast.error("Erro ao enviar pagamento")
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full"
    >
      <div>
        <label className="text-sm font-medium text-gray-700">
          Nome do titular
        </label>
        <input
          {...register("name")}
          type="text"
          placeholder="John Doe"
          className="w-full mt-1 border rounded-md p-2 text-sm text-gray-700"
        />
        {errors.name && (
          <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700">
          Número do cartão
        </label>
        <CFormInputWithMask
          mask="0000 0000 0000 0000"
          placeholder="0000 0000 0000 0000"
          className="w-full mt-1 border rounded-md p-2 text-sm text-gray-700"
          value={cardNumber}
          onAccept={(value: string) => {
            setCardNumber(value)
            setValue("cardNumber", value, { shouldValidate: true })
          }}
        />
        {errors.cardNumber && (
          <p className="text-red-500 text-xs mt-1">
            {errors.cardNumber.message}
          </p>
        )}
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700">Validade</label>
        <input
          {...register("expiry")}
          type="text"
          placeholder="MM/AAAA"
          className="w-full mt-1 border rounded-md p-2 text-sm text-gray-700"
        />
        {errors.expiry && (
          <p className="text-red-500 text-xs mt-1">{errors.expiry.message}</p>
        )}
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700">
          Código de segurança
        </label>
        <input
          {...register("cvv")}
          type="text"
          placeholder="CVV"
          className="w-full mt-1 border rounded-md p-2 text-sm text-gray-700"
        />
        {errors.cvv && (
          <p className="text-red-500 text-xs mt-1">{errors.cvv.message}</p>
        )}
      </div>

      <div className="md:col-span-2">
        <button
          type="submit"
          className="bg-[#2F51FB] text-white font-semibold px-8 py-2 rounded-full hover:bg-[#1f3ce0] transition w-full"
        >
          Continuar
        </button>
      </div>
    </form>
  )
}

export default CheckoutForm
