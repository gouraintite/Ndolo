import client from './client'
import type { LoginRequest, LoginResponse, RegisterRequest } from '@/types/auth'

export const authApi = {
  register: (data: RegisterRequest) =>
    client.post<LoginResponse>('/api/auth/register', data).then((r) => r.data),

  login: (data: LoginRequest) =>
    client.post<LoginResponse>('/api/auth/login', data).then((r) => r.data),

  me: () => client.get<LoginResponse>('/api/auth/me').then((r) => r.data),
}
