'use client'

import { useState, useEffect } from 'react'

interface Message {
  id: string
  role: 'user' | 'ai'
  content: string
  timestamp: Date
  translation?: string
  feedback?: string
  hints?: string[]
  examples?: string[]
}

interface Scenario {
  id: string
  name: string
  category: string
  description: string
  initialMessage: string
  context: string
}

const scenarios: Scenario[] = [
  {
    id: '1',
    name: '旅游',
    category: '日常',
    description: '出国旅游常用对话',
    initialMessage: 'Hello! Welcome to our travel service. Where would you like to go today?',
    context: 'You are a tourist asking for information about attractions and transportation'
  },
  {
    id: '2',
    name: '职场',
    category: '商务',
    description: '办公室日常交流',
    initialMessage: 'Good morning! How was your weekend?',
    context: 'You are an employee having a conversation with a colleague'
  },
  {
    id: '3',
    name: '考级',
    category: '学习',
    description: '各类语言考试相关对话',
    initialMessage: 'Hello! How can I help you prepare for your exam today?',
    context: 'You are a student preparing for a language exam'
  },
  {
    id: '4',
    name: '日常交流',
    category: '日常',
    description: '日常生活对话',
    initialMessage: 'Hi there! Nice to meet you. How are you doing today?',
    context: 'You are meeting someone for the first time'
  },
  {
    id: '5',
    name: '商务谈判',
    category: '商务',
    description: '商务场合谈判对话',
    initialMessage: 'Good afternoon! Let\'s discuss the terms of our agreement.',
    context: 'You are a business person negotiating a deal'
  }
]

interface TranslationResponse {
  translatedText: string
}

interface FeedbackResponse {
  feedback: string
  hints: string[]
}

// 模拟翻译API
const mockTranslate = (text: string): Promise<TranslationResponse> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // 模拟翻译结果
      const translations: Record<string, string> = {
        // 初始问候语
        'Hello! Welcome to our travel service. Where would you like to go today?': '你好！欢迎使用我们的旅游服务。今天您想去哪里？',
        'Good morning! How was your weekend?': '早上好！你周末过得怎么样？',
        'Hello! How can I help you prepare for your exam today?': '你好！今天我如何帮助你准备考试？',
        'Hi there! Nice to meet you. How are you doing today?': '你好！很高兴认识你。你今天过得怎么样？',
        'Good afternoon! Let\'s discuss the terms of our agreement.': '下午好！让我们讨论一下协议条款。',
        
        // AI可能的回复
        'That sounds like a great destination! What activities are you interested in?': '那听起来是个很棒的目的地！你对什么活动感兴趣？',
        'How long will you be staying there?': '你会在那里待多久？',
        'Would you like information about local transportation options?': '你需要当地交通选择的信息吗？',
        'There are many beautiful sights to see in that area.': '那个地区有很多美丽的景点可看。',
        'I had a wonderful weekend, thanks for asking! How about you?': '我周末过得很愉快，谢谢关心！你呢？',
        'Did you get any work done over the weekend?': '你周末做了什么工作吗？',
        'Any exciting plans for this week?': '这周有什么令人兴奋的计划吗？',
        'The project deadline is coming up soon, have you made progress?': '项目截止日期快到了，你有进展吗？',
        'What section of the exam are you most concerned about?': '你最担心考试的哪个部分？',
        'Have you been practicing your listening skills?': '你一直在练习听力技巧吗？',
        'Vocabulary is very important for the exam, how is your word bank?': '词汇对考试非常重要，你的词汇量怎么样？',
        'Let\'s practice some sample questions together.': '让我们一起练习一些样题。',
        'I\'m doing well, thanks! What brings you here today?': '我很好，谢谢！今天是什么风把你吹来了？',
        'It\'s a beautiful day outside, isn\'t it?': '外面天气真好，不是吗？',
        'Do you have any interesting hobbies?': '你有什么有趣的爱好吗？',
        'What kind of music do you like?': '你喜欢什么类型的音乐？',
        'I\'m open to discussing all aspects of the agreement.': '我愿意讨论协议的所有方面。',
        'What are your main concerns about the current terms?': '你对当前条款的主要担忧是什么？',
        'We need to find a solution that works for both parties.': '我们需要找到一个对双方都有效的解决方案。',
        'Let\'s go through each point one by one.': '让我们逐一讨论每个要点。',
        'That\'s interesting. Tell me more about it.': '那很有趣。告诉我更多关于它的信息。',
        
        // 用户可能输入的句子
        'I want to go to Paris.': '我想去巴黎。',
        'Can you recommend some popular tourist attractions?': '你能推荐一些热门旅游景点吗？',
        'What are the must-see places in this city?': '这个城市有哪些必去的地方？',
        'How do I get around the city?': '我怎么在城市里出行？',
        'Is public transportation reliable here?': '这里的公共交通可靠吗？',
        'What\'s the best way to travel between attractions?': '景点之间最好的交通方式是什么？',
        'Tell me about local food options.': '告诉我当地的美食选择。',
        'What\'s the weather like this time of year?': '这个时候的天气怎么样？',
        'Are there any special events happening?': '有什么特别的活动吗？',
        'How\'s the project coming along?': '项目进展如何？',
        'I need help with my work task.': '我需要工作任务的帮助。',
        'What\'s the deadline for this project?': '这个项目的截止日期是什么时候？',
        'When is our next meeting?': '我们下次会议是什么时候？',
        'Can you help me schedule a meeting?': '你能帮我安排会议吗？',
        'What\'s on the agenda for today?': '今天的议程是什么？',
        'How was your weekend?': '你周末过得怎么样？',
        'Do you have any plans after work?': '下班后你有什么计划吗？',
        'What\'s new in the office?': '办公室有什么新鲜事吗？',
        'How can I prepare for the listening section?': '我如何准备听力部分？',
        'What\'s the best way to study vocabulary?': '学习词汇的最佳方法是什么？',
        'Can you give me some writing practice?': '你能给我一些写作练习吗？',
        'Let\'s practice some reading comprehension.': '让我们练习一些阅读理解。',
        'I need help with grammar exercises.': '我需要语法练习的帮助。',
        'Can we review my previous answers?': '我们可以复习我之前的答案吗？',
        'What\'s the passing score for this exam?': '这个考试的及格分数是多少？',
        'How long does the exam take?': '考试需要多长时间？',
        'What topics are covered in the test?': '考试涵盖哪些主题？',
        'How are you doing today?': '你今天过得怎么样？',
        'What have you been up to lately?': '你最近在忙什么？',
        'How\'s your day going?': '你今天过得怎么样？',
        'Do you have any hobbies?': '你有什么爱好吗？',
        'What do you like to do in your free time?': '你空闲时间喜欢做什么？',
        'Nice to meet you!': '很高兴认识你！',
        'What\'s your name?': '你叫什么名字？',
        'Where are you from?': '你来自哪里？',
        'What\'s your pricing strategy?': '你们的定价策略是什么？',
        'Can we negotiate the price?': '我们可以协商价格吗？',
        'What\'s included in the cost?': '费用包括什么？',
        'What are the payment terms?': '付款条款是什么？',
        'Can you explain the contract conditions?': '你能解释一下合同条款吗？',
        'Are there any special terms we need to discuss?': '有什么特别条款需要讨论吗？',
        'Let\'s discuss the project timeline.': '让我们讨论项目时间表。',
        'What are your deliverables?': '你们的交付物是什么？',
        'How can we ensure quality control?': '我们如何确保质量控制？',
        'Tell me more about that.': '告诉我更多关于那个的信息。',
        'I understand. What else can you share?': '我理解。你还能分享什么？',
        'That\'s interesting!': '那很有趣！'
      }
      resolve({ translatedText: translations[text] || '这是翻译结果' })
    }, 500)
  })
}

// 模拟AI反馈API
const mockGetFeedback = (userInput: string, scenarioContext: string): Promise<FeedbackResponse> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const feedback = '你的回答很好！继续保持。' 
      const hints = [
        '你可以尝试使用更正式的表达方式',
        '考虑添加更多细节来丰富你的回答',
        '注意时态的正确使用'
      ]
      resolve({ feedback, hints })
    }, 800)
  })
}

// 模拟AI对话API
const mockGetAIResponse = (userInput: string, scenarioId: string, conversationHistory: Message[]): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const responses: Record<string, string[]> = {
        '1': [
          'That sounds like a great destination! What activities are you interested in?',
          'How long will you be staying there?',
          'Would you like information about local transportation options?',
          'There are many beautiful sights to see in that area.'
        ],
        '2': [
          'I had a wonderful weekend, thanks for asking! How about you?',
          'Did you get any work done over the weekend?',
          'Any exciting plans for this week?',
          'The project deadline is coming up soon, have you made progress?'
        ],
        '3': [
          'What section of the exam are you most concerned about?',
          'Have you been practicing your listening skills?',
          'Vocabulary is very important for the exam, how is your word bank?',
          'Let\'s practice some sample questions together.'
        ],
        '4': [
          'I\'m doing well, thanks! What brings you here today?',
          'It\'s a beautiful day outside, isn\'t it?',
          'Do you have any interesting hobbies?',
          'What kind of music do you like?'
        ],
        '5': [
          'I\'m open to discussing all aspects of the agreement.',
          'What are your main concerns about the current terms?',
          'We need to find a solution that works for both parties.',
          'Let\'s go through each point one by one.'
        ]
      }
      const possibleResponses = responses[scenarioId] || ['That\'s interesting. Tell me more about it.']
      const randomResponse = possibleResponses[Math.floor(Math.random() * possibleResponses.length)]
      resolve(randomResponse)
    }, 1000)
  })
}

// 模拟获取示例回答API
const mockGetExampleResponses = (aiMessage: string, scenarioId: string): Promise<string[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const examplesMap: Record<string, Record<string, string[]>> = {
        '1': {
          'That sounds like a great destination! What activities are you interested in?': [
            'I\'m interested in visiting historical sites and trying local food.',
            'I\'d like to go hiking and explore nature.',
            'Shopping and sightseeing are my main interests.'
          ],
          'How long will you be staying there?': [
            'I\'ll be staying for about a week.',
            'Just three days, so I need to plan carefully.',
            'Two weeks, plenty of time to explore.'
          ],
          'Would you like information about local transportation options?': [
            'Yes, please! What\'s the best way to get around?',
            'Do you recommend public transportation or taxis?',
            'Is it easy to rent a car there?'
          ],
          'There are many beautiful sights to see in that area.': [
            'That\'s great! What are the must-see attractions?',
            'Can you recommend the top 3 places to visit?',
            'Are there any hidden gems off the tourist trail?'
          ]
        },
        '2': {
          'I had a wonderful weekend, thanks for asking! How about you?': [
            'My weekend was relaxing, I stayed home and read a book.',
            'I had a busy weekend with family activities.',
            'It was great! I went hiking with friends.'
          ],
          'Did you get any work done over the weekend?': [
            'Yes, I caught up on some reports.',
            'No, I took a complete break from work.',
            'A little bit, but I tried to balance work and rest.'
          ],
          'Any exciting plans for this week?': [
            'Not really, just the usual work routine.',
            'Yes! I have an important meeting on Wednesday.',
            'I\'m planning to finish the project we started last week.'
          ],
          'The project deadline is coming up soon, have you made progress?': [
            'Yes, I\'m on track to finish on time.',
            'I\'ve made some progress, but still have work to do.',
            'I\'m a bit behind, but I\'ll catch up this week.'
          ]
        },
        '3': {
          'What section of the exam are you most concerned about?': [
            'I\'m worried about the listening section.',
            'Reading comprehension is my biggest challenge.',
            'I need to improve my writing skills.'
          ],
          'Have you been practicing your listening skills?': [
            'Yes, I listen to podcasts every day.',
            'I try to practice for 30 minutes daily.',
            'Not as much as I should, I need to practice more.'
          ],
          'Vocabulary is very important for the exam, how is your word bank?': [
            'I\'m working on expanding my vocabulary every day.',
            'I have a good foundation, but need more specialized terms.',
            'Vocabulary is my strong point.'
          ],
          'Let\'s practice some sample questions together.': [
            'That would be very helpful!',
            'Great idea, let\'s start with listening practice.',
            'I\'d prefer to focus on writing first.'
          ]
        },
        '4': {
          'I\'m doing well, thanks! What brings you here today?': [
            'I\'m just exploring the area.',
            'I\'m here to meet a friend.',
            'I heard this place has great coffee.'
          ],
          'It\'s a beautiful day outside, isn\'t it?': [
            'Yes, perfect weather for a walk!',
            'Absolutely, I love sunny days like this.',
            'It is, but a bit too hot for me.'
          ],
          'Do you have any interesting hobbies?': [
            'I enjoy reading and hiking.',
            'I love playing guitar and cooking.',
            'Photography is my main hobby.'
          ],
          'What kind of music do you like?': [
            'I enjoy pop and rock music.',
            'Classical music is my favorite.',
            'I listen to a variety of genres.'
          ]
        },
        '5': {
          'I\'m open to discussing all aspects of the agreement.': [
            'Great, let\'s start with the payment terms.',
            'I\'d like to focus on the delivery timeline first.',
            'Let\'s review each section carefully.'
          ],
          'What are your main concerns about the current terms?': [
            'I\'m concerned about the payment schedule.',
            'The warranty period seems too short.',
            'I have questions about the termination clause.'
          ],
          'We need to find a solution that works for both parties.': [
            'Agreed, let\'s work together to find common ground.',
            'I\'m willing to compromise on some points.',
            'Let\'s brainstorm possible solutions.'
          ],
          'Let\'s go through each point one by one.': [
            'That\'s a systematic approach, I like it.',
            'Perfect, let\'s start from the beginning.',
            'Good idea, let\'s take our time and be thorough.'
          ]
        }
      }
      
      const scenarioExamples = examplesMap[scenarioId] || {}
      const examples = scenarioExamples[aiMessage] || [
        'That\'s interesting!',
        'I see what you mean.',
        'Could you tell me more about that?'
      ]
      
      resolve(examples)
    }, 500)
  })
}


export default function ConversationPractice() {
  const [selectedScenario, setSelectedScenario] = useState<string>('')
  const [currentScenario, setCurrentScenario] = useState<Scenario | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputText, setInputText] = useState('')
  const [isRecording, setIsRecording] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [showTranslations, setShowTranslations] = useState(true)
  const [showHints, setShowHints] = useState(true)
  const [inputSuggestions, setInputSuggestions] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [lastInputTime, setLastInputTime] = useState(Date.now())
  const [aiProactiveHint, setAiProactiveHint] = useState<string>('')

  // 场景选择时初始化对话
  useEffect(() => {
    if (selectedScenario) {
      const scenario = scenarios.find(s => s.id === selectedScenario)
      if (scenario) {
        setCurrentScenario(scenario)
        // 初始化AI第一条消息
        const initialMessage: Message = {
          id: Date.now().toString(),
          role: 'ai',
          content: scenario.initialMessage,
          timestamp: new Date()
        }
        setMessages([initialMessage])
        // 翻译初始消息
        translateMessage(initialMessage)
        // 生成AI主动提示
        setTimeout(() => {
          generateAIProactiveHint()
        }, 1000)
        // 生成默认AI建议（无需用户输入）
        setTimeout(() => {
          generateDefaultSuggestions()
        }, 1500)
      }
    }
  }, [selectedScenario])

  // 翻译消息
  const translateMessage = async (message: Message) => {
    try {
      const response = await mockTranslate(message.content)
      setMessages(prev => prev.map(msg => 
        msg.id === message.id ? { ...msg, translation: response.translatedText } : msg
      ))
    } catch (error) {
      console.error('Translation error:', error)
    }
  }

  // 处理场景选择
  const handleScenarioSelect = (scenarioId: string) => {
    setSelectedScenario(scenarioId)
    setMessages([])
  }

  // 处理发送消息
  const handleSendMessage = async () => {
    if (!inputText.trim() || !currentScenario) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputText,
      timestamp: new Date()
    }

    setMessages([...messages, userMessage])
    setInputText('')
    setIsTyping(true)

    // 翻译用户消息
    translateMessage(userMessage)

    try {
      // 获取AI反馈和提示
      const feedbackResponse = await mockGetFeedback(inputText, currentScenario.context)
      
      // 更新用户消息，添加反馈和提示
      setMessages(prev => prev.map(msg => 
        msg.id === userMessage.id ? { ...msg, feedback: feedbackResponse.feedback, hints: feedbackResponse.hints } : msg
      ))

      // 获取AI回复
      const aiResponse = await mockGetAIResponse(inputText, selectedScenario, messages)
      
      // 获取示例回答
      const examples = await mockGetExampleResponses(aiResponse, selectedScenario)
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'ai',
        content: aiResponse,
        timestamp: new Date(),
        examples: examples
      }

      setMessages(prev => [...prev, aiMessage])
      setIsTyping(false)

      // 翻译AI回复
      translateMessage(aiMessage)
    } catch (error) {
      console.error('AI response error:', error)
      setIsTyping(false)
    }
  }

  // 处理语音输入
  const handleVoiceInput = () => {
    setIsRecording(!isRecording)
    // 这里可以集成语音识别API
  }

  // 处理输入变化，生成实时提示
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInputText(value)
    setLastInputTime(Date.now())
    
    // 防抖处理
    if (value.trim().length > 0) {
      setShowSuggestions(true)
      
      // 模拟实时提示生成
      setTimeout(() => {
        if (Date.now() - lastInputTime > 300) {
          generateInputSuggestions(value)
        }
      }, 300)
    }
    // 移除else分支，保持建议显示
  }

  // 生成输入提示
  const generateInputSuggestions = (input: string) => {
    if (!currentScenario) return
    
    // 基于当前场景和输入内容生成提示
    const scenarioId = selectedScenario
    let suggestions: string[] = []
    
    // 根据场景生成不同的提示
    switch (scenarioId) {
      case '1': // 旅游
        if (input.toLowerCase().includes('where') || input.toLowerCase().includes('go')) {
          suggestions = [
            'I want to go to Paris.',
            'Can you recommend some popular tourist attractions?',
            'What are the must-see places in this city?'
          ]
        } else if (input.toLowerCase().includes('how') || input.toLowerCase().includes('transport')) {
          suggestions = [
            'How do I get around the city?',
            'Is public transportation reliable here?',
            'What\'s the best way to travel between attractions?'
          ]
        } else {
          suggestions = [
            'Tell me about local food options.',
            'What\'s the weather like this time of year?',
            'Are there any special events happening?'
          ]
        }
        break
      case '2': // 职场
        if (input.toLowerCase().includes('work') || input.toLowerCase().includes('project')) {
          suggestions = [
            'How\'s the project coming along?',
            'I need help with my work task.',
            'What\'s the deadline for this project?'
          ]
        } else if (input.toLowerCase().includes('meeting') || input.toLowerCase().includes('schedule')) {
          suggestions = [
            'When is our next meeting?',
            'Can you help me schedule a meeting?',
            'What\'s on the agenda for today?'
          ]
        } else {
          suggestions = [
            'How was your weekend?',
            'Do you have any plans after work?',
            'What\'s new in the office?'
          ]
        }
        break
      case '3': // 考级
        if (input.toLowerCase().includes('exam') || input.toLowerCase().includes('test')) {
          suggestions = [
            'How can I prepare for the listening section?',
            'What\'s the best way to study vocabulary?',
            'Can you give me some writing practice?'
          ]
        } else if (input.toLowerCase().includes('practice') || input.toLowerCase().includes('study')) {
          suggestions = [
            'Let\'s practice some reading comprehension.',
            'I need help with grammar exercises.',
            'Can we review my previous answers?'
          ]
        } else {
          suggestions = [
            'What\'s the passing score for this exam?',
            'How long does the exam take?',
            'What topics are covered in the test?'
          ]
        }
        break
      case '4': // 日常交流
        if (input.toLowerCase().includes('how') || input.toLowerCase().includes('you')) {
          suggestions = [
            'How are you doing today?',
            'What have you been up to lately?',
            'How\'s your day going?'
          ]
        } else if (input.toLowerCase().includes('like') || input.toLowerCase().includes('hobby')) {
          suggestions = [
            'What kind of music do you like?',
            'Do you have any hobbies?',
            'What do you like to do in your free time?'
          ]
        } else {
          suggestions = [
            'Nice to meet you!',
            'What\'s your name?',
            'Where are you from?'
          ]
        }
        break
      case '5': // 商务谈判
        if (input.toLowerCase().includes('price') || input.toLowerCase().includes('cost')) {
          suggestions = [
            'What\'s your pricing strategy?',
            'Can we negotiate the price?',
            'What\'s included in the cost?'
          ]
        } else if (input.toLowerCase().includes('term') || input.toLowerCase().includes('condition')) {
          suggestions = [
            'What are the payment terms?',
            'Can you explain the contract conditions?',
            'Are there any special terms we need to discuss?'
          ]
        } else {
          suggestions = [
            'Let\'s discuss the project timeline.',
            'What are your deliverables?',
            'How can we ensure quality control?'
          ]
        }
        break
      default:
        suggestions = [
          'Tell me more about that.',
          'I understand. What else can you share?',
          'That\'s interesting!'
        ]
    }
    
    setInputSuggestions(suggestions)
  }

  // 处理选择提示
  const handleSelectSuggestion = (suggestion: string) => {
    setInputText(suggestion)
    setShowSuggestions(false)
    setInputSuggestions([])
  }

  // 生成AI主动提示
  const generateAIProactiveHint = () => {
    if (!currentScenario) return
    
    const hints = [
      'Feel free to ask me anything about this topic!',
      'You can practice different expressions here.',
      'Try to use more specific details in your response.',
      'Don\'t worry about making mistakes - practice makes perfect!',
      'You can ask for clarification if you don\'t understand something.'
    ]
    
    const randomHint = hints[Math.floor(Math.random() * hints.length)]
    setAiProactiveHint(randomHint)
    
    // 3秒后自动清除提示
    setTimeout(() => {
      setAiProactiveHint('')
    }, 3000)
  }

  // 生成默认AI建议（无需用户输入）
  const generateDefaultSuggestions = () => {
    if (!currentScenario) return
    
    const scenarioId = selectedScenario
    let suggestions: string[] = []
    
    // 根据场景生成默认建议
    switch (scenarioId) {
      case '1': // 旅游
        suggestions = [
          'I want to go to Paris.',
          'Can you recommend some popular tourist attractions?',
          'What are the must-see places in this city?'
        ]
        break
      case '2': // 职场
        suggestions = [
          'How\'s the project coming along?',
          'I need help with my work task.',
          'What\'s the deadline for this project?'
        ]
        break
      case '3': // 考级
        suggestions = [
          'How can I prepare for the listening section?',
          'What\'s the best way to study vocabulary?',
          'Can you give me some writing practice?'
        ]
        break
      case '4': // 日常交流
        suggestions = [
          'How are you doing today?',
          'What have you been up to lately?',
          'How\'s your day going?'
        ]
        break
      case '5': // 商务谈判
        suggestions = [
          'What\'s your pricing strategy?',
          'Can we negotiate the price?',
          'What\'s included in the cost?'
        ]
        break
      default:
        suggestions = [
          'Tell me more about that.',
          'I understand. What else can you share?',
          'That\'s interesting!'
        ]
    }
    
    setInputSuggestions(suggestions)
    setShowSuggestions(true)
  }

  // 获取英文提示的中文翻译
  const getChineseTranslation = (suggestion: string): string => {
    const translations: Record<string, string> = {
      // 旅游场景
      'I want to go to Paris.': '我想去巴黎。',
      'Can you recommend some popular tourist attractions?': '你能推荐一些热门旅游景点吗？',
      'What are the must-see places in this city?': '这个城市有哪些必去的地方？',
      'How do I get around the city?': '我怎么在城市里出行？',
      'Is public transportation reliable here?': '这里的公共交通可靠吗？',
      'What\'s the best way to travel between attractions?': '景点之间最好的交通方式是什么？',
      'Tell me about local food options.': '告诉我当地的美食选择。',
      'What\'s the weather like this time of year?': '这个时候的天气怎么样？',
      'Are there any special events happening?': '有什么特别的活动吗？',
      
      // 职场场景
      'How\'s the project coming along?': '项目进展如何？',
      'I need help with my work task.': '我需要工作任务的帮助。',
      'What\'s the deadline for this project?': '这个项目的截止日期是什么时候？',
      'When is our next meeting?': '我们下次会议是什么时候？',
      'Can you help me schedule a meeting?': '你能帮我安排会议吗？',
      'What\'s on the agenda for today?': '今天的议程是什么？',
      'How was your weekend?': '你周末过得怎么样？',
      'Do you have any plans after work?': '下班后你有什么计划吗？',
      'What\'s new in the office?': '办公室有什么新鲜事吗？',
      
      // 考级场景
      'How can I prepare for the listening section?': '我如何准备听力部分？',
      'What\'s the best way to study vocabulary?': '学习词汇的最佳方法是什么？',
      'Can you give me some writing practice?': '你能给我一些写作练习吗？',
      'Let\'s practice some reading comprehension.': '让我们练习一些阅读理解。',
      'I need help with grammar exercises.': '我需要语法练习的帮助。',
      'Can we review my previous answers?': '我们可以复习我之前的答案吗？',
      'What\'s the passing score for this exam?': '这个考试的及格分数是多少？',
      'How long does the exam take?': '考试需要多长时间？',
      'What topics are covered in the test?': '考试涵盖哪些主题？',
      
      // 日常交流
      'How are you doing today?': '你今天过得怎么样？',
      'What have you been up to lately?': '你最近在忙什么？',
      'How\'s your day going?': '你今天过得怎么样？',
      'What kind of music do you like?': '你喜欢什么类型的音乐？',
      'Do you have any hobbies?': '你有什么爱好吗？',
      'What do you like to do in your free time?': '你空闲时间喜欢做什么？',
      'Nice to meet you!': '很高兴认识你！',
      'What\'s your name?': '你叫什么名字？',
      'Where are you from?': '你来自哪里？',
      
      // 商务谈判
      'What\'s your pricing strategy?': '你们的定价策略是什么？',
      'Can we negotiate the price?': '我们可以协商价格吗？',
      'What\'s included in the cost?': '费用包括什么？',
      'What are the payment terms?': '付款条款是什么？',
      'Can you explain the contract conditions?': '你能解释一下合同条款吗？',
      'Are there any special terms we need to discuss?': '有什么特别条款需要讨论吗？',
      'Let\'s discuss the project timeline.': '让我们讨论项目时间表。',
      'What are your deliverables?': '你们的交付物是什么？',
      'How can we ensure quality control?': '我们如何确保质量控制？',
      
      // 通用提示
      'Tell me more about that.': '告诉我更多关于那个的信息。',
      'I understand. What else can you share?': '我理解。你还能分享什么？',
      'That\'s interesting!': '那很有趣！'
    }
    
    return translations[suggestion] || '点击使用此建议'
  }


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <header className="text-center mb-12">
          <h1 className="text-3xl font-bold text-primary mb-4">沉浸式对话练习</h1>
          <p className="text-gray-600">选择场景开始练习，支持语音和文字输入</p>
        </header>

        {/* 场景选择 */}
        {!selectedScenario && (
          <div className="card mb-8">
            <h2 className="text-xl font-bold mb-4">选择练习场景</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {scenarios.map((scenario) => (
                <div
                  key={scenario.id}
                  className="border rounded-lg p-4 hover:border-primary cursor-pointer transition-colors"
                  onClick={() => handleScenarioSelect(scenario.id)}
                >
                  <h3 className="font-bold">{scenario.name}</h3>
                  <p className="text-sm text-gray-600">{scenario.category} | {scenario.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 对话界面 */}
        {selectedScenario && currentScenario && (
          <div className="card">
            {/* 场景信息和控制 */}
            <div className="mb-4 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold">{currentScenario.name}</h2>
                <p className="text-sm text-gray-600">{currentScenario.description}</p>
              </div>
              <div className="flex gap-2">
                <button
                  className={`px-3 py-1 text-sm rounded ${showTranslations ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700'}`}
                  onClick={() => setShowTranslations(!showTranslations)}
                >
                  {showTranslations ? '隐藏翻译' : '显示翻译'}
                </button>
                <button
                  className={`px-3 py-1 text-sm rounded ${showHints ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700'}`}
                  onClick={() => setShowHints(!showHints)}
                >
                  {showHints ? '隐藏提示' : '显示提示'}
                </button>
              </div>
            </div>

            {/* 对话历史 */}
            <div className="h-96 overflow-y-auto mb-6 border rounded-lg p-4 bg-gray-50">
              {messages.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  开始对话吧！
                </div>
              ) : (
                messages.map((message) => (
                  <div
                    key={message.id}
                    className={`mb-6 ${message.role === 'user' ? 'text-right' : 'text-left'}`}
                  >
                    {/* 用户消息 */}
                    {message.role === 'user' && (
                      <div>
                        <div className="inline-block max-w-[80%] p-3 rounded-lg bg-primary text-white">
                          {message.content}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          我 {message.timestamp.toLocaleTimeString()}
                        </div>
                        {/* 用户消息翻译 */}
                        {showTranslations && message.translation && (
                          <div className="mt-2 inline-block max-w-[80%]">
                            <div className="p-2 bg-blue-50 border border-blue-200 rounded-lg">
                              <p className="text-sm text-blue-700">{message.translation}</p>
                            </div>
                          </div>
                        )}
                        {/* 用户反馈和提示 */}
                        {showHints && message.feedback && (
                          <div className="mt-2 inline-block max-w-[80%] text-left">
                            <div className="p-2 bg-green-50 border border-green-200 rounded-lg">
                              <p className="text-sm text-green-700 font-medium">{message.feedback}</p>
                              {message.hints && message.hints.length > 0 && (
                                <div className="mt-2">
                                  <p className="text-xs text-green-600 font-medium mb-1">建议：</p>
                                  <ul className="text-xs text-green-600 list-disc list-inside space-y-1">
                                    {message.hints.map((hint, index) => (
                                      <li key={index}>{hint}</li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* AI消息 */}
                    {message.role === 'ai' && (
                      <div>
                        <div className="inline-block max-w-[80%] p-3 rounded-lg bg-gray-200 text-gray-800">
                          {message.content}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          AI {message.timestamp.toLocaleTimeString()}
                        </div>
                        {/* AI消息翻译 */}
                        {showTranslations && message.translation && (
                          <div className="mt-2 inline-block max-w-[80%]">
                            <div className="p-2 bg-blue-50 border border-blue-200 rounded-lg">
                              <p className="text-sm text-blue-700">{message.translation}</p>
                            </div>
                          </div>
                        )}
                        {/* 示例回答 */}
                        {message.examples && message.examples.length > 0 && (
                          <div className="mt-3 inline-block max-w-[80%]">
                            <div className="text-xs text-gray-600 font-medium mb-2">示例回答：</div>
                            <div className="flex flex-wrap gap-2">
                              {message.examples.map((example, index) => (
                                <button
                                  key={index}
                                  className="px-3 py-1 text-xs bg-purple-50 border border-purple-200 rounded-full text-purple-700 hover:bg-purple-100 cursor-pointer transition-colors"
                                  onClick={() => setInputText(example)}
                                >
                                  {example}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))
              )}
              {/* 打字指示器 */}
              {isTyping && (
                <div className="text-left mb-4">
                  <div className="inline-block max-w-[80%] p-3 rounded-lg bg-gray-200 text-gray-800">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* AI主动提示 */}
            {aiProactiveHint && (
              <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg animate-fade-in">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-2">
                    <p className="text-sm text-yellow-700">{aiProactiveHint}</p>
                  </div>
                </div>
              </div>
            )}

            {/* 输入提示（输入框外） */}
            {showSuggestions && inputSuggestions.length > 0 && (
              <div className="mb-4 p-3 bg-white border border-gray-200 rounded-lg shadow-sm">
                <div className="mb-2">
                  <p className="text-sm text-gray-600 font-medium">AI建议：</p>
                </div>
                <div className="space-y-2">
                  {inputSuggestions.map((suggestion, index) => (
                    <div key={index} className="p-2 border border-gray-100 rounded-lg hover:bg-gray-50">
                      <button
                        className="w-full text-left text-sm text-gray-800 hover:text-blue-600 transition-colors"
                        onClick={() => handleSelectSuggestion(suggestion)}
                      >
                        {suggestion}
                      </button>
                      <div className="mt-1 text-xs text-gray-500">
                        {getChineseTranslation(suggestion)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 输入区域 */}
            <div>
              <div className="flex gap-2">
                <input
                  type="text"
                  className="input flex-1"
                  value={inputText}
                  onChange={handleInputChange}
                  placeholder="输入消息..."
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <button
                  className="btn-primary"
                  onClick={handleVoiceInput}
                >
                  {isRecording ? '停止录音' : '语音输入'}
                </button>
                <button
                  className="btn-primary"
                  onClick={handleSendMessage}
                  disabled={isTyping}
                >
                  发送
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}