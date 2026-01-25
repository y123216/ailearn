import Link from 'next/link'

export default function SkillsPractice() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 py-8">
      <div className="container mx-auto px-4">
        <header className="text-center mb-12">
          <h1 className="text-3xl font-bold text-purple-600 mb-4">AI技能刷题站</h1>
          <p className="text-gray-600 text-lg">AI动态出题、错题深度解析、个性化学习路径</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {/* AI动态出题模块 */}
          <div className="card hover:shadow-lg transition-shadow flex flex-col">
            <div className="text-center flex-1 flex flex-col">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold mb-4">AI动态出题</h2>
              <p className="text-gray-600 mb-6 flex-1">基于考点配置和错题分析，智能生成个性化题目</p>
              <div className="flex justify-center items-end pb-4">
                <Link href="/learning/skills/questions" className="btn-primary inline-block w-32 h-10 flex items-center justify-center">
                  开始出题
                </Link>
              </div>
            </div>
          </div>

          {/* AI错题深度解析模块 */}
          <div className="card hover:shadow-lg transition-shadow flex flex-col">
            <div className="text-center flex-1 flex flex-col">
              <div className="bg-indigo-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold mb-4">错题深度解析</h2>
              <p className="text-gray-600 mb-6 flex-1">文字/语音双模式解析，支持追问和知识点拓展</p>
              <div className="flex justify-center items-end pb-4">
                <Link href="/learning/skills/analysis" className="btn-primary inline-block w-32 h-10 flex items-center justify-center">
                  查看解析
                </Link>
              </div>
            </div>
          </div>

          {/* 个性化学习路径模块 */}
          <div className="card hover:shadow-lg transition-shadow flex flex-col">
            <div className="text-center flex-1 flex flex-col">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold mb-4">个性化学习路径</h2>
              <p className="text-gray-600 mb-6 flex-1">基于考点分析和答题数据，生成专属学习计划</p>
              <div className="flex justify-center items-end pb-4">
                <Link href="/learning/skills/path" className="btn-primary inline-block w-32 h-10 flex items-center justify-center">
                  查看路径
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* 辅助功能 */}
        <div className="mt-8 max-w-6xl mx-auto">
          <h2 className="section-title">辅助功能</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card hover:shadow-lg transition-shadow flex flex-col">
              <div className="text-center flex-1 flex flex-col">
                <h3 className="text-lg font-bold mb-2">错题本</h3>
                <p className="text-gray-600 mb-4 flex-1">按考点、错误原因分类管理错题</p>
                <div className="flex justify-center items-end pb-4">
                  <Link href="/learning/skills/error-book" className="btn-primary inline-block w-32 h-10 flex items-center justify-center">
                    查看错题本
                  </Link>
                </div>
              </div>
            </div>
            <div className="card hover:shadow-lg transition-shadow flex flex-col">
              <div className="text-center flex-1 flex flex-col">
                <h3 className="text-lg font-bold mb-2">真题模考</h3>
                <p className="text-gray-600 mb-4 flex-1">模拟真实考试环境，生成详细报告</p>
                <div className="flex justify-center items-end pb-4">
                  <Link href="/learning/skills/mock-exam" className="btn-primary inline-block w-32 h-10 flex items-center justify-center">
                    开始模考
                  </Link>
                </div>
              </div>
            </div>
            <div className="card hover:shadow-lg transition-shadow flex flex-col">
              <div className="text-center flex-1 flex flex-col">
                <h3 className="text-lg font-bold mb-2">习题上传解析</h3>
                <p className="text-gray-600 mb-4 flex-1">支持PDF/Excel文件上传，自动解析题目</p>
                <div className="flex justify-center items-end pb-4">
                  <Link href="/learning/skills/upload" className="btn-primary inline-block w-32 h-10 flex items-center justify-center">
                    上传习题
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <footer className="mt-12 text-center text-gray-500 text-sm">
          <p>© 2026 AI技能刷题站</p>
        </footer>
      </div>
    </div>
  )
}
