import Link from 'next/link'

export default function LanguageLearning() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-8">
      <div className="container mx-auto px-4">
        <header className="text-center mb-12">
          <h1 className="text-3xl font-bold text-primary mb-4">AI语言学习站</h1>
          <p className="text-gray-600 text-lg">沉浸式对话练习、个性化学习计划、碎片化辅助工具</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {/* 用户画像录入模块 */}
          <div className="card hover:shadow-lg transition-shadow flex flex-col">
            <div className="text-center flex-1 flex flex-col">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold mb-4">用户画像录入</h2>
              <p className="text-gray-600 mb-4 flex-1">录入语言选择、水平分级、场景选择、时长设置，生成个性化学习计划</p>
              <div className="flex justify-center items-end pb-4">
                <Link href="/learning/language/profile" className="btn-primary inline-block w-32 h-10 flex items-center justify-center">
                  开始录入
                </Link>
              </div>
            </div>
          </div>

          {/* 沉浸式对话练习模块 */}
          <div className="card hover:shadow-lg transition-shadow flex flex-col">
            <div className="text-center flex-1 flex flex-col">
              <div className="bg-indigo-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold mb-4">沉浸式对话练习</h2>
              <p className="text-gray-600 mb-4 flex-1">20+高频场景，文字输入，AI实时反馈与评分</p>
              <div className="flex justify-center items-end pb-4">
                <Link href="/learning/language/conversation" className="btn-primary inline-block w-32 h-10 flex items-center justify-center">
                  开始对话
                </Link>
              </div>
            </div>
          </div>

          {/* 碎片化辅助工具模块 */}
          <div className="card hover:shadow-lg transition-shadow flex flex-col">
            <div className="text-center flex-1 flex flex-col">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold mb-4">碎片化辅助工具</h2>
              <p className="text-gray-600 mb-4 flex-1">单词卡、单词上传解析</p>
              <div className="flex justify-center items-end pb-4">
                <Link href="/learning/language/tools" className="btn-primary inline-block w-32 h-10 flex items-center justify-center">
                  工具中心
                </Link>
              </div>
            </div>
          </div>
        </div>

        <footer className="mt-12 text-center text-gray-500 text-sm">
          <p>© 2026 AI语言学习站</p>
        </footer>
      </div>
    </div>
  )
}
