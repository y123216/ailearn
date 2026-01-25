'use client'

import { useState, useEffect } from 'react'

interface Question {
  id: string
  type: 'multiple-choice' | 'true-false' | 'fill-blank' | 'short-answer'
  category: string
  difficulty: 'easy' | 'medium' | 'hard'
  question: string
  options?: string[]
  correctAnswer: string | string[]
  explanation?: string
  tags: string[]
}

interface Category {
  id: string
  name: string
  description: string
  icon: string
}

const categories: Category[] = [
  {
    id: 'math',
    name: '数学',
    description: '涵盖代数、几何、概率等数学知识',
    icon: '📐'
  },
  {
    id: 'english',
    name: '英语',
    description: '包括语法、词汇、阅读等英语技能',
    icon: '📝'
  },
  {
    id: 'programming',
    name: '编程',
    description: '涵盖各种编程语言和算法知识',
    icon: '💻'
  },
  {
    id: 'general',
    name: '综合知识',
    description: '包括历史、地理、科学等综合知识',
    icon: '🌍'
  }
]

// 生成模拟题目
const generateMockQuestions = (category: string, difficulty: string, count: number): Question[] => {
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
          category,
          difficulty: difficulty as 'easy' | 'medium' | 'hard',
          question: `${i + 1}. 下列哪个选项是正确的？`,
          options: ['选项 A', '选项 B', '选项 C', '选项 D'],
          correctAnswer: '选项 A',
          explanation: '解析：根据相关知识点，选项 A 是正确答案。',
          tags: [getCategoryName(category), getDifficultyName(difficulty), '选择题']
        }
        break
      case 'true-false':
        question = {
          id: `tf-${Date.now()}-${i}`,
          type: 'true-false',
          category,
          difficulty: difficulty as 'easy' | 'medium' | 'hard',
          question: `${i + 1}. 这句话是正确的吗？`,
          correctAnswer: Math.random() > 0.5 ? '正确' : '错误',
          explanation: '解析：根据相关知识点，这个陈述是正确的/错误的。',
          tags: [getCategoryName(category), getDifficultyName(difficulty), '判断题']
        }
        break
      case 'fill-blank':
        question = {
          id: `fb-${Date.now()}-${i}`,
          type: 'fill-blank',
          category,
          difficulty: difficulty as 'easy' | 'medium' | 'hard',
          question: `${i + 1}. 请填写空白处的内容：_______ 是一种重要的学习方法。`,
          correctAnswer: '练习',
          explanation: '解析：练习是巩固知识的重要方法。',
          tags: [getCategoryName(category), getDifficultyName(difficulty), '填空题']
        }
        break
      case 'short-answer':
        question = {
          id: `sa-${Date.now()}-${i}`,
          type: 'short-answer',
          category,
          difficulty: difficulty as 'easy' | 'medium' | 'hard',
          question: `${i + 1}. 请简要解释什么是人工智能？`,
          correctAnswer: '人工智能是指计算机系统模拟人类智能的能力，包括学习、推理、感知等功能。',
          explanation: '解析：人工智能是一个广泛的领域，涵盖了机器学习、深度学习等多个分支。',
          tags: [getCategoryName(category), getDifficultyName(difficulty), '简答题']
        }
        break
    }
    
    questions.push(question)
  }
  
  return questions
}

const getCategoryName = (categoryId: string): string => {
  const category = categories.find(c => c.id === categoryId)
  return category ? category.name : '未知'
}

const getDifficultyName = (difficulty: string): string => {
  switch (difficulty) {
    case 'easy':
      return '简单'
    case 'medium':
      return '中等'
    case 'hard':
      return '困难'
    default:
      return difficulty
  }
}

export default function AIQuestions() {
  const [selectedCategory, setSelectedCategory] = useState('general')
  const [selectedDifficulty, setSelectedDifficulty] = useState('medium')
  const [questionCount, setQuestionCount] = useState(5)
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [userAnswers, setUserAnswers] = useState<Record<string, string | string[]>>({})
  const [showResult, setShowResult] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [score, setScore] = useState(0)

  // 生成题目
  const generateQuestions = async () => {
    setIsGenerating(true)
    setShowResult(false)
    setCurrentQuestionIndex(0)
    setUserAnswers({})
    
    // 模拟API调用延迟
    setTimeout(() => {
      const newQuestions = generateMockQuestions(selectedCategory, selectedDifficulty, questionCount)
      setQuestions(newQuestions)
      setIsGenerating(false)
    }, 1500)
  }

  // 提交答案
  const submitAnswer = (answer: string | string[]) => {
    setUserAnswers(prev => ({
      ...prev,
      [questions[currentQuestionIndex].id]: answer
    }))
  }

  // 下一题
  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1)
    } else {
      calculateScore()
      setShowResult(true)
    }
  }

  // 上一题
  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1)
    }
  }

  // 计算分数
  const calculateScore = () => {
    let correctCount = 0
    questions.forEach(question => {
      const userAnswer = userAnswers[question.id]
      if (!userAnswer) return

      if (Array.isArray(question.correctAnswer)) {
        if (Array.isArray(userAnswer)) {
          const isCorrect = question.correctAnswer.every(ans => userAnswer.includes(ans)) && 
                          userAnswer.every(ans => question.correctAnswer.includes(ans))
          if (isCorrect) correctCount++
        }
      } else {
        if (userAnswer === question.correctAnswer) {
          correctCount++
        }
      }
    })
    setScore(Math.round((correctCount / questions.length) * 100))
  }

  // 重新开始
  const restart = () => {
    setShowResult(false)
    setCurrentQuestionIndex(0)
    setUserAnswers({})
    setScore(0)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <header className="text-center mb-16">
          <h1 className="text-4xl font-bold text-purple-600 mb-4">AI动态出题</h1>
          <p className="text-gray-600 text-lg">基于考点配置和错题分析，智能生成个性化题目</p>
        </header>

        {/* 题目生成配置 */}
        {!questions.length || showResult ? (
          <div className="card mb-12">
            <h2 className="text-2xl font-bold mb-6 text-center">题目配置</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div>
                <label className="block text-gray-700 mb-2 font-medium">选择类别</label>
                <select
                  className="w-full p-2 border rounded-md"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.icon} {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-gray-700 mb-2 font-medium">难度等级</label>
                <select
                  className="w-full p-2 border rounded-md"
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                >
                  <option value="easy">简单</option>
                  <option value="medium">中等</option>
                  <option value="hard">困难</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 mb-2 font-medium">题目数量</label>
                <select
                  className="w-full p-2 border rounded-md"
                  value={questionCount}
                  onChange={(e) => setQuestionCount(Number(e.target.value))}
                >
                  <option value={5}>5题</option>
                  <option value={10}>10题</option>
                  <option value={15}>15题</option>
                  <option value={20}>20题</option>
                </select>
              </div>
            </div>
            <div className="text-center">
              <button
                className="btn-primary px-8 py-3 text-lg"
                onClick={generateQuestions}
                disabled={isGenerating}
              >
                {isGenerating ? '生成中...' : '生成题目'}
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* 题目导航 */}
            <div className="card mb-8">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-bold">
                    题目 {currentQuestionIndex + 1}/{questions.length}
                  </h2>
                  <p className="text-gray-600">
                    {getCategoryName(questions[currentQuestionIndex].category)} · 
                    {questions[currentQuestionIndex].difficulty === 'easy' ? '简单' : 
                     questions[currentQuestionIndex].difficulty === 'medium' ? '中等' : '困难'} · 
                    {questions[currentQuestionIndex].type === 'multiple-choice' ? '选择题' : 
                     questions[currentQuestionIndex].type === 'true-false' ? '判断题' : 
                     questions[currentQuestionIndex].type === 'fill-blank' ? '填空题' : '简答题'}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button
                    className="btn-secondary px-4 py-2"
                    onClick={prevQuestion}
                    disabled={currentQuestionIndex === 0}
                  >
                    上一题
                  </button>
                  <button
                    className="btn-primary px-4 py-2"
                    onClick={nextQuestion}
                  >
                    {currentQuestionIndex === questions.length - 1 ? '提交' : '下一题'}
                  </button>
                </div>
              </div>
            </div>

            {/* 当前题目 */}
            <div className="card mb-8">
              <div className="p-6">
                <h3 className="text-xl font-bold mb-6" dangerouslySetInnerHTML={{ __html: questions[currentQuestionIndex].question }}></h3>
                
                {questions[currentQuestionIndex].type === 'multiple-choice' && (
                  <div className="space-y-3 mb-6">
                    {questions[currentQuestionIndex].options?.map((option, index) => (
                      <div key={index} className="flex items-center">
                        <input
                          type="radio"
                          id={`option-${index}`}
                          name={`question-${questions[currentQuestionIndex].id}`}
                          value={option}
                          checked={userAnswers[questions[currentQuestionIndex].id] === option}
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
                        checked={userAnswers[questions[currentQuestionIndex].id] === '正确'}
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
                        checked={userAnswers[questions[currentQuestionIndex].id] === '错误'}
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
                      value={typeof userAnswers[questions[currentQuestionIndex].id] === 'string' ? userAnswers[questions[currentQuestionIndex].id] : ''}
                      onChange={(e) => submitAnswer(e.target.value)}
                    />
                  </div>
                )}

                {questions[currentQuestionIndex].type === 'short-answer' && (
                  <div className="mb-6">
                    <textarea
                      className="w-full p-3 border rounded-md min-h-[120px]"
                      placeholder="请输入答案"
                      value={typeof userAnswers[questions[currentQuestionIndex].id] === 'string' ? userAnswers[questions[currentQuestionIndex].id] : ''}
                      onChange={(e) => submitAnswer(e.target.value)}
                    />
                  </div>
                )}

                {/* 标签 */}
                <div className="flex flex-wrap gap-2 mt-6">
                  {questions[currentQuestionIndex].tags.map((tag, index) => (
                    <span key={index} className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {/* 结果展示 */}
        {showResult && (
          <div className="card mb-8">
            <div className="p-8 text-center">
              <h2 className="text-3xl font-bold mb-4">答题完成！</h2>
              <div className="mb-8">
                <div className="inline-block p-6 rounded-full bg-purple-100 mb-4">
                  <span className="text-4xl font-bold text-purple-600">{score}%</span>
                </div>
                <p className="text-xl text-gray-600">
                  得分：{score}分
                </p>
                <p className="text-gray-500 mt-2">
                  正确：{Math.round((score / 100) * questions.length)}题 / 总题数：{questions.length}题
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  className="btn-primary px-6 py-3"
                  onClick={restart}
                >
                  重新答题
                </button>
                <button
                  className="btn-secondary px-6 py-3"
                  onClick={() => {
                    setQuestions([])
                    setShowResult(false)
                  }}
                >
                  重新生成题目
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 题目历史 */}
        {questions.length > 0 && (
          <div className="card mt-12">
            <h2 className="text-xl font-bold mb-4">题目进度</h2>
            <div className="grid grid-cols-5 gap-2">
              {questions.map((question, index) => (
                <button
                  key={question.id}
                  className={`p-2 rounded-md text-center ${index === currentQuestionIndex ? 'bg-purple-500 text-white' : 
                    userAnswers[question.id] ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}
                  onClick={() => setCurrentQuestionIndex(index)}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
        )}

        <footer className="mt-20 text-center text-gray-500 text-sm">
          <p>© 2026 AI互动式学习平台</p>
        </footer>
      </div>
    </div>
  )
}
