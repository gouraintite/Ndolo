export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  email: string
  password: string
  phone?: string
  locale?: string
}

export interface LoginResponse {
  userId: string
  email: string
  roles: string[]
  token: string
}
