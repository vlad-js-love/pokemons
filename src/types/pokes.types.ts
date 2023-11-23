export type ReqPoke = {
  name: string
  url: string
}
export type ReqPokes = {
  count: number
  next: string
  previous: string
  results: ReqPoke[]
}

export type ReqType = {
  name: string
  url: string
}
export type ReqTypes = {
  count: number
  next: string
  previous: string
  results: ReqType[]
}