export function formatCompactNumber(num: number) {
  if (num < 1000) return num.toString();

  if (num < 1_000_000) {
    const value = num / 1000;
    return value % 1 === 0 ? `${value}k` : `${value.toFixed(2)}k`;
  }

  if (num < 1_000_000_000) {
    const value = num / 1_000_000;
    return value % 1 === 0 ? `${value}M` : `${value.toFixed(2)}M`;
  }

  const value = num / 1_000_000_000;
  return value % 1 === 0 ? `${value}B` : `${value.toFixed(2)}B`;
}
