'use client'

import { useState, useEffect } from 'react'

interface ErrorQuestion {
  id: string
  question: string
  userAnswer: string
  correctAnswer: string
  explanation: string
  category: string
  difficulty: string
  date: string
  tags: string[]
}

export default function ErrorAnalysis() {
  const [errorQuestions, setErrorQuestions] = useState<ErrorQuestion[]>([])
  const [selectedQuestion, setSelectedQuestion] = useState<ErrorQuestion | null>(null)
  const [userQuery, setUserQuery] = useState('')
  const [aiResponse, setAiResponse] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const [lastUpdateTime, setLastUpdateTime] = useState<number>(Date.now())

  // 从localStorage加载错题数据
  const loadErrorQuestions = () => {
    setRefreshing(true)
    const storedErrors = localStorage.getItem('errorQuestions')
    if (storedErrors) {
      try {
        const parsedErrors = JSON.parse(storedErrors)
        // 按日期降序排序，最新的错题在前面
        parsedErrors.sort((a: ErrorQuestion, b: ErrorQuestion) => 
          new Date(b.date).getTime() - new Date(a.date).getTime()
        )
        setErrorQuestions(parsedErrors)
        setLastUpdateTime(Date.now())
      } catch (error) {
        console.error('Failed to parse error questions:', error)
      }
    } else {
      setErrorQuestions([])
    }
    setTimeout(() => setRefreshing(false), 500)
  }

  // 初始加载和定期检查
  useEffect(() => {
    loadErrorQuestions()
    
    // 监听localStorage变化，实时更新错题列表
    const handleStorageChange = () => {
      loadErrorQuestions()
    }

    window.addEventListener('storage', handleStorageChange)
    
    // 定期检查localStorage变化（同一标签页内）
    const checkInterval = setInterval(() => {
      const storedErrors = localStorage.getItem('errorQuestions')
      if (storedErrors) {
        try {
          const parsedErrors = JSON.parse(storedErrors)
          const currentCount = errorQuestions.length
          const newCount = parsedErrors.length
          
          // 如果错题数量发生变化，重新加载
          if (newCount !== currentCount) {
            console.log('错题数量变化，重新加载:', currentCount, '->', newCount)
            loadErrorQuestions()
          }
        } catch (error) {
          console.error('Failed to check error questions:', error)
        }
      }
    }, 500) // 每0.5秒检查一次，提高响应速度

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      clearInterval(checkInterval)
    }
  }, [errorQuestions.length])

  const handleQuestionSelect = (question: ErrorQuestion) => {
    setSelectedQuestion(question)
    setAiResponse('')
    setUserQuery('')
  }

  const handleAskAI = async () => {
    if (!userQuery.trim() || !selectedQuestion) return

    setIsLoading(true)

    // 保存当前选中的问题，防止异步执行期间被修改
    const currentQuestion = selectedQuestion

    // 模拟AI响应，根据问题和题目生成针对性回答
    setTimeout(() => {
      // 再次检查问题是否存在
      if (!currentQuestion) {
        setIsLoading(false)
        return
      }

      let response = ''
      
      // 根据题目类别生成不同的开头
      const categoryPrefixes = {
        '英语': '关于这个英语问题',
        '编程': '关于这个编程问题',
        '综合知识': '关于这个综合知识问题',
        '综合': '关于这个综合知识问题'
      }
      
      const prefix = categoryPrefixes[(currentQuestion.category || '综合') as keyof typeof categoryPrefixes] || '关于这个问题'
      
      // 根据用户问题的关键词生成不同类型的回答
      if (userQuery.includes('为什么') || userQuery.includes('原因')) {
        response = `${prefix}，${userQuery}的原因是：${currentQuestion.explanation || '暂无解析'}。这是因为该知识点的核心在于理解其基本原理。`
      } else if (userQuery.includes('如何') || userQuery.includes('怎么做')) {
        response = `${prefix}，要解决${userQuery}的问题，你需要：${currentQuestion.explanation || '暂无解析'}。建议你多做类似的练习来巩固这个知识点。`
      } else if (userQuery.includes('区别') || userQuery.includes('不同')) {
        response = `${prefix}，关于${userQuery}的区别，${currentQuestion.explanation || '暂无解析'}。理解这些差异对于掌握相关知识点非常重要。`
      } else if (userQuery.includes('例子') || userQuery.includes('示例')) {
        response = `${prefix}，${userQuery}的例子包括：${currentQuestion.explanation || '暂无解析'}。通过具体例子可以更好地理解这个概念。`
      } else if (userQuery.includes('什么时候') || userQuery.includes('何时')) {
        response = `${prefix}，${userQuery}的情况是：${currentQuestion.explanation || '暂无解析'}。掌握正确的使用时机是应用这个知识点的关键。`
      } else {
        // 默认回答
        const defaultResponses = [
          `${prefix}，${userQuery}的答案基于${currentQuestion.category || '综合'}的核心原理。${currentQuestion.explanation || '暂无解析'}`,
          `针对你的问题${userQuery}，${currentQuestion.explanation || '暂无解析'}。此外，你还需要注意相关的知识点。`,
          `对于${userQuery}这个问题，关键在于理解${currentQuestion.category || '综合'}的核心概念。${currentQuestion.explanation || '暂无解析'}`
        ]
        response = defaultResponses[Math.floor(Math.random() * defaultResponses.length)]
      }
      
      setAiResponse(response)
      setIsLoading(false)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 py-16">
      <div className="container mx-auto px-4 max-w-5xl">
        <header className="text-center mb-16">
          <h1 className="text-4xl font-bold text-purple-600 mb-4">错题深度解析</h1>
          <p className="text-gray-600 text-lg">文字模式解析，支持追问和知识点拓展</p>
          {errorQuestions.length > 0 && (
            <div className="mt-4 inline-block px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm">
              共 {errorQuestions.length} 道错题，点击刷新按钮可更新最新错题
            </div>
          )}
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* 错题列表 */}
          <div className="md:col-span-1">
            <div className="card h-full">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">错题列表</h2>
                <button
                  className="btn-secondary px-3 py-1 text-sm flex items-center gap-1"
                  onClick={loadErrorQuestions}
                  disabled={refreshing}
                >
                  {refreshing ? (
                    <>
                      <svg className="h-4 w-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      刷新中...
                    </>
                  ) : (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      刷新
                    </>
                  )}
                </button>
              </div>
              <div className="space-y-4">
                {errorQuestions.length > 0 ? (
                  errorQuestions.map((question) => (
                    <div
                      key={question.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-colors ${selectedQuestion?.id === question.id ? 'border-purple-500 bg-purple-50' : 'border-gray-200 hover:border-purple-300'}`}
                      onClick={() => handleQuestionSelect(question)}
                    >
                      <h3 className="font-medium mb-2 line-clamp-2">{question.question}</h3>
                      <div className="flex justify-between text-sm text-gray-500">
                        <span>{question.category}</span>
                        <span>{question.date}</span>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {question.tags.slice(0, 2).map((tag, index) => (
                          <span key={index} className="px-2 py-0.5 bg-purple-100 text-purple-800 rounded-full text-xs">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    暂无错题记录
                    <div className="mt-4">
                      <button
                        className="btn-secondary px-4 py-2 text-sm"
                        onClick={loadErrorQuestions}
                      >
                        点击刷新
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* 解析详情 */}
          <div className="md:col-span-2">
            {selectedQuestion ? (
              <div className="card h-full">
                <h2 className="text-xl font-bold mb-6">题目解析</h2>
                
                <div className="mb-8">
                  <h3 className="font-bold text-lg mb-3">题目</h3>
                  <p className="text-gray-700 mb-4">{selectedQuestion.question}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="p-3 border rounded-lg bg-red-50 border-red-200">
                      <h4 className="text-sm font-medium text-red-800 mb-1">你的答案</h4>
                      <p className="text-red-700">{selectedQuestion.userAnswer}</p>
                    </div>
                    <div className="p-3 border rounded-lg bg-green-50 border-green-200">
                      <h4 className="text-sm font-medium text-green-800 mb-1">正确答案</h4>
                      <p className="text-green-700">{selectedQuestion.correctAnswer}</p>
                    </div>
                  </div>
                  
                  <div className="p-4 border rounded-lg bg-blue-50 border-blue-200">
                    <h4 className="font-medium text-blue-800 mb-2">深度解析</h4>
                    <p className="text-blue-700">{selectedQuestion.explanation}</p>
                  </div>
                </div>

                {/* AI追问 */}
                <div className="mt-8">
                  <h3 className="font-bold text-lg mb-4">AI追问</h3>
                  <div className="border rounded-lg p-4">
                    <div className="mb-4">
                      <textarea
                        className="w-full p-3 border rounded-md min-h-[100px]"
                        placeholder="输入你的问题，例如：为什么这个答案是正确的？或者请再详细解释一下这个知识点..."
                        value={userQuery}
                        onChange={(e) => setUserQuery(e.target.value)}
                      />
                    </div>
                    <div className="flex justify-end">
                      <button
                        className="btn-primary px-6 py-2"
                        onClick={handleAskAI}
                        disabled={isLoading}
                      >
                        {isLoading ? 'AI思考中...' : '提交问题'}
                      </button>
                    </div>
                  </div>

                  {/* AI回答 */}
                  {aiResponse && (
                    <div className="mt-6 p-4 border rounded-lg bg-purple-50 border-purple-200">
                      <h4 className="font-medium text-purple-800 mb-2">AI回答</h4>
                      <p className="text-purple-700">{aiResponse}</p>
                    </div>
                  )}
                </div>

                {/* 相关知识点 */}
                <div className="mt-8">
                  <h3 className="font-bold text-lg mb-3">相关知识点</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedQuestion.tags.map((tag, index) => (
                      <span key={index} className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="card h-full flex items-center justify-center">
                <div className="text-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-purple-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  <h3 className="text-xl font-medium text-gray-600">请选择一个错题进行解析</h3>
                  <p className="text-gray-500 mt-2">从左侧列表中选择一个错题查看详细解析</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <footer className="mt-20 text-center text-gray-500 text-sm">
          <p>© 2026 AI互动式学习平台</p>
        </footer>
      </div>
    </div>
  )
}
