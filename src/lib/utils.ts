import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const statusToPtBr = (status: string) => {
  switch (status) {
    case "PAID":
      return "Pago"
    case "DECLINED_NO_LIMIT":
      return "Não autorizado"
    case "FAILED":
      return "Recusado - Sem limite"
    default:
      return status
  }
}
