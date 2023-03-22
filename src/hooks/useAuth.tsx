import { createContext, PropsWithChildren, useContext, useState } from 'react'

interface AuthCtx {
  removeAuth: () => void
  setAuth: (email: string) => void
  currentUser: string | null
  isAuthenticated: boolean
}

const AUTH_KEY = 'netflikemon-user'

const AuthContext = createContext<AuthCtx>({
  isAuthenticated: false,
  setAuth: () => true,
  currentUser: null,
  removeAuth: () => true
})

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [currentUser, setCurrentUser] = useState<string | null>(localStorage.getItem(AUTH_KEY))
  const setAuth = (email: string) => {
    setCurrentUser(email)
    localStorage.setItem(AUTH_KEY, email)
  }
  const removeAuth = () => {
    setCurrentUser(null)
    localStorage.removeItem(AUTH_KEY)
  }

  return (
    <AuthContext.Provider value={{ setAuth, removeAuth, currentUser, isAuthenticated: !!currentUser }}>
      {children}
    </AuthContext.Provider>
  )
}
