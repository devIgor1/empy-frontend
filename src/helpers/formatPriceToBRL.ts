interface FormatOptions {
  locale?: string
  currency?: string
  minimumFractionDigits?: number
  maximumFractionDigits?: number
}

const defaultOptions: FormatOptions = {
  locale: "pt-BR",
  currency: "BRL",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
}

export function formatToBRL(
  value: number,
  options: FormatOptions = {}
): string {
  const mergedOptions: FormatOptions = { ...defaultOptions, ...options }

  if (typeof value !== "number" || isNaN(value)) {
    throw new Error("Valor deve ser um número válido")
  }

  return new Intl.NumberFormat(mergedOptions.locale, {
    style: "currency",
    currency: mergedOptions.currency,
    minimumFractionDigits: mergedOptions.minimumFractionDigits,
    maximumFractionDigits: mergedOptions.maximumFractionDigits,
  }).format(value)
}
