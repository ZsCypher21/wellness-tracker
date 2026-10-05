export function formatLiters(value) {
  return parseFloat(value)
    .toFixed(2)
    .replace(/\.?0+$/, "");
}
