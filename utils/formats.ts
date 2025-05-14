export const formatCurrency = (amount: number | null) => {
  const value = amount || 0;
  return new Intl.NumberFormat('fa-IR', {
    style: 'currency',
    currency: 'IRR',
    currencyDisplay: 'name',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })
  .format(value)
  .replace(/ریال ایران/g, 'تومان');
};

