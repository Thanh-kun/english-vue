export const sleep = (timer = 2000) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true)
    }, timer)
  })
}

export function getBase64(img, callback) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}
