export function formatCalcValue(value: string) {
  let valueEnd = value || '0,00';
  if (!value) {
    return;
  }
  let formatValue = String(valueEnd).replace(/\D/g, '');
  formatValue = (+formatValue / 100).toFixed(2) + '';
  formatValue = formatValue?.replace('.', ',');
  formatValue = formatValue?.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
  return formatValue;
}
