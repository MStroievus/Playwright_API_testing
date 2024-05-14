export interface AuthUser {
  email: string,
  password: string
}

export interface ApiAuth {
  user?: AuthUser
  token?: string
}