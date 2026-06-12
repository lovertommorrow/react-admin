import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { LoginInfo } from '../api/user/types'

interface AuthState {
  token: string | null
  isAuthenticated: boolean
  login: (values: LoginInfo) => Promise<boolean>
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      isAuthenticated: false,
      login: async (values: LoginInfo) => {
        if (!values.username.trim() || !values.password.trim()) {
          return false
        }
        set({ token: 'mock-token', isAuthenticated: true })
        return true
      },
      logout: () => set({ token: null, isAuthenticated: false }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
)
