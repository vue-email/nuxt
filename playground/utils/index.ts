export function getRandomInt(min: number, max: number): number {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export function getRandomArbitrary(min: number, max: number): number {
  return Math.random() * (max - min) + min
}

export function baseUrl(path: string): string {
  return `https://vue-email-demo.vercel.app${path}`
}
