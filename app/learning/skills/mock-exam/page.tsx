'use client'

import { useState, useEffect } from 'react'

interface MockExam {
  id: string
  name: string
  description: string
  duration: number
  questionCount: number
  difficulty: string
  categories: string[]
  completed: boolean
  score?: number
  date?: string
}

interface Question {
  id: string
  type: 'multiple-choice' | 'true-false' | 'fill-blank' | 'short-answer'
  question: string
  options?: string[]
  correctAnswer: string | string[]
  userAnswer?: string | string[]
  score: number
}

interface ExamResult {
  totalScore: number
  correctCount: number
  incorrectCount: number
  accuracy: number
  timeUsed: number
  categoryAnalysis: {
    category: string
    correct: number
    total: number
    accuracy: number
  }[]
  difficultyAnalysis: {
    difficulty: string
    correct: number
    total: number
    accuracy: number
  }[]
  recommendedReview: string[]
}

const mockExams: MockExam[] = [
  {
    id: '1',
    name: 'JavaScript基础模拟考试',
    description: '测试JavaScript基础知识的掌握程度',
    duration: 60,
    questionCount: 20,
    difficulty: 'medium',
    categories: ['JavaScript', '基础语法', '数据类型'],
    completed: false
  },
  {
    id: '2',
    name: 'React核心概念考试',
    description: '测试React核心概念和使用技巧',
    duration: 90,
    questionCount: 30,
    difficulty: 'hard',
    categories: ['React', '组件', 'Hooks', '状态管理'],
    completed: false
  },
  {
    id: '3',
    name: '前端综合能力测试',
    description: '测试HTML、CSS、JavaScript综合能力',
    duration: 120,
    questionCount: 40,
    difficulty: 'hard',
    categories: ['HTML', 'CSS', 'JavaScript', '前端工程化'],
    completed: false
  }
]

const mockCompletedExams: MockExam[] = [
  {
    id: '4',
    name: 'CSS布局专项测试',
    description: '测试CSS布局相关知识',
    duration: 60,
    questionCount: 20,
    difficulty: 'medium',
    categories: ['CSS', '布局', 'Flexbox', 'Grid'],
    completed: true,
    score: 85,
    date: '2026-01-20'
  },
  {
    id: '5',
    name: 'JavaScript高级特性测试',
    description: '测试JavaScript高级特性',
    duration: 90,
    questionCount: 30,
    difficulty: 'hard',
    categories: ['JavaScript', '异步编程', '闭包', '原型链'],
    completed: true,
    score: 72,
    date: '2026-01-15'
  }
]

const generateMockQuestions = (count: number): Question[] => {
  const questions: Question[] = []
  
  for (let i = 0; i < count; i++) {
    const questionTypes: Array<'multiple-choice' | 'true-false' | 'fill-blank' | 'short-answer'> = ['multiple-choice', 'true-false', 'fill-blank', 'short-answer']
    const randomType = questionTypes[Math.floor(Math.random() * questionTypes.length)]
    
    let question: Question
    
    switch (randomType) {
      case 'multiple-choice':
        question = {
          id: `mc-${Date.now()}-${i}`,
          type: 'multiple-choice',
          question: `这是一道多选题 ${i + 1}：下列哪个选项是正确的？`,
          options: ['选项 A', '选项 B', '选项 C', '选项 D'],
          correctAnswer: '选项 A',
          score: 5
        }
        break
      case 'true-false':
        question = {
          id: `tf-${Date.now()}-${i}`,
          type: 'true-false',
          question: `这是一道判断题 ${i + 1}：这句话是正确的吗？`,
          correctAnswer: Math.random() > 0.5 ? '正确' : '错误',
          score: 3
        }
        break
      case 'fill-blank':
        question = {
          id: `fb-${Date.now()}-${i}`,
          type: 'fill-blank',
          question: `这是一道填空题 ${i + 1}：请填写空白处的内容：_______ 是一种重要的学习方法。`,
          correctAnswer: '练习',
          score: 4
        }
        break
      case 'short-answer':
        question = {
          id: `sa-${Date.now()}-${i}`,
          type: 'short-answer',
          question: `这是一道简答题 ${i + 1}：请简要解释什么是人工智能？`,
          correctAnswer: '人工智能是指计算机系统模拟人类智能的能力，包括学习、推理、感知等功能。',
          score: 6
        }
        break
    }
    
    questions.push(question)
  }
  
  return questions
}

export default function MockExam() {
  const [exams, setExams] = useState<MockExam[]>([...mockExams, ...mockCompletedExams])
  const [selectedExam, setSelectedExam] = useState<MockExam | null>(null)
  const [currentExam, setCurrentExam] = useState<MockExam | null>(null)
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [timeRemaining, setTimeRemaining] = useState(0)
  const [isTakingExam, setIsTakingExam] = useState(false)
  const [examResult, setExamResult] = useState<ExamResult | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [examToDelete, setExamToDelete] = useState<MockExam | null>(null)

  useEffect(() => {
    // 从localStorage加载生成的练习数据
    const loadGeneratedPractices = () => {
      const storedPractices = localStorage.getItem('practices')
      const deletedExamIds = JSON.parse(localStorage.getItem('deletedExamIds') || '[]')
      
      if (storedPractices) {
        try {
          const practices = JSON.parse(storedPractices)
          // 将生成的练习转换为考试格式
          const practiceExams = practices
            .filter((practice: any) => !deletedExamIds.includes(practice.id))
            .map((practice: any) => ({
              id: practice.id,
              name: practice.name,
              description: `从${practice.sourceFile || '上传文件'}生成的练习`,
              duration: Math.max(30, Math.ceil(practice.totalQuestions * 2)), // 每道题2分钟
              questionCount: practice.totalQuestions,
              difficulty: 'medium',
              categories: practice.questions
                .flatMap((q: any) => q.tags || [])
                .filter((value: any, index: any, self: any) => self.indexOf(value) === index)
                .slice(0, 5), // 最多显示5个标签
              completed: false
            }))
          
          // 合并现有考试和生成的练习
          const combinedExams = [...practiceExams, ...mockExams, ...mockCompletedExams]
          setExams(combinedExams)
        } catch (error) {
          console.error('Failed to load practices:', error)
        }
      } else {
        // 如果没有生成的练习，只显示默认考试
        setExams([...mockExams, ...mockCompletedExams])
      }
    }

    loadGeneratedPractices()

    let timer: NodeJS.Timeout
    if (isTakingExam && timeRemaining > 0) {
      timer = setInterval(() => {
        setTimeRemaining(prev => prev - 1)
      }, 1000)
    } else if (isTakingExam && timeRemaining === 0) {
      // 时间到，自动提交
      submitExam()
    }
    return () => clearInterval(timer)
  }, [isTakingExam, timeRemaining])

  const startExam = (exam: MockExam) => {
    setCurrentExam(exam)
    
    // 检查是否是从上传文件生成的练习
    const storedPractices = localStorage.getItem('practices')
    let newQuestions: Question[] = []
    
    if (storedPractices) {
      try {
        const practices = JSON.parse(storedPractices)
        const matchingPractice = practices.find((practice: any) => practice.id === exam.id)
        
        if (matchingPractice) {
          // 使用生成的练习题目
          newQuestions = matchingPractice.questions.map((q: any) => ({
            id: q.id,
            type: q.type as 'multiple-choice' | 'true-false' | 'fill-blank' | 'short-answer',
            question: q.question,
            options: q.options,
            correctAnswer: q.correctAnswer,
            score: 100 / matchingPractice.totalQuestions // 分值平均分配
          }))
        }
      } catch (error) {
        console.error('Failed to load practice questions:', error)
      }
    }
    
    // 如果没有找到生成的题目，使用随机生成的题目
    if (newQuestions.length === 0) {
      newQuestions = generateMockQuestions(exam.questionCount)
    }
    
    setQuestions(newQuestions)
    setCurrentQuestionIndex(0)
    setTimeRemaining(exam.duration * 60)
    setIsTakingExam(true)
    setShowResult(false)
    setExamResult(null)
  }

  const submitAnswer = (answer: string | string[]) => {
    setQuestions(prev => prev.map((q, index) => 
      index === currentQuestionIndex ? { ...q, userAnswer: answer } : q
    ))
  }

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1)
    }
  }

  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1)
    }
  }

  const navigateToQuestion = (index: number) => {
    setCurrentQuestionIndex(index)
  }

  const submitExam = () => {
    setIsTakingExam(false)
    calculateResult()
    // 更新考试状态
    setExams(prev => prev.map(exam => 
      exam.id === currentExam?.id ? { ...exam, completed: true, score: examResult?.totalScore, date: new Date().toISOString().split('T')[0] } : exam
    ))
  }

  const calculateResult = () => {
    let totalScore = 0
    let correctCount = 0
    let incorrectCount = 0
    
    questions.forEach(question => {
      const isCorrect = checkAnswer(question.userAnswer, question.correctAnswer)
      if (isCorrect) {
        correctCount++
        totalScore += question.score
      } else {
        incorrectCount++
      }
    })

    const accuracy = (correctCount / questions.length) * 100
    const timeUsed = (currentExam?.duration || 0) * 60 - timeRemaining

    // 模拟分类分析
    const categoryAnalysis = [
      { category: 'JavaScript', correct: Math.floor(correctCount * 0.6), total: Math.floor(questions.length * 0.6), accuracy: 60 },
      { category: 'CSS', correct: Math.floor(correctCount * 0.2), total: Math.floor(questions.length * 0.2), accuracy: 50 },
      { category: 'HTML', correct: Math.floor(correctCount * 0.2), total: Math.floor(questions.length * 0.2), accuracy: 70 }
    ]

    // 模拟难度分析
    const difficultyAnalysis = [
      { difficulty: '简单', correct: Math.floor(correctCount * 0.5), total: Math.floor(questions.length * 0.5), accuracy: 80 },
      { difficulty: '中等', correct: Math.floor(correctCount * 0.3), total: Math.floor(questions.length * 0.3), accuracy: 60 },
      { difficulty: '困难', correct: Math.floor(correctCount * 0.2), total: Math.floor(questions.length * 0.2), accuracy: 40 }
    ]

    // 推荐复习内容
    const recommendedReview = ['JavaScript 异步编程', 'CSS Grid 布局', 'React Hooks 深入理解']

    const result: ExamResult = {
      totalScore,
      correctCount,
      incorrectCount,
      accuracy,
      timeUsed,
      categoryAnalysis,
      difficultyAnalysis,
      recommendedReview
    }

    setExamResult(result)
    setShowResult(true)
  }

  const checkAnswer = (userAnswer: any, correctAnswer: any): boolean => {
    if (!userAnswer) return false
    
    if (Array.isArray(correctAnswer)) {
      if (Array.isArray(userAnswer)) {
        return correctAnswer.every(ans => userAnswer.includes(ans)) && 
               userAnswer.every(ans => correctAnswer.includes(ans))
      }
    } else {
      return userAnswer === correctAnswer
    }
    
    return false
  }

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const handleDeleteExam = (exam: MockExam) => {
    setExamToDelete(exam)
    setShowDeleteDialog(true)
  }

  const confirmDeleteExam = () => {
    if (examToDelete) {
      // 检查是否是默认考试（id为1、2、3、4、5）
      const isDefaultExam = ['1', '2', '3', '4', '5'].includes(examToDelete.id)
      
      if (isDefaultExam) {
        // 默认考试不允许删除
        alert('默认考试题库不能删除')
        setShowDeleteDialog(false)
        setExamToDelete(null)
        return
      }
      
      // 将删除的考试ID保存到localStorage
      const deletedExamIds = JSON.parse(localStorage.getItem('deletedExamIds') || '[]')
      if (!deletedExamIds.includes(examToDelete.id)) {
        deletedExamIds.push(examToDelete.id)
        localStorage.setItem('deletedExamIds', JSON.stringify(deletedExamIds))
      }

      // 从考试列表中删除
      setExams(prev => prev.filter(exam => exam.id !== examToDelete.id))
      setShowDeleteDialog(false)
      setExamToDelete(null)
    }
  }

  const cancelDeleteExam = () => {
    setShowDeleteDialog(false)
    setExamToDelete(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 py-16">
      <div className="container mx-auto px-4 max-w-5xl">
        <header className="text-center mb-16">
          <h1 className="text-4xl font-bold text-purple-600 mb-4">真题模考</h1>
          <p className="text-gray-600 text-lg">模拟真实考试环境，生成详细报告</p>
        </header>

        {/* 考试列表 */}
        {!isTakingExam && !showResult && (
          <div className="card mb-8">
            <h2 className="text-xl font-bold mb-6">模拟考试列表</h2>
            <div className="space-y-6">
              {exams.map((exam) => {
                // 检查是否是默认考试（id为1、2、3、4、5）
                const isDefaultExam = ['1', '2', '3', '4', '5'].includes(exam.id)
                
                return (
                  <div key={exam.id} className={`p-6 border rounded-lg ${exam.completed ? 'border-green-200 bg-green-50' : 'border-gray-200'}`}>
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-bold mb-2">{exam.name}</h3>
                        <p className="text-gray-600 mb-4">{exam.description}</p>
                        <div className="flex flex-wrap gap-3 mb-4">
                          <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                            {exam.duration}分钟
                          </span>
                          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                            {exam.questionCount}题
                          </span>
                          <span className={`px-3 py-1 rounded-full text-sm ${exam.difficulty === 'easy' ? 'bg-green-100 text-green-800' : exam.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                            {exam.difficulty === 'easy' ? '简单' : exam.difficulty === 'medium' ? '中等' : '困难'}
                          </span>
                          {exam.completed && (
                            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                              已完成
                            </span>
                          )}
                        </div>
                        <div className="flex flex-wrap gap-1 mb-4">
                          {exam.categories.map((category, index) => (
                            <span key={index} className="px-2 py-0.5 bg-gray-100 text-gray-800 rounded-full text-xs">
                              {category}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2 ml-4">
                        {exam.completed ? (
                          <>
                            <p className="text-gray-600 mb-2">上次考试: {exam.date}</p>
                            <p className="text-xl font-bold text-green-600 mb-4">得分: {exam.score}</p>
                            <button className="btn-primary px-6 py-2">
                              查看报告
                            </button>
                          </>
                        ) : (
                          <button
                            className="btn-primary px-6 py-2"
                            onClick={() => startExam(exam)}
                          >
                            开始考试
                          </button>
                        )}
                        {!isDefaultExam && (
                          <button
                            className="btn-danger px-6 py-2 mt-2"
                            onClick={() => handleDeleteExam(exam)}
                          >
                            删除
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* 考试界面 */}
        {isTakingExam && (
          <div className="card mb-8">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">{currentExam?.name}</h2>
                <div className="flex items-center space-x-4">
                  <div className={`px-4 py-2 rounded-full ${timeRemaining < 600 ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                    剩余时间: {formatTime(timeRemaining)}
                  </div>
                  <button
                    className="btn-secondary px-4 py-2"
                    onClick={submitExam}
                  >
                    提交试卷
                  </button>
                </div>
              </div>

              {/* 题目导航 */}
              <div className="grid grid-cols-10 gap-2 mb-8">
                {questions.map((_, index) => (
                  <button
                    key={index}
                    className={`w-full aspect-square flex items-center justify-center rounded-md ${index === currentQuestionIndex ? 'bg-purple-500 text-white' : questions[index].userAnswer ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}
                    onClick={() => navigateToQuestion(index)}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>

              {/* 当前题目 */}
              {questions[currentQuestionIndex] && (
                <div className="mb-8">
                  <h3 className="text-lg font-bold mb-4">
                    第 {currentQuestionIndex + 1} 题 ({questions[currentQuestionIndex].type === 'multiple-choice' ? '选择题' : questions[currentQuestionIndex].type === 'true-false' ? '判断题' : questions[currentQuestionIndex].type === 'fill-blank' ? '填空题' : '简答题'})
                  </h3>
                  <p className="text-gray-700 mb-6">{questions[currentQuestionIndex].question}</p>

                  {questions[currentQuestionIndex].type === 'multiple-choice' && (
                    <div className="space-y-3 mb-6">
                      {questions[currentQuestionIndex].options?.map((option, index) => (
                        <div key={index} className="flex items-center">
                          <input
                            type="radio"
                            id={`option-${index}`}
                            name={`question-${questions[currentQuestionIndex].id}`}
                            value={option}
                            checked={questions[currentQuestionIndex].userAnswer === option}
                            onChange={(e) => submitAnswer(e.target.value)}
                            className="mr-2"
                          />
                          <label htmlFor={`option-${index}`} className="cursor-pointer">
                            {option}
                          </label>
                        </div>
                      ))}
                    </div>
                  )}

                  {questions[currentQuestionIndex].type === 'true-false' && (
                    <div className="flex space-x-6 mb-6">
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="true"
                          name={`question-${questions[currentQuestionIndex].id}`}
                          value="正确"
                          checked={questions[currentQuestionIndex].userAnswer === '正确'}
                          onChange={(e) => submitAnswer(e.target.value)}
                          className="mr-2"
                        />
                        <label htmlFor="true" className="cursor-pointer">正确</label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="false"
                          name={`question-${questions[currentQuestionIndex].id}`}
                          value="错误"
                          checked={questions[currentQuestionIndex].userAnswer === '错误'}
                          onChange={(e) => submitAnswer(e.target.value)}
                          className="mr-2"
                        />
                        <label htmlFor="false" className="cursor-pointer">错误</label>
                      </div>
                    </div>
                  )}

                  {questions[currentQuestionIndex].type === 'fill-blank' && (
                    <div className="mb-6">
                      <input
                        type="text"
                        className="w-full p-3 border rounded-md"
                        placeholder="请输入答案"
                        value={typeof questions[currentQuestionIndex].userAnswer === 'string' ? questions[currentQuestionIndex].userAnswer : ''}
                        onChange={(e) => submitAnswer(e.target.value)}
                      />
                    </div>
                  )}

                  {questions[currentQuestionIndex].type === 'short-answer' && (
                    <div className="mb-6">
                      <textarea
                        className="w-full p-3 border rounded-md min-h-[120px]"
                        placeholder="请输入答案"
                        value={typeof questions[currentQuestionIndex].userAnswer === 'string' ? questions[currentQuestionIndex].userAnswer : ''}
                        onChange={(e) => submitAnswer(e.target.value)}
                      />
                    </div>
                  )}
                </div>
              )}

              {/* 导航按钮 */}
              <div className="flex justify-between">
                <button
                  className="btn-secondary px-6 py-2"
                  onClick={prevQuestion}
                  disabled={currentQuestionIndex === 0}
                >
                  上一题
                </button>
                <button
                  className="btn-primary px-6 py-2"
                  onClick={nextQuestion}
                  disabled={currentQuestionIndex === questions.length - 1}
                >
                  下一题
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 考试结果 */}
        {showResult && examResult && (
          <div className="card mb-8">
            <div className="p-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">考试完成！</h2>
                <div className="inline-block p-8 rounded-full bg-purple-100 mb-6">
                  <span className="text-5xl font-bold text-purple-600">{examResult.totalScore}</span>
                </div>
                <p className="text-xl text-gray-600 mb-2">
                  正确率: {examResult.accuracy.toFixed(1)}%
                </p>
                <p className="text-gray-500">
                  用时: {formatTime(examResult.timeUsed)}
                </p>
              </div>

              {/* 统计信息 */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="bg-green-50 p-6 rounded-lg text-center">
                  <h3 className="text-lg font-bold mb-2 text-green-600">正确题数</h3>
                  <p className="text-3xl font-bold">{examResult.correctCount}</p>
                </div>
                <div className="bg-red-50 p-6 rounded-lg text-center">
                  <h3 className="text-lg font-bold mb-2 text-red-600">错误题数</h3>
                  <p className="text-3xl font-bold">{examResult.incorrectCount}</p>
                </div>
                <div className="bg-blue-50 p-6 rounded-lg text-center">
                  <h3 className="text-lg font-bold mb-2 text-blue-600">总题数</h3>
                  <p className="text-3xl font-bold">{examResult.correctCount + examResult.incorrectCount}</p>
                </div>
              </div>

              {/* 分类分析 */}
              <div className="mb-12">
                <h3 className="text-xl font-bold mb-6">分类分析</h3>
                <div className="space-y-4">
                  {examResult.categoryAnalysis.map((item, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">{item.category}</span>
                        <span>{item.correct}/{item.total} ({item.accuracy.toFixed(1)}%)</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-purple-500 h-2 rounded-full" 
                          style={{ width: `${item.accuracy}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 难度分析 */}
              <div className="mb-12">
                <h3 className="text-xl font-bold mb-6">难度分析</h3>
                <div className="space-y-4">
                  {examResult.difficultyAnalysis.map((item, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">{item.difficulty}</span>
                        <span>{item.correct}/{item.total} ({item.accuracy.toFixed(1)}%)</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full" 
                          style={{ width: `${item.accuracy}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 推荐复习 */}
              <div className="mb-12">
                <h3 className="text-xl font-bold mb-6">推荐复习内容</h3>
                <div className="p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <ul className="list-disc list-inside space-y-2">
                    {examResult.recommendedReview.map((item, index) => (
                      <li key={index} className="text-gray-700">{item}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* 操作按钮 */}
              <div className="flex justify-center space-x-4">
                <button
                  className="btn-primary px-8 py-3"
                  onClick={() => {
                    setShowResult(false)
                    setIsTakingExam(false)
                  }}
                >
                  返回列表
                </button>
                <button className="btn-secondary px-8 py-3">
                  查看详细报告
                </button>
              </div>
            </div>
          </div>
        )}

        <footer className="mt-20 text-center text-gray-500 text-sm">
          <p>© 2026 AI技能刷题站</p>
        </footer>

        {/* 删除确认对话框 */}
        {showDeleteDialog && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
              <h3 className="text-xl font-bold mb-4">确认删除</h3>
              <p className="text-gray-600 mb-6">
                确定要删除题库"{examToDelete?.name}"吗？此操作不可撤销。
              </p>
              <div className="flex justify-end space-x-4">
                <button
                  className="btn-secondary px-6 py-2"
                  onClick={cancelDeleteExam}
                >
                  取消
                </button>
                <button
                  className="btn-danger px-6 py-2"
                  onClick={confirmDeleteExam}
                >
                  确认删除
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// 辅助函数：检查答案是否正确
function checkAnswer(userAnswer: any, correctAnswer: any): boolean {
  if (!userAnswer) return false
  
  if (Array.isArray(correctAnswer)) {
    if (Array.isArray(userAnswer)) {
      return correctAnswer.every(ans => userAnswer.includes(ans)) && 
             userAnswer.every(ans => correctAnswer.includes(ans))
    }
  } else {
    return userAnswer === correctAnswer
  }
  
  return false
}
