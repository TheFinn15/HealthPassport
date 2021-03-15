
export type JwtType = {
  data: {
    id: number
    login: string
    role: string
  }
  iat: number
  sub: string
}
