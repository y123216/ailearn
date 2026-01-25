'use client'

import { useState, useEffect } from 'react'
import { User } from './types'

interface AuthState {
  user: User | null
  token: string | null
  isLoading: boolean
  isAuthenticated: boolean
}

interface UseAuthReturn extends AuthState {
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
  refreshUser: () => Promise<void>
}

export function useAuth(): UseAuthReturn {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    token: null,
    isLoading: true,
    isAuthenticated: false
  })

  // 初始化时从localStorage加载用户信息
  useEffect(() => {
    const loadUser = () => {
      const token = localStorage.getItem('token')
      const userStr = localStorage.getItem('user')
      
      if (token && userStr) {
        try {
          const user = JSON.parse(userStr) as User
          setAuthState({
            user,
            token,
            isLoading: false,
            isAuthenticated: true
          })
        } catch (error) {
          // 解析错误，清除localStorage
          localStorage.removeItem('token')
          localStorage.removeItem('user')
          setAuthState({
            user: null,
            token: null,
            isLoading: false,
            isAuthenticated: false
          })
        }
      } else {
        setAuthState({
          user: null,
          token: null,
          isLoading: false,
          isAuthenticated: false
        })
      }
    }

    loadUser()
  }, [])

  const login = async (email: string, password: string) => {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })

    if (!response.ok) {
      throw new Error('登录失败')
    }

    const data = await response.json()
    
    // 存储到localStorage
    localStorage.setItem('token', data.token)
    localStorage.setItem('user', JSON.stringify(data.user))
    
    // 更新状态
    setAuthState({
      user: data.user,
      token: data.token,
      isLoading: false,
      isAuthenticated: true
    })
  }

  const register = async (name: string, email: string, password: string) => {
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, password })
    })

    if (!response.ok) {
      throw new Error('注册失败')
    }

    const data = await response.json()
    
    // 存储到localStorage
    localStorage.setItem('token', data.token)
    localStorage.setItem('user', JSON.stringify(data.user))
    
    // 更新状态
    setAuthState({
      user: data.user,
      token: data.token,
      isLoading: false,
      isAuthenticated: true
    })
  }

  const logout = () => {
    // 清除localStorage
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    
    // 更新状态
    setAuthState({
      user: null,
      token: null,
      isLoading: false,
      isAuthenticated: false
    })
  }

  const refreshUser = async () => {
    const token = localStorage.getItem('token')
    if (!token) {
      logout()
      return
    }

    try {
      const response = await fetch('/api/auth/me', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (!response.ok) {
        throw new Error('获取用户信息失败')
      }

      const data = await response.json()
      
      // 更新localStorage
      localStorage.setItem('user', JSON.stringify(data.user))
      
      // 更新状态
      setAuthState({
        user: data.user,
        token,
        isLoading: false,
        isAuthenticated: true
      })
    } catch (error) {
      // 获取失败，登出
      logout()
    }
  }

  return {
    ...authState,
    login,
    register,
    logout,
    refreshUser
  }
}
