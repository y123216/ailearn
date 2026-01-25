'use client'

import { useState } from 'react'

export default function LearningGrowth() {
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubscribed(true)
      setEmail('')
      alert('注册成功！学习资料已发送到您的邮箱。')
    }
  }

  const resources = [
    {
      id: '1',
      title: '英语学习资料包',
      description: '包含初级、中级、高级英语学习资料',
      format: 'PDF',
      size: '50MB'
    },
    {
      id: '2',
      title: '日语五十音图',
      description: '标准五十音图发音指南',
      format: 'PDF',
      size: '10MB'
    },
    {
      id: '3',
      title: '程序员面试题库',
      description: '常见编程面试题及解析',
      format: 'PDF',
      size: '30MB'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <header className="text-center mb-12">
          <h1 className="text-3xl font-bold text-primary mb-4">学习平台增长工具</h1>
          <p className="text-gray-600">免费资源引流、社群运营工具</p>
        </header>

        {/* 免费资源引流 */}
        <div className="card mb-12">
          <h2 className="text-xl font-bold mb-6">免费资源引流</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-bold mb-4">学习资料下载</h3>
              <div className="space-y-4">
                {resources.map((resource) => (
                  <div key={resource.id} className="border rounded-lg p-4">
                    <h4 className="font-bold">{resource.title}</h4>
                    <p className="text-sm text-gray-600 mb-2">{resource.description}</p>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>{resource.format}</span>
                      <span>{resource.size}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-bold mb-4">注册领取</h3>
              <form onSubmit={handleSubscribe} className="space-y-4">
                <div>
                  <label className="label" htmlFor="email">邮箱地址</label>
                  <input
                    type="email"
                    id="email"
                    className="input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="请输入您的邮箱"
                    required
                  />
                </div>
                <button type="submit" className="btn-primary w-full">
                  {isSubscribed ? '已领取' : '立即领取'}
                </button>
                <p className="text-xs text-gray-500">
                  注册后，我们会将学习资料发送到您的邮箱
                </p>
              </form>
            </div>
          </div>
        </div>

        {/* 社群运营工具 */}
        <div className="card">
          <h2 className="text-xl font-bold mb-6">社群运营工具</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="font-bold mb-2">学习社群</h3>
              <p className="text-gray-600 mb-4">加入我们的学习社群，与其他学习者交流</p>
              <div className="bg-white p-4 rounded-lg inline-block">
                <p className="text-sm font-bold mb-2">扫描二维码加入</p>
                <div className="w-40 h-40 bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500">二维码</span>
                </div>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-bold mb-2">打卡活动</h3>
              <p className="text-gray-600 mb-4">参与每日学习打卡，赢取学习奖励</p>
              <button className="btn-secondary">
                立即参与
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}