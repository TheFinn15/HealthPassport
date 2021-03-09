
export interface JWTResult {
  type?: string,
  tokenVerified?: boolean,
  role?: string,
  decoded?: {
    data: {
      id: number,
      login: string,
      role: string
    },
    ext: string,
    iat: string,
    sub: string
  },
  msg?: string
}
