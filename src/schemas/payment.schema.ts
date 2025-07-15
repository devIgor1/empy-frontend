import { z } from "zod"

export const PaymentSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  cardNumber: z
    .string()
    .regex(/^\d{4} \d{4} \d{4} \d{4}$/, "Número do cartão inválido"),
  expiry: z
    .string()
    .regex(/^(0[1-9]|1[0-2])\/\d{4}$/, "Formato esperado: MM/AAAA"),
  cvv: z.string().regex(/^\d{3}$/, "CVV inválido (3 dígitos)"),
})

export type PaymentDTO = z.infer<typeof PaymentSchema>
