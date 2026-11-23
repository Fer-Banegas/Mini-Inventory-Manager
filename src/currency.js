const lempiras = new Intl.NumberFormat('es-HN', {
  style: 'currency',
  currency: 'HNL',
})

export function formatCurrency(value) {
  return lempiras.format(value)
}
