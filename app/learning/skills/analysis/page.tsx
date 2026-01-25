'use client'

import { useState } from 'react'

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

const mockErrorQuestions: ErrorQuestion[] = [
  {
    id: '1',
    question: '下列哪个是JavaScript的基本数据类型？',
    userAnswer: 'object',
    correctAnswer: 'string, number, boolean, null, undefined, symbol, bigint',
    explanation: 'JavaScript的基本数据类型包括string、number、boolean、null、undefined、symbol和bigint。object是引用数据类型。',
    category: 'programming',
    difficulty: 'medium',
    date: '2026-01-24',
    tags: ['JavaScript', '数据类型', '基础']
  },
  {
    id: '2',
    question: 'CSS中，哪个属性用于设置元素的外边距？',
    userAnswer: 'padding',
    correctAnswer: 'margin',
    explanation: 'margin属性用于设置元素的外边距，padding属性用于设置元素的内边距。',
    category: 'programming',
    difficulty: 'easy',
    date: '2026-01-23',
    tags: ['CSS', '盒模型', '布局']
  },
  {
    id: '3',
    question: 'React中，useState钩子的作用是什么？',
    userAnswer: '用于处理副作用',
    correctAnswer: '用于在函数组件中添加状态',
    explanation: 'useState钩子用于在React函数组件中添加状态管理，useEffect钩子用于处理副作用。',
    category: 'programming',
    difficulty: 'medium',
    date: '2026-01-22',
    tags: ['React', 'Hooks', '状态管理']
  }
]

export default function ErrorAnalysis() {
  const [selectedQuestion, setSelectedQuestion] = useState<ErrorQuestion | null>(null)
  const [userQuery, setUserQuery] = useState('')
  const [aiResponse, setAiResponse] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleQuestionSelect = (question: ErrorQuestion) => {
    setSelectedQuestion(question)
    setAiResponse('')
    setUserQuery('')
  }

  const handleAskAI = async () => {
    if (!userQuery.trim() || !selectedQuestion) return

    setIsLoading(true)

    // 模拟AI响应
    setTimeout(() => {
      const responses = [
        `关于这个问题，${userQuery}的答案是基于JavaScript的基本原理。${selectedQuestion.explanation}`,
        `针对你的问题，${userQuery}，我需要进一步解释：${selectedQuestion.explanation}。此外，你还需要注意相关的知识点。`,
        `对于${userQuery}这个问题，关键在于理解${selectedQuestion.category}的核心概念。${selectedQuestion.explanation}`
      ]
      setAiResponse(responses[Math.floor(Math.random() * responses.length)])
      setIsLoading(false)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 py-16">
      <div className="container mx-auto px-4 max-w-5xl">
        <header className="text-center mb-16">
          <h1 className="text-4xl font-bold text-purple-600 mb-4">错题深度解析</h1>
          <p className="text-gray-600 text-lg">文字/语音双模式解析，支持追问和知识点拓展</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* 错题列表 */}
          <div className="md:col-span-1">
            <div className="card h-full">
              <h2 className="text-xl font-bold mb-4">错题列表</h2>
              <div className="space-y-4">
                {mockErrorQuestions.map((question) => (
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
                ))}
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
