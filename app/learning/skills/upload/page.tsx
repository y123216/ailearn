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
      // 模拟解析题目
      setParsedQuestions(mockParsedQuestions)
      setShowPreview(true)
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
                      {file.status === 'completed' && file.questionsCount && (
                        <span className="text-green-600">
                          {file.questionsCount}题
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
                        <p className="text-2xl font-bold text-green-600">{selectedFile.questionsCount}</p>
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
                      <button className="btn-primary px-6 py-2">
                        导出题目
                      </button>
                      <button className="btn-secondary px-6 py-2">
                        生成练习
                      </button>
                    </div>
                  </div>
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
