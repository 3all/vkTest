export const parseNumber = (value: number, variants: string[]): string => {
  const formattedvalue: string | number = formatNumber(value)

  if (value === 1) {
    return `${formattedvalue} ${variants[0]}`
  } else if (value % 10 === 1 && !(value % 100 >= 11 && value % 100 <= 14)) {
    return `${formattedvalue} ${variants[0]}`
  } else if (
    (value > 1 && value < 5) ||
    (value % 10 > 1 &&
      value % 10 < 5 &&
      !(value % 100 >= 11 && value % 100 <= 14))
  ) {
    return `${formattedvalue} ${variants[1]}`
  } else {
    return `${formattedvalue} ${variants[2]}`
  }
}

const formatNumber = (value: number): string | number => {
  if (value >= 1000) {
    if (value % 1000 === 0) {
      return `${value / 1000}к`
    } else {
      return `${(value / 1000).toFixed(1)}к`
    }
  }
  return value
}
