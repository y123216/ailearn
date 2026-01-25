'use client'

import { useState, useEffect } from 'react'

interface ErrorQuestion {
  id: string
  question: string
  userAnswer: string
  correctAnswer: string
  explanation: string
  category: string
  subCategory: string
  errorReason: string
  difficulty: string
  date: string
  tags: string[]
  reviewed: boolean
}

interface Category {
  id: string
  name: string
  count: number
}

interface ErrorReason {
  id: string
  name: string
  count: number
}

const mockErrorQuestions: ErrorQuestion[] = [
  {
    id: '1',
    question: '下列哪个是JavaScript的基本数据类型？',
    userAnswer: 'object',
    correctAnswer: 'string, number, boolean, null, undefined, symbol, bigint',
    explanation: 'JavaScript的基本数据类型包括string、number、boolean、null、undefined、symbol和bigint。object是引用数据类型。',
    category: 'programming',
    subCategory: 'JavaScript',
    errorReason: '概念混淆',
    difficulty: 'medium',
    date: '2026-01-24',
    tags: ['JavaScript', '数据类型', '基础'],
    reviewed: false
  },
  {
    id: '2',
    question: 'CSS中，哪个属性用于设置元素的外边距？',
    userAnswer: 'padding',
    correctAnswer: 'margin',
    explanation: 'margin属性用于设置元素的外边距，padding属性用于设置元素的内边距。',
    category: 'programming',
    subCategory: 'CSS',
    errorReason: '记忆错误',
    difficulty: 'easy',
    date: '2026-01-23',
    tags: ['CSS', '盒模型', '布局'],
    reviewed: true
  },
  {
    id: '3',
    question: 'React中，useState钩子的作用是什么？',
    userAnswer: '用于处理副作用',
    correctAnswer: '用于在函数组件中添加状态',
    explanation: 'useState钩子用于在React函数组件中添加状态管理，useEffect钩子用于处理副作用。',
    category: 'programming',
    subCategory: 'React',
    errorReason: '概念混淆',
    difficulty: 'medium',
    date: '2026-01-22',
    tags: ['React', 'Hooks', '状态管理'],
    reviewed: false
  },
  {
    id: '4',
    question: '下列哪个是CSS的Flexbox布局属性？',
    userAnswer: 'display: grid',
    correctAnswer: 'display: flex',
    explanation: 'display: flex是Flexbox布局的属性，display: grid是Grid布局的属性。',
    category: 'programming',
    subCategory: 'CSS',
    errorReason: '记忆错误',
    difficulty: 'easy',
    date: '2026-01-21',
    tags: ['CSS', '布局', 'Flexbox'],
    reviewed: false
  },
  {
    id: '5',
    question: 'JavaScript中，哪个方法用于向数组末尾添加元素？',
    userAnswer: 'unshift()',
    correctAnswer: 'push()',
    explanation: 'push()方法用于向数组末尾添加元素，unshift()方法用于向数组开头添加元素。',
    category: 'programming',
    subCategory: 'JavaScript',
    errorReason: '记忆错误',
    difficulty: 'easy',
    date: '2026-01-20',
    tags: ['JavaScript', '数组', '方法'],
    reviewed: true
  }
]

const mockCategories: Category[] = [
  { id: 'programming', name: '编程', count: 5 },
  { id: 'math', name: '数学', count: 0 },
  { id: 'english', name: '英语', count: 0 },
  { id: 'general', name: '综合', count: 0 }
]

const mockErrorReasons: ErrorReason[] = [
  { id: 'concept', name: '概念混淆', count: 2 },
  { id: 'memory', name: '记忆错误', count: 3 },
  { id: 'careless', name: '粗心大意', count: 0 },
  { id: 'skill', name: '技能不足', count: 0 }
]

export default function ErrorBook() {
  const [errorQuestions, setErrorQuestions] = useState<ErrorQuestion[]>(mockErrorQuestions)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedErrorReason, setSelectedErrorReason] = useState('all')
  const [selectedDifficulty, setSelectedDifficulty] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('date')
  const [selectedQuestion, setSelectedQuestion] = useState<ErrorQuestion | null>(null)
  const [reviewedCount, setReviewedCount] = useState(0)

  useEffect(() => {
    // 计算已复习的错题数量
    const count = errorQuestions.filter(q => q.reviewed).length
    setReviewedCount(count)
  }, [errorQuestions])

  const filteredQuestions = errorQuestions
    .filter(q => selectedCategory === 'all' || q.category === selectedCategory)
    .filter(q => selectedErrorReason === 'all' || q.errorReason === selectedErrorReason)
    .filter(q => selectedDifficulty === 'all' || q.difficulty === selectedDifficulty)
    .filter(q => q.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                 q.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())))
    .sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(b.date).getTime() - new Date(a.date).getTime()
        case 'difficulty':
          const difficultyOrder = { hard: 3, medium: 2, easy: 1 }
          return (difficultyOrder[b.difficulty as keyof typeof difficultyOrder] || 0) - 
                 (difficultyOrder[a.difficulty as keyof typeof difficultyOrder] || 0)
        case 'category':
          return a.category.localeCompare(b.category)
        default:
          return 0
      }
    })

  const toggleReviewed = (questionId: string) => {
    setErrorQuestions(prev => prev.map(q => 
      q.id === questionId ? { ...q, reviewed: !q.reviewed } : q
    ))
  }

  const deleteQuestion = (questionId: string) => {
    setErrorQuestions(prev => prev.filter(q => q.id !== questionId))
    if (selectedQuestion?.id === questionId) {
      setSelectedQuestion(null)
    }
  }

  const clearAllFilters = () => {
    setSelectedCategory('all')
    setSelectedErrorReason('all')
    setSelectedDifficulty('all')
    setSearchQuery('')
    setSortBy('date')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 py-16">
      <div className="container mx-auto px-4 max-w-6xl">
        <header className="text-center mb-16">
          <h1 className="text-4xl font-bold text-purple-600 mb-4">错题本</h1>
          <p className="text-gray-600 text-lg">按考点、错误原因分类管理错题</p>
          <div className="mt-4">
            <span className="inline-block px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-sm">
              总错题数: {errorQuestions.length} | 已复习: {reviewedCount} | 未复习: {errorQuestions.length - reviewedCount}
            </span>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* 左侧筛选面板 */}
          <div className="lg:col-span-1">
            <div className="card p-6">
              <h2 className="text-xl font-bold mb-6">筛选条件</h2>
              
              {/* 搜索框 */}
              <div className="mb-6">
                <label className="block text-gray-700 mb-2 font-medium">搜索</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-md"
                  placeholder="搜索题目或标签"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* 考点分类 */}
              <div className="mb-6">
                <label className="block text-gray-700 mb-2 font-medium">考点分类</label>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="category-all"
                      name="category"
                      value="all"
                      checked={selectedCategory === 'all'}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="mr-2"
                    />
                    <label htmlFor="category-all" className="cursor-pointer">全部</label>
                  </div>
                  {mockCategories.map((category) => (
                    <div key={category.id} className="flex items-center">
                      <input
                        type="radio"
                        id={`category-${category.id}`}
                        name="category"
                        value={category.id}
                        checked={selectedCategory === category.id}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="mr-2"
                      />
                      <label htmlFor={`category-${category.id}`} className="cursor-pointer flex-1">
                        {category.name}
                      </label>
                      <span className="text-sm text-gray-500">({category.count})</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 错误原因 */}
              <div className="mb-6">
                <label className="block text-gray-700 mb-2 font-medium">错误原因</label>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="reason-all"
                      name="errorReason"
                      value="all"
                      checked={selectedErrorReason === 'all'}
                      onChange={(e) => setSelectedErrorReason(e.target.value)}
                      className="mr-2"
                    />
                    <label htmlFor="reason-all" className="cursor-pointer">全部</label>
                  </div>
                  {mockErrorReasons.map((reason) => (
                    <div key={reason.id} className="flex items-center">
                      <input
                        type="radio"
                        id={`reason-${reason.id}`}
                        name="errorReason"
                        value={reason.name}
                        checked={selectedErrorReason === reason.name}
                        onChange={(e) => setSelectedErrorReason(e.target.value)}
                        className="mr-2"
                      />
                      <label htmlFor={`reason-${reason.id}`} className="cursor-pointer flex-1">
                        {reason.name}
                      </label>
                      <span className="text-sm text-gray-500">({reason.count})</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 难度等级 */}
              <div className="mb-6">
                <label className="block text-gray-700 mb-2 font-medium">难度等级</label>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="difficulty-all"
                      name="difficulty"
                      value="all"
                      checked={selectedDifficulty === 'all'}
                      onChange={(e) => setSelectedDifficulty(e.target.value)}
                      className="mr-2"
                    />
                    <label htmlFor="difficulty-all" className="cursor-pointer">全部</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="difficulty-easy"
                      name="difficulty"
                      value="easy"
                      checked={selectedDifficulty === 'easy'}
                      onChange={(e) => setSelectedDifficulty(e.target.value)}
                      className="mr-2"
                    />
                    <label htmlFor="difficulty-easy" className="cursor-pointer">简单</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="difficulty-medium"
                      name="difficulty"
                      value="medium"
                      checked={selectedDifficulty === 'medium'}
                      onChange={(e) => setSelectedDifficulty(e.target.value)}
                      className="mr-2"
                    />
                    <label htmlFor="difficulty-medium" className="cursor-pointer">中等</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="difficulty-hard"
                      name="difficulty"
                      value="hard"
                      checked={selectedDifficulty === 'hard'}
                      onChange={(e) => setSelectedDifficulty(e.target.value)}
                      className="mr-2"
                    />
                    <label htmlFor="difficulty-hard" className="cursor-pointer">困难</label>
                  </div>
                </div>
              </div>

              {/* 排序方式 */}
              <div className="mb-6">
                <label className="block text-gray-700 mb-2 font-medium">排序方式</label>
                <select
                  className="w-full p-2 border rounded-md"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="date">按日期（最新）</option>
                  <option value="difficulty">按难度（从高到低）</option>
                  <option value="category">按类别</option>
                </select>
              </div>

              {/* 重置按钮 */}
              <button
                className="w-full py-2 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 transition-colors"
                onClick={clearAllFilters}
              >
                重置筛选
              </button>
            </div>
          </div>

          {/* 右侧内容区域 */}
          <div className="lg:col-span-3">
            <div className="card mb-8">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold">错题列表</h2>
                  <span className="text-gray-600">
                    显示 {filteredQuestions.length} 条结果
                  </span>
                </div>

                {filteredQuestions.length > 0 ? (
                  <div className="space-y-4">
                    {filteredQuestions.map((question) => (
                      <div
                        key={question.id}
                        className={`p-4 border rounded-lg hover:border-purple-300 transition-colors ${selectedQuestion?.id === question.id ? 'border-purple-500 bg-purple-50' : 'border-gray-200'}`}
                        onClick={() => setSelectedQuestion(question)}
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h3 className="font-medium mb-2 line-clamp-2">{question.question}</h3>
                            <div className="flex flex-wrap gap-2 mb-3">
                              {question.tags.map((tag, index) => (
                                <span key={index} className="px-2 py-0.5 bg-purple-100 text-purple-800 rounded-full text-xs">
                                  {tag}
                                </span>
                              ))}
                            </div>
                            <div className="flex items-center text-sm text-gray-500 space-x-4">
                              <span>{question.subCategory}</span>
                              <span>{question.errorReason}</span>
                              <span>{question.difficulty === 'easy' ? '简单' : question.difficulty === 'medium' ? '中等' : '困难'}</span>
                              <span>{question.date}</span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <button
                              className={`p-2 rounded-full ${question.reviewed ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'}`}
                              onClick={(e) => {
                                e.stopPropagation()
                                toggleReviewed(question.id)
                              }}
                              title={question.reviewed ? '标记为未复习' : '标记为已复习'}
                            >
                              {question.reviewed ? '✓' : '○'}
                            </button>
                            <button
                              className="p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition-colors"
                              onClick={(e) => {
                                e.stopPropagation()
                                if (confirm('确定要删除这道错题吗？')) {
                                  deleteQuestion(question.id)
                                }
                              }}
                              title="删除错题"
                            >
                              ×
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <h3 className="text-gray-500 mb-2">没有找到匹配的错题</h3>
                    <p className="text-gray-400">尝试调整筛选条件</p>
                  </div>
                )}
              </div>
            </div>

            {/* 错题详情 */}
            {selectedQuestion && (
              <div className="card">
                <div className="p-6">
                  <h2 className="text-xl font-bold mb-6">错题详情</h2>
                  
                  <div className="mb-6">
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
                      <h4 className="font-medium text-blue-800 mb-2">解析</h4>
                      <p className="text-blue-700">{selectedQuestion.explanation}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="p-3 border rounded-lg">
                      <h4 className="text-sm font-medium text-gray-700 mb-1">考点</h4>
                      <p className="text-gray-800">{selectedQuestion.subCategory}</p>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <h4 className="text-sm font-medium text-gray-700 mb-1">错误原因</h4>
                      <p className="text-gray-800">{selectedQuestion.errorReason}</p>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <h4 className="text-sm font-medium text-gray-700 mb-1">难度</h4>
                      <p className="text-gray-800">{selectedQuestion.difficulty === 'easy' ? '简单' : selectedQuestion.difficulty === 'medium' ? '中等' : '困难'}</p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="reviewed"
                        checked={selectedQuestion.reviewed}
                        onChange={(e) => toggleReviewed(selectedQuestion.id)}
                        className="mr-2"
                      />
                      <label htmlFor="reviewed">标记为已复习</label>
                    </div>
                    <button
                      className="px-4 py-2 bg-red-100 text-red-800 rounded-md hover:bg-red-200 transition-colors"
                      onClick={() => {
                        if (confirm('确定要删除这道错题吗？')) {
                          deleteQuestion(selectedQuestion.id)
                        }
                      }}
                    >
                      删除错题
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <footer className="mt-20 text-center text-gray-500 text-sm">
          <p>© 2026 AI技能刷题站</p>
        </footer>
      </div>
    </div>
  )
}
