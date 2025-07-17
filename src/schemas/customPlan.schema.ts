import { z } from "zod"

export const CreateCustomPlanSchema = z.object({
  basePlanId: z.literal("2"),
  namePublic: z.string().min(1, "Título público é obrigatório"),
  nameInternal: z.string().optional(),
  discount: z.number().min(0).max(100, "Desconto deve ser entre 0 e 100"),
  monthlyPrice: z.number().positive("Preço mensal deve ser positivo"),
  annualPrice: z.number().positive("Preço anual deve ser positivo"),
})

export type CreateCustomPlanDTO = z.infer<typeof CreateCustomPlanSchema>
