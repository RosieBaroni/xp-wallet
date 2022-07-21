export const formatCurrencyToBRL = value =>
  Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);