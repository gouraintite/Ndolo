import { createContext, useEffect, useState } from 'react'
import type { LoginResponse } from '@/types/auth'

interface AuthState {
  user: LoginResponse | null
  token: string | null
  setAuth: (data: LoginResponse) => void
  clearAuth: () => void
}

const AuthContext = createContext<AuthState | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<LoginResponse | null>(null)
  const [token, setToken] = useState<string | null>(null)

  useEffect(() => {
    const stored = localStorage.getItem('ndolo_token')
    const storedUser = localStorage.getItem('ndolo_user')
    if (stored && storedUser) {
      setToken(stored)
      setUser(JSON.parse(storedUser))
    }
  }, [])

  function setAuth(data: LoginResponse) {
    localStorage.setItem('ndolo_token', data.token)
    localStorage.setItem('ndolo_user', JSON.stringify(data))
    setToken(data.token)
    setUser(data)
  }

  function clearAuth() {
    localStorage.removeItem('ndolo_token')
    localStorage.removeItem('ndolo_user')
    setToken(null)
    setUser(null)
  }

  return <AuthContext.Provider value={{ user, token, setAuth, clearAuth }}>{children}</AuthContext.Provider>
}

export { AuthContext }
