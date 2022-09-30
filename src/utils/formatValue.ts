export function formatCalcValue(value: string) {
  let formatValue = value.replace(/\D/g, '');
  formatValue = (+formatValue / 100).toFixed(2) + '';
  formatValue = formatValue.replace('.', ',');
  formatValue = formatValue.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
  return formatValue;
}
