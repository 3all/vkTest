export const delay = (sec: number) =>
  new Promise((resolve) => setTimeout(resolve, sec * 1000))
