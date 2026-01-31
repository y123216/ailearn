'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useAuth } from '@/lib/auth/useAuth'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const { user, isAuthenticated, logout } = useAuth()

  const handleLogout = () => {
    logout()
    setUserMenuOpen(false)
  }

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              <span className="ml-2 text-xl font-bold">AI智能工具平台</span>
            </Link>
          </div>

          {/* 桌面导航 */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/learning" className="text-gray-600 hover:text-primary font-medium">
              AI互动式学习平台
            </Link>
            <Link href="/learning/skills" className="text-gray-600 hover:text-primary font-medium">
              AI技能刷题站
            </Link>
            <Link href="/growth/learning" className="text-gray-600 hover:text-primary font-medium">
              增长工具
            </Link>
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center space-x-2 text-gray-600 hover:text-primary font-medium focus:outline-none"
                >
                  <span>{user?.name || '用户'}</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                    <div className="px-4 py-2 text-sm text-gray-500">
                      {user?.email}
                    </div>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-gray-100"
                    >
                      退出登录
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link href="/auth/login" className="text-gray-600 hover:text-primary font-medium">
                  登录
                </Link>
                <Link href="/auth/register" className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 font-medium transition-colors">
                  注册
                </Link>
              </>
            )}
          </div>

          {/* 移动端菜单按钮 */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-primary focus:outline-none"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* 移动端导航 */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-2">
            <Link href="/learning" className="block text-gray-600 hover:text-primary font-medium px-4 py-2">
              AI互动式学习平台
            </Link>
            <Link href="/learning/skills" className="block text-gray-600 hover:text-primary font-medium px-4 py-2">
              AI技能刷题站
            </Link>
            <Link href="/growth/learning" className="block text-gray-600 hover:text-primary font-medium px-4 py-2">
              增长工具
            </Link>
            {isAuthenticated ? (
              <div className="px-4 py-2">
                <div className="text-gray-600 font-medium mb-2">{user?.name || '用户'}</div>
                <div className="text-sm text-gray-500 mb-2">{user?.email}</div>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-md"
                >
                  退出登录
                </button>
              </div>
            ) : (
              <>
                <Link href="/auth/login" className="block text-gray-600 hover:text-primary font-medium px-4 py-2">
                  登录
                </Link>
                <Link href="/auth/register" className="block bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 font-medium transition-colors">
                  注册
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}