'use client'

import { useState, useEffect } from 'react'

interface LearningPath {
  id: string
  name: string
  description: string
  duration: string
  progress: number
  modules: LearningModule[]
  recommended: boolean
}

interface LearningModule {
  id: string
  name: string
  description: string
  duration: string
  progress: number
  completed: boolean
  lessons: LearningLesson[]
}

interface LearningLesson {
  id: string
  name: string
  type: string
  duration: string
  completed: boolean
  difficulty: string
}

const mockLearningPaths: LearningPath[] = [
  {
    id: '1',
    name: 'JavaScript基础到进阶',
    description: '从JavaScript基础语法到高级概念的完整学习路径',
    duration: '4周',
    progress: 30,
    recommended: true,
    modules: [
      {
        id: 'm1',
        name: 'JavaScript基础语法',
        description: '变量、数据类型、运算符、控制流等基础概念',
        duration: '1周',
        progress: 100,
        completed: true,
        lessons: [
          { id: 'l1', name: '变量和数据类型', type: '视频', duration: '45分钟', completed: true, difficulty: 'easy' },
          { id: 'l2', name: '运算符和表达式', type: '视频', duration: '30分钟', completed: true, difficulty: 'easy' },
          { id: 'l3', name: '控制流语句', type: '视频', duration: '40分钟', completed: true, difficulty: 'easy' },
          { id: 'l4', name: '基础练习', type: '练习', duration: '60分钟', completed: true, difficulty: 'easy' }
        ]
      },
      {
        id: 'm2',
        name: '函数和对象',
        description: '函数定义、作用域、对象、原型链等概念',
        duration: '1周',
        progress: 50,
        completed: false,
        lessons: [
          { id: 'l5', name: '函数定义和调用', type: '视频', duration: '45分钟', completed: true, difficulty: 'medium' },
          { id: 'l6', name: '作用域和闭包', type: '视频', duration: '50分钟', completed: true, difficulty: 'medium' },
          { id: 'l7', name: '对象和原型', type: '视频', duration: '55分钟', completed: false, difficulty: 'medium' },
          { id: 'l8', name: '函数练习', type: '练习', duration: '60分钟', completed: false, difficulty: 'medium' }
        ]
      },
      {
        id: 'm3',
        name: '异步编程',
        description: '回调函数、Promise、async/await等异步编程概念',
        duration: '1周',
        progress: 0,
        completed: false,
        lessons: [
          { id: 'l9', name: '同步和异步', type: '视频', duration: '40分钟', completed: false, difficulty: 'hard' },
          { id: 'l10', name: '回调函数', type: '视频', duration: '45分钟', completed: false, difficulty: 'hard' },
          { id: 'l11', name: 'Promise', type: '视频', duration: '50分钟', completed: false, difficulty: 'hard' },
          { id: 'l12', name: 'async/await', type: '视频', duration: '45分钟', completed: false, difficulty: 'hard' },
          { id: 'l13', name: '异步编程练习', type: '练习', duration: '75分钟', completed: false, difficulty: 'hard' }
        ]
      },
      {
        id: 'm4',
        name: '实战项目',
        description: '通过实际项目巩固所学知识',
        duration: '1周',
        progress: 0,
        completed: false,
        lessons: [
          { id: 'l14', name: '项目规划', type: '视频', duration: '30分钟', completed: false, difficulty: 'medium' },
          { id: 'l15', name: '项目实现', type: '实战', duration: '4小时', completed: false, difficulty: 'hard' },
          { id: 'l16', name: '代码优化', type: '视频', duration: '45分钟', completed: false, difficulty: 'medium' },
          { id: 'l17', name: '项目展示', type: '实战', duration: '30分钟', completed: false, difficulty: 'easy' }
        ]
      }
    ]
  },
  {
    id: '2',
    name: 'React入门到精通',
    description: '从React基础到高级应用的学习路径',
    duration: '6周',
    progress: 0,
    recommended: false,
    modules: [
      {
        id: 'm5',
        name: 'React基础',
        description: 'React组件、JSX、props、state等基础概念',
        duration: '2周',
        progress: 0,
        completed: false,
        lessons: [
          { id: 'l18', name: 'React简介', type: '视频', duration: '30分钟', completed: false, difficulty: 'easy' },
          { id: 'l19', name: 'JSX语法', type: '视频', duration: '40分钟', completed: false, difficulty: 'easy' },
          { id: 'l20', name: '组件和props', type: '视频', duration: '45分钟', completed: false, difficulty: 'easy' },
          { id: 'l21', name: 'state和生命周期', type: '视频', duration: '50分钟', completed: false, difficulty: 'medium' }
        ]
      }
    ]
  }
]

export default function LearningPathPage() {
  const [selectedPath, setSelectedPath] = useState<LearningPath | null>(null)
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({})

  useEffect(() => {
    // 默认选择推荐的学习路径
    if (mockLearningPaths.length > 0) {
      const recommendedPath = mockLearningPaths.find(path => path.recommended)
      if (recommendedPath) {
        setSelectedPath(recommendedPath)
        // 默认展开第一个模块
        if (recommendedPath.modules.length > 0) {
          setExpandedModules({ [recommendedPath.modules[0].id]: true })
        }
      }
    }
  }, [])

  const toggleModule = (moduleId: string) => {
    setExpandedModules(prev => ({
      ...prev,
      [moduleId]: !prev[moduleId]
    }))
  }

  const formatTime = (minutes: number) => {
    if (minutes < 60) {
      return `${minutes}分钟`
    } else {
      const hours = Math.floor(minutes / 60)
      const mins = minutes % 60
      return `${hours}小时${mins > 0 ? mins + '分钟' : ''}`
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 py-16">
      <div className="container mx-auto px-4 max-w-5xl">
        <header className="text-center mb-16">
          <h1 className="text-4xl font-bold text-purple-600 mb-4">个性化学习路径</h1>
          <p className="text-gray-600 text-lg">基于考点分析和答题数据，生成专属学习计划</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* 学习路径列表 */}
          <div className="md:col-span-1">
            <div className="card h-full">
              <h2 className="text-xl font-bold mb-4">推荐学习路径</h2>
              <div className="space-y-4">
                {mockLearningPaths.map((path) => (
                  <div
                    key={path.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${selectedPath?.id === path.id ? 'border-purple-500 bg-purple-50' : 'border-gray-200 hover:border-purple-300'}`}
                    onClick={() => setSelectedPath(path)}
                  >
                    {path.recommended && (
                      <div className="inline-block px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs mb-2">
                        推荐
                      </div>
                    )}
                    <h3 className="font-medium mb-2">{path.name}</h3>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{path.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">{path.duration}</span>
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-purple-500 h-2 rounded-full" 
                          style={{ width: `${path.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 学习路径详情 */}
          <div className="md:col-span-2">
            {selectedPath ? (
              <div className="card h-full">
                <div className="mb-8">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className="text-2xl font-bold mb-2">{selectedPath.name}</h2>
                      {selectedPath.recommended && (
                        <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                          推荐路径
                        </span>
                      )}
                    </div>
                    <div className="text-right">
                      <span className="block text-gray-600 mb-1">预计时长: {selectedPath.duration}</span>
                      <span className="block text-gray-600">进度: {selectedPath.progress}%</span>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-6">{selectedPath.description}</p>
                  
                  {/* 总体进度条 */}
                  <div className="mb-8">
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">总体进度</span>
                      <span className="text-sm text-gray-600">{selectedPath.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className="bg-purple-500 h-3 rounded-full" 
                        style={{ width: `${selectedPath.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* 学习模块 */}
                <div className="space-y-6">
                  <h3 className="text-xl font-bold mb-4">学习模块</h3>
                  {selectedPath.modules.map((module) => (
                    <div key={module.id} className="border rounded-lg overflow-hidden">
                      <div
                        className={`p-4 flex justify-between items-center cursor-pointer ${module.completed ? 'bg-green-50' : 'bg-white'}`}
                        onClick={() => toggleModule(module.id)}
                      >
                        <div>
                          <h4 className="font-medium mb-1">{module.name}</h4>
                          <p className="text-sm text-gray-600 mb-2">{module.description}</p>
                          <div className="flex items-center text-sm text-gray-500">
                            <span className="mr-4">{module.duration}</span>
                            <span>进度: {module.progress}%</span>
                          </div>
                        </div>
                        <div className="flex items-center">
                          {module.completed && (
                            <span className="mr-3 text-green-500">✓</span>
                          )}
                          <span className={`transition-transform ${expandedModules[module.id] ? 'transform rotate-180' : ''}`}>
                            ▼
                          </span>
                        </div>
                      </div>
                      
                      {/* 模块详情 */}
                      {expandedModules[module.id] && (
                        <div className="p-4 border-t">
                          <h5 className="font-medium mb-3">课程内容</h5>
                          <div className="space-y-3">
                            {module.lessons.map((lesson) => (
                              <div 
                                key={lesson.id}
                                className={`p-3 border rounded-lg ${lesson.completed ? 'border-green-200 bg-green-50' : 'border-gray-200'}`}
                              >
                                <div className="flex justify-between items-center">
                                  <div>
                                    <h6 className="font-medium">{lesson.name}</h6>
                                    <div className="flex items-center text-sm text-gray-500 mt-1">
                                      <span className="inline-block px-2 py-0.5 bg-gray-100 rounded text-xs mr-3">
                                        {lesson.type}
                                      </span>
                                      <span className="mr-3">{lesson.duration}</span>
                                      <span className={`px-2 py-0.5 rounded text-xs ${lesson.difficulty === 'easy' ? 'bg-green-100 text-green-800' : lesson.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                                        {lesson.difficulty === 'easy' ? '简单' : lesson.difficulty === 'medium' ? '中等' : '困难'}
                                      </span>
                                    </div>
                                  </div>
                                  {lesson.completed && (
                                    <span className="text-green-500">✓</span>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="card h-full flex items-center justify-center">
                <div className="text-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-purple-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                  <h3 className="text-xl font-medium text-gray-600">请选择一个学习路径</h3>
                  <p className="text-gray-500 mt-2">从左侧列表中选择一个学习路径查看详情</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <footer className="mt-20 text-center text-gray-500 text-sm">
        <p>© 2026 AI互动式学习平台</p>
      </footer>
    </div>
  )
}
