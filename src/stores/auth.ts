import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { LoginInfo } from '../api/user/types'
import { getAppNamespace } from '@/utils/getAppNameSpace'

interface AuthState {
  token: string | null
  isAuthenticated: boolean
  login: (values: LoginInfo) => Promise<boolean>
  logout: () => void
}

const initialState = {
  token: null,
  isAuthenticated: false
}

export const useAuthStore = create<AuthState>()(
  persist((set) => ({
      ...initialState,
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
      name: getAppNamespace('auth-storage'),
      partialize: (state) => ({
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
)
