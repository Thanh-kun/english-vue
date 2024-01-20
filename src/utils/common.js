export const sleep = (timer = 2000) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, timer)
  })
}
