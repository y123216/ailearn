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

interface ErrorQuestion {
  id: string
  question: string
  userAnswer: string | string[]
  correctAnswer: string | string[]
  explanation: string
  category: string
  difficulty: string
  date: string
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
  const usedQuestionKeys = new Set<string>()
  
  let attempts = 0
  const maxAttempts = count * 10
  
  while (questions.length < count && attempts < maxAttempts) {
    attempts++
    
    const questionTypes: Array<'multiple-choice' | 'true-false' | 'fill-blank' | 'short-answer'> = ['multiple-choice', 'true-false', 'fill-blank', 'short-answer']
    const randomType = questionTypes[Math.floor(Math.random() * questionTypes.length)]
    
    let question: Question
    
    switch (category) {
      case 'english':
        question = generateEnglishQuestion(questions.length, randomType, difficulty)
        break
      case 'programming':
        question = generateProgrammingQuestion(questions.length, randomType, difficulty)
        break
      case 'general':
        question = generateGeneralQuestion(questions.length, randomType, difficulty)
        break
      default:
        question = generateGeneralQuestion(questions.length, randomType, difficulty)
    }
    
    const questionKey = `${question.question}-${question.type}`
    if (!usedQuestionKeys.has(questionKey)) {
      usedQuestionKeys.add(questionKey)
      questions.push(question)
    }
  }
  
  return questions
}

const generateEnglishQuestion = (index: number, type: string, difficulty: string): Question => {
  const englishQuestions = {
    multipleChoice: [
      {
        question: 'Choose the correct form of the verb: "She _____ to school every day."',
        options: ['go', 'goes', 'going', 'went'],
        correctAnswer: 'goes',
        explanation: '第三人称单数一般现在时，动词要加 -es。'
      },
      {
        question: 'Which word is a synonym of "happy"?',
        options: ['sad', 'joyful', 'angry', 'tired'],
        correctAnswer: 'joyful',
        explanation: '"Joyful" means feeling or expressing great pleasure and happiness.'
      },
      {
        question: 'Select the correct sentence:',
        options: ['He don\'t like coffee.', 'He doesn\'t likes coffee.', 'He doesn\'t like coffee.', 'He not like coffee.'],
        correctAnswer: 'He doesn\'t like coffee.',
        explanation: '否定句中第三人称单数使用 "doesn\'t" + 动词原形。'
      }
    ],
    trueFalse: [
      {
        question: 'The word "beautiful" is an adjective.',
        correctAnswer: '正确',
        explanation: '"Beautiful" 描述名词，是形容词。'
      },
      {
        question: '"Run" is the past tense of "running".',
        correctAnswer: '错误',
        explanation: '"Run" 是现在时，"ran" 是过去时。'
      }
    ],
    fillBlank: [
      {
        question: 'Complete the sentence: "I _____ English for three years." (study)',
        correctAnswer: 'have studied',
        explanation: '表示从过去持续到现在的动作，使用现在完成时。'
      },
      {
        question: 'Fill in the blank: "The book is _____ the table." (介词)',
        correctAnswer: 'on',
        explanation: '表示在物体表面之上，使用介词 "on"。'
      }
    ],
    shortAnswer: [
      {
        question: 'What is the difference between "affect" and "effect"?',
        correctAnswer: '"Affect" is usually a verb meaning to influence, while "effect" is usually a noun meaning the result.',
        explanation: 'Affect是动词，effect通常是名词。'
      },
      {
        question: 'Explain the difference between "make" and "do".',
        correctAnswer: '"Make" is used when creating something new, while "do" is used for actions or tasks.',
        explanation: 'Make强调创造，do强调执行动作。'
      }
    ]
  }
  
  return getQuestionByType(index, type, difficulty, '英语', englishQuestions)
}

const generateProgrammingQuestion = (index: number, type: string, difficulty: string): Question => {
  const programmingQuestions = {
    multipleChoice: [
      {
        question: '二分查找的时间复杂度是多少？',
        options: ['O(n)', 'O(log n)', 'O(n²)', 'O(1)'],
        correctAnswer: 'O(log n)',
        explanation: '二分查找每次将搜索范围减半，时间复杂度为 O(log n)。'
      },
      {
        question: '哪种数据结构遵循后进先出（LIFO）原则？',
        options: ['队列', '栈', '数组', '链表'],
        correctAnswer: '栈',
        explanation: '栈遵循后进先出（LIFO）原则。'
      },
      {
        question: 'HTML是什么的缩写？',
        options: ['超文本标记语言', '高科技现代语言', '超传输标记语言', '家庭工具标记语言'],
        correctAnswer: '超文本标记语言',
        explanation: 'HTML 是超文本标记语言的缩写。'
      }
    ],
    trueFalse: [
      {
        question: 'Python 是编译型语言。',
        correctAnswer: '错误',
        explanation: 'Python 是解释型语言，不是编译型语言。'
      },
      {
        question: '大多数编程语言中数组索引从 0 开始。',
        correctAnswer: '正确',
        explanation: '大多数编程语言中数组索引从 0 开始。'
      }
    ],
    fillBlank: [
      {
        question: '在面向对象编程中，_____ 是创建对象的蓝图。',
        correctAnswer: '类',
        explanation: '类是创建对象的蓝图或模板。'
      },
      {
        question: '在 JavaScript 中，使用 _____ 关键字创建新对象。',
        correctAnswer: 'new',
        explanation: '使用 new 关键字创建对象实例。'
      }
    ],
    shortAnswer: [
      {
        question: '解释 JavaScript 中 == 和 === 的区别。',
        correctAnswer: '== 会进行类型转换后比较相等性，而 === 严格比较不进行类型转换。',
        explanation: '==会进行类型转换，===严格比较不转换类型。'
      },
      {
        question: 'Python 中列表和元组的区别是什么？',
        correctAnswer: '列表是可变的（可以修改），而元组是不可变的（不能修改）。',
        explanation: '列表可变，元组不可变。'
      }
    ]
  }
  
  return getQuestionByType(index, type, difficulty, '编程', programmingQuestions)
}

const generateGeneralQuestion = (index: number, type: string, difficulty: string): Question => {
  const generalQuestions = {
    multipleChoice: [
      {
        question: '法国的首都是哪里？',
        options: ['伦敦', '柏林', '巴黎', '马德里'],
        correctAnswer: '巴黎',
        explanation: '巴黎是法国的首都。'
      },
      {
        question: '哪个行星被称为红色星球？',
        options: ['金星', '火星', '木星', '土星'],
        correctAnswer: '火星',
        explanation: '火星因表面氧化铁呈现红色，被称为红色星球。'
      },
      {
        question: '人体最大的器官是什么？',
        options: ['心脏', '肝脏', '皮肤', '大脑'],
        correctAnswer: '皮肤',
        explanation: '皮肤是人体最大的器官。'
      }
    ],
    trueFalse: [
      {
        question: '中国长城在太空中用肉眼可以看到。',
        correctAnswer: '错误',
        explanation: '长城在太空中用肉眼是看不见的。'
      },
      {
        question: '在海平面高度，水在100摄氏度沸腾。',
        correctAnswer: '正确',
        explanation: '在海平面高度，水在100摄氏度沸腾。'
      }
    ],
    fillBlank: [
      {
        question: '水的化学式是 _____。',
        correctAnswer: 'H2O',
        explanation: '水的化学式是H2O，由两个氢原子和一个氧原子组成。'
      },
      {
        question: '地球上最大的海洋是 _____。',
        correctAnswer: '太平洋',
        explanation: '太平洋是地球上最大的海洋。'
      }
    ],
    shortAnswer: [
      {
        question: '解释温室效应。',
        correctAnswer: '温室效应是指温室气体在地球表面附近捕获热量的过程。',
        explanation: '温室效应是温室气体在地球表面附近捕获热量的过程。'
      },
      {
        question: '天气和气候的区别是什么？',
        correctAnswer: '天气指短期的大气状况，而气候指长期的天气模式。',
        explanation: '天气是短期大气状况，气候是长期天气模式。'
      }
    ]
  }
  
  return getQuestionByType(index, type, difficulty, '综合知识', generalQuestions)
}

const getQuestionByType = (index: number, type: string, difficulty: string, categoryName: string, questionBank: any): Question => {
  const typeMap: Record<string, string> = {
    'multiple-choice': 'multipleChoice',
    'true-false': 'trueFalse',
    'fill-blank': 'fillBlank',
    'short-answer': 'shortAnswer'
  }
  
  const typeKey = typeMap[type]
  const questions = questionBank[typeKey]
  const randomIndex = Math.floor(Math.random() * questions.length)
  const selectedQuestion = questions[randomIndex]
  
  const baseQuestion: any = {
    id: `${type}-${Date.now()}-${index}`,
    type: type as any,
    category: categoryName,
    difficulty: difficulty as 'easy' | 'medium' | 'hard',
    question: selectedQuestion.question,
    correctAnswer: selectedQuestion.correctAnswer,
    explanation: selectedQuestion.explanation,
    tags: [categoryName, getDifficultyName(difficulty), getTypeName(type)],
    originalQuestion: selectedQuestion.question
  }
  
  if (type === 'multiple-choice' && selectedQuestion.options) {
    baseQuestion.options = selectedQuestion.options
  }
  
  return baseQuestion
}

const getTypeName = (type: string): string => {
  switch (type) {
    case 'multiple-choice':
      return '选择题'
    case 'true-false':
      return '判断题'
    case 'fill-blank':
      return '填空题'
    case 'short-answer':
      return '简答题'
    default:
      return type
  }
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
  const [showErrorAnalysis, setShowErrorAnalysis] = useState(false)

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

  // 计算分数并收集错题
  const calculateScore = () => {
    let correctCount = 0
    const errorQuestions: ErrorQuestion[] = []
    
    questions.forEach(question => {
      const userAnswer = userAnswers[question.id]
      let isCorrect = false
      
      if (!userAnswer) {
        // 用户未回答，视为错误
        isCorrect = false
      } else if (Array.isArray(question.correctAnswer)) {
        if (Array.isArray(userAnswer)) {
          isCorrect = question.correctAnswer.every(ans => userAnswer.includes(ans)) && 
                     userAnswer.every(ans => question.correctAnswer.includes(ans))
        } else {
          // 用户答案类型与正确答案类型不匹配，视为错误
          isCorrect = false
        }
      } else {
        isCorrect = userAnswer === question.correctAnswer
      }
      
      if (isCorrect) {
        correctCount++
      } else {
        // 收集错题
        errorQuestions.push({
          id: question.id,
          question: question.question,
          userAnswer: userAnswer || '未回答',
          correctAnswer: question.correctAnswer,
          explanation: question.explanation || '暂无解析',
          category: question.category,
          difficulty: question.difficulty,
          date: new Date().toISOString().split('T')[0],
          tags: question.tags
        })
      }
    })
    
    setScore(Math.round((correctCount / questions.length) * 100))
    
    // 存储错题到localStorage
    if (errorQuestions.length > 0) {
      const existingErrors = JSON.parse(localStorage.getItem('errorQuestions') || '[]')
      const updatedErrors = [...existingErrors, ...errorQuestions]
      localStorage.setItem('errorQuestions', JSON.stringify(updatedErrors))
    }
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
        {!questions.length && !showResult ? (
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
        ) : null}

        {/* 题目导航和当前题目 */}
        {questions.length > 0 && !showResult && (
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
                <button
                  className="btn-danger px-6 py-3"
                  onClick={() => {
                    // 确保错题数据已存储后再跳转
                    setTimeout(() => {
                      window.location.href = '/learning/skills/analysis'
                    }, 100)
                  }}
                >
                  错题深度解析
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
