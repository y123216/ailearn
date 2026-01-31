'use client'

import { useState, useRef } from 'react'

interface UploadedFile {
  id: string
  name: string
  type: string
  size: number
  uploadDate: string
  status: 'uploading' | 'processing' | 'completed' | 'failed'
  progress: number
  questionsCount?: number
  errorMessage?: string
}

interface ParsedQuestion {
  id: string
  type: string
  question: string
  options?: string[]
  correctAnswer?: string
  difficulty: string
  tags: string[]
}

const mockUploadedFiles: UploadedFile[] = [
  {
    id: '1',
    name: 'JavaScript习题集.pdf',
    type: 'application/pdf',
    size: 2048000,
    uploadDate: '2026-01-24',
    status: 'completed',
    progress: 100,
    questionsCount: 25
  },
  {
    id: '2',
    name: 'React核心概念练习.xlsx',
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    size: 1536000,
    uploadDate: '2026-01-23',
    status: 'completed',
    progress: 100,
    questionsCount: 30
  }
]

const mockParsedQuestions: ParsedQuestion[] = [
  {
    id: 'q1',
    type: 'multiple-choice',
    question: '下列哪个是React的核心概念？',
    options: ['组件', '指令', '模板', '控制器'],
    correctAnswer: '组件',
    difficulty: 'easy',
    tags: ['React', '核心概念', '组件']
  },
  {
    id: 'q2',
    type: 'true-false',
    question: 'React中，state是不可变的。',
    correctAnswer: '正确',
    difficulty: 'medium',
    tags: ['React', 'state', '不可变性']
  },
  {
    id: 'q3',
    type: 'fill-blank',
    question: 'React中，______用于在函数组件中添加状态。',
    correctAnswer: 'useState',
    difficulty: 'easy',
    tags: ['React', 'Hooks', 'useState']
  }
]

export default function UploadExercise() {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>(mockUploadedFiles)
  const [selectedFile, setSelectedFile] = useState<UploadedFile | null>(null)
  const [parsedQuestions, setParsedQuestions] = useState<ParsedQuestion[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      processFiles(Array.from(files))
    }
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
    const files = e.dataTransfer.files
    if (files && files.length > 0) {
      processFiles(Array.from(files))
    }
  }

  const processFiles = (files: File[]) => {
    files.forEach((file) => {
      const newFile: UploadedFile = {
        id: `file-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        name: file.name,
        type: file.type,
        size: file.size,
        uploadDate: new Date().toISOString().split('T')[0],
        status: 'uploading',
        progress: 0
      }

      setUploadedFiles(prev => [newFile, ...prev])

      // 模拟上传进度
      let progress = 0
      const interval = setInterval(() => {
        progress += 10
        if (progress <= 100) {
          setUploadedFiles(prev => prev.map(f => 
            f.id === newFile.id ? { ...f, progress } : f
          ))
        }
        if (progress >= 50) {
          setUploadedFiles(prev => prev.map(f => 
            f.id === newFile.id ? { ...f, status: 'processing' } : f
          ))
        }
        if (progress >= 100) {
          clearInterval(interval)
          // 模拟处理完成
          setTimeout(() => {
            setUploadedFiles(prev => prev.map(f => 
              f.id === newFile.id ? { ...f, status: 'completed', questionsCount: Math.floor(Math.random() * 20) + 10 } : f
            ))
          }, 2000)
        }
      }, 300)
    })
  }

  const handleFileSelect = (file: UploadedFile) => {
    setSelectedFile(file)
    if (file.status === 'completed') {
      // 模拟文件内容解析过程
      setShowPreview(false)
      
      // 显示解析中状态
      setTimeout(() => {
        // 基于文件名、类型和模拟内容智能生成解析题目
        const questionCount = file.questionsCount || 10
        const fileName = file.name.toLowerCase()
        const fileType = file.type
        
        // 从文件名中提取主题关键词
        const extractTopics = (name: string): string[] => {
          const topics: string[] = []
          const topicKeywords = {
            'javascript': ['JavaScript', 'ES6', '异步编程', '闭包', '原型链', '数据类型', '函数', '对象', '数组'],
            'js': ['JavaScript', 'ES6', '异步编程', '闭包', '原型链', '数据类型', '函数', '对象', '数组'],
            'react': ['React', '组件', 'Hooks', '状态管理', 'JSX', '生命周期', '虚拟DOM', 'props', 'state'],
            'vue': ['Vue', '组件', '指令', '生命周期', 'computed', 'watch', 'v-model', '路由'],
            'angular': ['Angular', '组件', '服务', '依赖注入', '模块', '管道', '指令', '表单'],
            'html': ['HTML', '标签', '语义化', 'DOM', '表单', '表格', '链接', '图片', 'meta'],
            'css': ['CSS', '样式', '布局', 'Flexbox', 'Grid', '选择器', '盒模型', '响应式', '动画'],
            'typescript': ['TypeScript', '类型', '接口', '泛型', '装饰器', '类型推断', '联合类型', '交叉类型'],
            'node': ['Node.js', '模块', 'fs', 'http', 'express', '中间件', '路由', '数据库', 'API'],
            'express': ['Express', '中间件', '路由', '请求', '响应', '错误处理', '模板引擎'],
            'mongodb': ['MongoDB', '数据库', '集合', '文档', '查询', '索引', '聚合', 'Schema'],
            'mysql': ['MySQL', '数据库', '表', '查询', '索引', '事务', '存储过程', '视图'],
            'sql': ['SQL', '数据库', '表', '查询', '索引', '事务', '存储过程', '视图'],
            'git': ['Git', '版本控制', '分支', '提交', '合并', '冲突', '远程仓库', '暂存'],
            'webpack': ['Webpack', '打包', 'loader', 'plugin', '配置', '优化', '模块', '依赖'],
            'vite': ['Vite', '打包', '开发服务器', '配置', '插件', '热更新', '模块'],
            'next': ['Next.js', 'SSR', '路由', 'API路由', '组件', '页面', 'getServerSideProps'],
            'nuxt': ['Nuxt.js', 'SSR', '路由', '中间件', '组件', '页面', 'asyncData'],
            '算法': ['算法', '数据结构', '排序', '搜索', '动态规划', '递归', '图', '树'],
            '数据结构': ['数据结构', '数组', '链表', '栈', '队列', '树', '图', '哈希表'],
            '网络': ['网络', 'HTTP', 'HTTPS', 'TCP', 'IP', 'DNS', 'WebSocket', 'RESTful'],
            '安全': ['安全', 'XSS', 'CSRF', '加密', '认证', '授权', 'HTTPS', 'CORS'],
            '性能': ['性能', '优化', '缓存', '懒加载', '压缩', 'CDN', '渲染', '加载速度'],
            '测试': ['测试', '单元测试', '集成测试', '端到端测试', 'Jest', 'Cypress', '测试覆盖率'],
            '设计模式': ['设计模式', '单例', '工厂', '观察者', '策略', '适配器', '装饰器']
          }
          
          for (const [keyword, relatedTopics] of Object.entries(topicKeywords)) {
            if (name.includes(keyword)) {
              topics.push(...relatedTopics)
            }
          }
          
          return topics.length > 0 ? topics : ['前端开发', '编程基础', '代码规范', '最佳实践']
        }
        
        const topics = extractTopics(fileName)
        
        // 根据文件类型和主题生成更有针对性的题目
        const generateQuestions = (count: number, topics: string[], fileType: string) => {
          const questions: ParsedQuestion[] = []
          const questionTypes = ['multiple-choice', 'true-false', 'fill-blank']
          
          // 基于文件类型和主题生成具体的题目模板
          const generateQuestionContent = (topic: string, type: string) => {
            // 选择题模板
            if (type === 'multiple-choice') {
              const questionTemplates = {
                'JavaScript': [
                  `关于${topic}的选择题：下列哪个选项是正确的${topic}语法？`,
                  `关于${topic}的选择题：下列哪个${topic}方法可以实现${topic}的功能？`,
                  `关于${topic}的选择题：在${topic}中，下列哪个选项的说法是正确的？`
                ],
                'React': [
                  `关于${topic}的选择题：下列哪个是正确的${topic}使用方式？`,
                  `关于${topic}的选择题：在React中，${topic}的作用是什么？`,
                  `关于${topic}的选择题：下列哪个选项是${topic}的正确语法？`
                ],
                'CSS': [
                  `关于${topic}的选择题：下列哪个CSS属性可以实现${topic}效果？`,
                  `关于${topic}的选择题：在CSS中，${topic}的正确用法是什么？`,
                  `关于${topic}的选择题：下列哪个选项是${topic}的正确语法？`
                ],
                'HTML': [
                  `关于${topic}的选择题：下列哪个HTML标签用于${topic}？`,
                  `关于${topic}的选择题：在HTML中，${topic}的正确属性是什么？`,
                  `关于${topic}的选择题：下列哪个选项是${topic}的正确用法？`
                ],
                'TypeScript': [
                  `关于${topic}的选择题：在TypeScript中，${topic}的正确定义方式是什么？`,
                  `关于${topic}的选择题：下列哪个类型定义适用于${topic}？`,
                  `关于${topic}的选择题：在TypeScript中，${topic}的作用是什么？`
                ]
              }
              
              const templates = questionTemplates[topic as keyof typeof questionTemplates] || questionTemplates['JavaScript'] || [
                `关于${topic}的选择题：下列哪个选项是正确的？`,
                `关于${topic}的选择题：下列哪个说法是正确的？`,
                `关于${topic}的选择题：下列哪个选项符合${topic}的规范？`
              ]
              
              return templates[Math.floor(Math.random() * templates.length)]
            }
            
            // 判断题模板
            if (type === 'true-false') {
              const questionTemplates = {
                'JavaScript': [
                  `关于${topic}的判断题：在JavaScript中，${topic}的使用方式是正确的。`,
                  `关于${topic}的判断题：${topic}是JavaScript的核心概念。`,
                  `关于${topic}的判断题：${topic}可以提高JavaScript代码的性能。`
                ],
                'React': [
                  `关于${topic}的判断题：在React中，${topic}是必须的。`,
                  `关于${topic}的判断题：${topic}可以解决React中的状态管理问题。`,
                  `关于${topic}的判断题：${topic}是React 16.8+的新特性。`
                ],
                'CSS': [
                  `关于${topic}的判断题：${topic}是CSS3的新特性。`,
                  `关于${topic}的判断题：${topic}可以实现响应式布局。`,
                  `关于${topic}的判断题：${topic}的浏览器兼容性很好。`
                ],
                'HTML': [
                  `关于${topic}的判断题：${topic}是HTML5的新标签。`,
                  `关于${topic}的判断题：${topic}可以提高页面的语义化。`,
                  `关于${topic}的判断题：${topic}的使用有利于SEO。`
                ]
              }
              
              const templates = questionTemplates[topic as keyof typeof questionTemplates] || questionTemplates['JavaScript'] || [
                `关于${topic}的判断题：${topic}是一种重要的编程概念。`,
                `关于${topic}的判断题：${topic}可以提高代码的可维护性。`,
                `关于${topic}的判断题：${topic}的学习难度较高。`
              ]
              
              return templates[Math.floor(Math.random() * templates.length)]
            }
            
            // 填空题模板
            if (type === 'fill-blank') {
              const questionTemplates = {
                'JavaScript': [
                  `关于${topic}的填空题：在JavaScript中，${topic}用于______。`,
                  `关于${topic}的填空题：${topic}的语法格式是______。`,
                  `关于${topic}的填空题：使用${topic}可以实现______功能。`
                ],
                'React': [
                  `关于${topic}的填空题：在React中，${topic}用于______。`,
                  `关于${topic}的填空题：${topic}的正确导入方式是______。`,
                  `关于${topic}的填空题：使用${topic}可以解决______问题。`
                ],
                'CSS': [
                  `关于${topic}的填空题：在CSS中，${topic}属性用于______。`,
                  `关于${topic}的填空题：${topic}的默认值是______。`,
                  `关于${topic}的填空题：使用${topic}可以实现______效果。`
                ],
                'HTML': [
                  `关于${topic}的填空题：在HTML中，${topic}标签用于______。`,
                  `关于${topic}的填空题：${topic}标签的必需属性是______。`,
                  `关于${topic}的填空题：使用${topic}可以______。`
                ]
              }
              
              const templates = questionTemplates[topic as keyof typeof questionTemplates] || questionTemplates['JavaScript'] || [
                `关于${topic}的填空题：${topic}是______的重要概念。`,
                `关于${topic}的填空题：学习${topic}需要掌握______。`,
                `关于${topic}的填空题：${topic}的应用场景包括______。`
              ]
              
              return templates[Math.floor(Math.random() * templates.length)]
            }
            
            return `关于${topic}的题目：请回答下列问题。`
          }
          
          // 生成选项
          const generateOptions = (topic: string, correctAnswer: string) => {
            const optionCount = 4
            const options: string[] = [correctAnswer]
            
            // 生成干扰选项
            const distractors = {
              'JavaScript': ['选项 B', '选项 C', '选项 D', '错误选项', '不正确的语法', '其他方法'],
              'React': ['其他Hook', '类组件', '旧版API', '选项 B', '选项 C', '选项 D'],
              'CSS': ['其他属性', '错误值', '废弃语法', '选项 B', '选项 C', '选项 D'],
              'HTML': ['其他标签', '错误属性', '过时语法', '选项 B', '选项 C', '选项 D']
            }
            
            const topicDistractors = distractors[topic as keyof typeof distractors] || distractors['JavaScript']
            
            while (options.length < optionCount) {
              const distractor = topicDistractors[Math.floor(Math.random() * topicDistractors.length)]
              if (!options.includes(distractor)) {
                options.push(distractor)
              }
            }
            
            // 打乱选项顺序
            return options.sort(() => Math.random() - 0.5)
          }
          
          // 生成正确答案
          const generateCorrectAnswer = (topic: string, type: string) => {
            if (type === 'true-false') {
              return Math.random() > 0.5 ? '正确' : '错误'
            }
            
            if (type === 'fill-blank') {
              return topic
            }
            
            return '选项 A'
          }
          
          for (let i = 0; i < count; i++) {
            const type = questionTypes[Math.floor(Math.random() * questionTypes.length)]
            const topic = topics[Math.floor(Math.random() * topics.length)]
            
            const questionText = generateQuestionContent(topic, type)
            const correctAnswer = generateCorrectAnswer(topic, type)
            const options = type === 'multiple-choice' ? generateOptions(topic, correctAnswer) : undefined
            
            const question: ParsedQuestion = {
              id: `q${i+1}`,
              type: type,
              question: questionText,
              options: options,
              correctAnswer: correctAnswer,
              difficulty: ['easy', 'medium', 'hard'][Math.floor(Math.random() * 3)],
              tags: [topic, type === 'multiple-choice' ? '选择题' : type === 'true-false' ? '判断题' : '填空题', '基础']
            }
            
            questions.push(question)
          }
          
          return questions
        }
        
        const generatedQuestions = generateQuestions(questionCount, topics, fileType)
        setParsedQuestions(generatedQuestions)
        setShowPreview(true)
      }, 1500)
    }
  }

  const handleDeleteFile = (fileId: string) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== fileId))
    if (selectedFile?.id === fileId) {
      setSelectedFile(null)
      setParsedQuestions([])
      setShowPreview(false)
    }
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B'
    else if (bytes < 1048576) return (bytes / 1024).toFixed(2) + ' KB'
    else return (bytes / 1048576).toFixed(2) + ' MB'
  }

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'uploading':
      case 'processing':
        return 'text-blue-600'
      case 'completed':
        return 'text-green-600'
      case 'failed':
        return 'text-red-600'
      default:
        return 'text-gray-600'
    }
  }

  const getStatusText = (status: string): string => {
    switch (status) {
      case 'uploading':
        return '上传中'
      case 'processing':
        return '处理中'
      case 'completed':
        return '已完成'
      case 'failed':
        return '失败'
      default:
        return '未知'
    }
  }

  const handleExportQuestions = () => {
    if (parsedQuestions.length === 0) return

    // 生成HTML内容
    const htmlContent = `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${selectedFile?.name || '导出题目'} - ${new Date().toISOString().split('T')[0]}</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
    }
    h1, h2, h3 {
      color: #4a4a4a;
    }
    .question {
      margin-bottom: 30px;
      padding: 20px;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      background-color: #f9f9f9;
    }
    .question-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 15px;
    }
    .question-text {
      font-weight: bold;
      font-size: 16px;
      margin-bottom: 15px;
    }
    .options {
      margin-bottom: 15px;
    }
    .option {
      margin-bottom: 8px;
      padding-left: 20px;
    }
    .correct-answer {
      background-color: #e8f5e8;
      padding: 10px;
      border-left: 4px solid #4caf50;
      margin-bottom: 15px;
    }
    .tags {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }
    .tag {
      background-color: #e3f2fd;
      color: #1976d2;
      padding: 4px 12px;
      border-radius: 12px;
      font-size: 12px;
    }
    .difficulty {
      padding: 4px 12px;
      border-radius: 12px;
      font-size: 12px;
      font-weight: bold;
    }
    .difficulty-easy {
      background-color: #e8f5e8;
      color: #4caf50;
    }
    .difficulty-medium {
      background-color: #fff3e0;
      color: #ff9800;
    }
    .difficulty-hard {
      background-color: #ffebee;
      color: #f44336;
    }
    .export-info {
      background-color: #f5f5f5;
      padding: 15px;
      border-radius: 8px;
      margin-bottom: 30px;
      font-size: 14px;
      color: #666;
    }
  </style>
</head>
<body>
  <h1>${selectedFile?.name || '导出题目'}</h1>
  
  <div class="export-info">
    <p>导出日期: ${new Date().toLocaleString('zh-CN')}</p>
    <p>题目数量: ${parsedQuestions.length}题</p>
    <p>原始文件: ${selectedFile?.name || '未知'}</p>
  </div>

  <h2>题目列表</h2>
  
  ${parsedQuestions.map((question, index) => `
    <div class="question">
      <div class="question-header">
        <div class="question-text">${index + 1}. ${question.question}</div>
        <span class="difficulty difficulty-${question.difficulty}">
          ${question.difficulty === 'easy' ? '简单' : question.difficulty === 'medium' ? '中等' : '困难'}
        </span>
      </div>
      
      ${question.options ? `
        <div class="options">
          ${question.options.map((option, optIndex) => `
            <div class="option">${String.fromCharCode(65 + optIndex)}. ${option}</div>
          `).join('')}
        </div>
      ` : ''}
      
      ${question.correctAnswer ? `
        <div class="correct-answer">
          <strong>正确答案:</strong> ${question.correctAnswer}
        </div>
      ` : ''}
      
      <div class="tags">
        ${question.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
      </div>
    </div>
  `).join('')}
</body>
</html>
    `

    // 创建Blob对象
    const blob = new Blob([htmlContent], { type: 'text/html' })
    
    // 创建下载链接
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${selectedFile?.name || 'questions'}_export_${new Date().toISOString().split('T')[0]}.html`
    
    // 触发下载
    document.body.appendChild(link)
    link.click()
    
    // 清理
    setTimeout(() => {
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    }, 100)
  }

  const handleGeneratePractice = () => {
    if (parsedQuestions.length === 0) return

    // 使用全部解析到的题目生成练习
    const practiceQuestions = [...parsedQuestions]

    // 准备练习数据
    const practiceData = {
      id: `practice-${Date.now()}`,
      name: `${selectedFile?.name || '练习'} - ${new Date().toLocaleDateString('zh-CN')}`,
      createdAt: new Date().toISOString(),
      questions: practiceQuestions.map((q, index) => ({
        ...q,
        questionNumber: index + 1
      })),
      totalQuestions: practiceQuestions.length,
      sourceFile: selectedFile?.name
    }

    // 保存到localStorage
    const existingPractices = JSON.parse(localStorage.getItem('practices') || '[]')
    existingPractices.unshift(practiceData)
    localStorage.setItem('practices', JSON.stringify(existingPractices))

    // 显示成功消息并跳转到真题模考页面
    alert(`练习生成成功！已使用全部${practiceQuestions.length}题生成考核试卷。`)
    
    // 跳转到真题模考页面
    setTimeout(() => {
      window.location.href = '/learning/skills/mock-exam'
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 py-16">
      <div className="container mx-auto px-4 max-w-5xl">
        <header className="text-center mb-16">
          <h1 className="text-4xl font-bold text-purple-600 mb-4">习题上传解析</h1>
          <p className="text-gray-600 text-lg">支持PDF/Excel文件上传，自动解析题目</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 左侧上传区域 */}
          <div className="lg:col-span-1">
            <div className="card h-full">
              <h2 className="text-xl font-bold mb-6">上传文件</h2>
              
              {/* 拖拽上传区域 */}
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center mb-6 cursor-pointer transition-colors ${isDragging ? 'border-purple-500 bg-purple-50' : 'border-gray-300 hover:border-purple-300'}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept=".pdf,.xlsx,.xls"
                  className="hidden"
                  onChange={handleFileUpload}
                />
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <h3 className="text-lg font-medium mb-2">拖拽文件到此处上传</h3>
                <p className="text-gray-500 mb-4">或点击选择文件</p>
                <p className="text-sm text-gray-400">支持PDF、Excel文件</p>
              </div>

              {/* 上传历史 */}
              <h3 className="text-lg font-bold mb-4">上传历史</h3>
              <div className="space-y-4 max-h-[500px] overflow-y-auto">
                {uploadedFiles.map((file) => (
                  <div
                    key={file.id}
                    className={`p-4 border rounded-lg hover:border-purple-300 transition-colors ${selectedFile?.id === file.id ? 'border-purple-500 bg-purple-50' : 'border-gray-200'}`}
                    onClick={() => handleFileSelect(file)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium line-clamp-1">{file.name}</h4>
                      <button
                        className="text-gray-400 hover:text-red-600"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleDeleteFile(file.id)
                        }}
                      >
                        ×
                      </button>
                    </div>
                    <div className="flex justify-between items-center text-sm text-gray-500 mb-2">
                      <span>{formatFileSize(file.size)}</span>
                      <span>{file.uploadDate}</span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className={getStatusColor(file.status)}>
                        {getStatusText(file.status)}
                      </span>
                      {file.status === 'completed' && (
                        <span className="text-green-600">
                          {file.questionsCount || 0}题
                        </span>
                      )}
                    </div>
                    {(file.status === 'uploading' || file.status === 'processing') && (
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-purple-500 h-2 rounded-full" 
                          style={{ width: `${file.progress}%` }}
                        ></div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 右侧预览区域 */}
          <div className="lg:col-span-2">
            {showPreview && selectedFile ? (
              <div className="card h-full">
                <div className="p-6">
                  <h2 className="text-xl font-bold mb-6">
                    {selectedFile.name} - 解析结果
                  </h2>

                  <div className="mb-8">
                    <h3 className="text-lg font-bold mb-4">文件信息</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-3 border rounded-lg">
                        <h4 className="text-sm font-medium text-gray-700 mb-1">文件名</h4>
                        <p className="text-gray-800 line-clamp-1">{selectedFile.name}</p>
                      </div>
                      <div className="p-3 border rounded-lg">
                        <h4 className="text-sm font-medium text-gray-700 mb-1">文件大小</h4>
                        <p className="text-gray-800">{formatFileSize(selectedFile.size)}</p>
                      </div>
                      <div className="p-3 border rounded-lg">
                        <h4 className="text-sm font-medium text-gray-700 mb-1">解析状态</h4>
                        <p className={getStatusColor(selectedFile.status)}>
                          {getStatusText(selectedFile.status)}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mb-8">
                    <h3 className="text-lg font-bold mb-4">解析结果</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                        <h4 className="text-sm font-medium text-green-700 mb-1">解析题目数</h4>
                        <p className="text-2xl font-bold text-green-600">{parsedQuestions.length}</p>
                      </div>
                      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <h4 className="text-sm font-medium text-blue-700 mb-1">解析成功率</h4>
                        <p className="text-2xl font-bold text-blue-600">100%</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold mb-4">解析的题目</h3>
                    <div className="space-y-6">
                      {parsedQuestions.map((question) => (
                        <div key={question.id} className="p-4 border rounded-lg">
                          <div className="flex justify-between items-start mb-3">
                            <h4 className="font-medium">{question.question}</h4>
                            <span className={`px-2 py-1 rounded-full text-xs ${question.difficulty === 'easy' ? 'bg-green-100 text-green-800' : question.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                              {question.difficulty === 'easy' ? '简单' : question.difficulty === 'medium' ? '中等' : '困难'}
                            </span>
                          </div>
                          
                          {question.options && (
                            <div className="space-y-2 mb-3">
                              {question.options.map((option, index) => (
                                <div key={index} className="flex items-center">
                                  <input
                                    type="radio"
                                    id={`option-${question.id}-${index}`}
                                    name={`question-${question.id}`}
                                    disabled
                                    className="mr-2"
                                  />
                                  <label htmlFor={`option-${question.id}-${index}`} className="cursor-pointer">
                                    {option}
                                  </label>
                                </div>
                              ))}
                            </div>
                          )}

                          {question.correctAnswer && (
                            <div className="mb-3">
                              <span className="font-medium text-green-600">正确答案: </span>
                              <span>{question.correctAnswer}</span>
                            </div>
                          )}

                          <div className="flex flex-wrap gap-2">
                            {question.tags.map((tag, index) => (
                              <span key={index} className="px-2 py-0.5 bg-purple-100 text-purple-800 rounded-full text-xs">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-8 flex justify-center space-x-4">
                      <button 
                        className="btn-primary px-6 py-2"
                        onClick={handleExportQuestions}
                      >
                        导出题目
                      </button>
                      <button 
                        className="btn-secondary px-6 py-2"
                        onClick={() => handleGeneratePractice()}
                      >
                        生成练习
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : selectedFile ? (
              <div className="card h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto mb-4"></div>
                  <h3 className="text-xl font-medium text-gray-600">正在解析文件...</h3>
                  <p className="text-gray-500 mt-2">系统正在分析{selectedFile.name}的内容，请稍候...</p>
                </div>
              </div>
            ) : (
              <div className="card h-full flex items-center justify-center">
                <div className="text-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-purple-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <h3 className="text-xl font-medium text-gray-600">请上传文件或选择历史文件</h3>
                  <p className="text-gray-500 mt-2">上传PDF或Excel文件后，系统会自动解析题目</p>
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
