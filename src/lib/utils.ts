import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const statusToPtBr = (status: string) => {
  switch (status) {
    case "PAID":
      return "Pago"
    case "NOT_AUTHORIZED":
      return "Não autorizado"
    case "DECLINED_NO_LIMIT":
      return "Recusado - Sem limite"
    default:
      return status
  }
}
