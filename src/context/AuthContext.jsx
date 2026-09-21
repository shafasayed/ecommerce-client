import { createContext, useContext, useEffect, useState } from 'react'
import { API_ENDPOINT } from '../api/index.js'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [checkedSession, setCheckedSession] = useState(false)

  useEffect(() => {
    async function loadSession() {
      const response = await fetch(`${API_ENDPOINT}/users/me`, {
        credentials: 'include'
      })

      if (response.ok) {
        const data = await response.json()
        setUser(data.user)
      }

      setCheckedSession(true)
    }

    loadSession()
  }, [])

  const logout = async () => {
    await fetch(`${API_ENDPOINT}/auth/logout`, {
      method: 'POST',
      credentials: 'include'
    })

    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, setUser, logout, checkedSession }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
