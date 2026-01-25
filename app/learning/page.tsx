import Link from 'next/link'

export default function LearningPlatform() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8">
      <div className="container mx-auto px-4">
        <header className="text-center mb-12">
          <h1 className="text-3xl font-bold text-primary mb-4">AI互动式学习平台</h1>
          <p className="text-gray-600 text-lg">覆盖语言学习、技能刷题两大场景，打造轻量化、个性化、高粘性的免费学习工具</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {/* AI语言学习站 */}
          <div className="card hover:shadow-lg transition-shadow flex flex-col">
            <div className="text-center flex-1 flex flex-col">
              <div className="bg-blue-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-4">AI语言学习站</h2>
              <p className="text-gray-600 mb-6 flex-1">沉浸式对话练习、个性化学习计划、碎片化辅助工具，打造高效语言学习体验</p>
              <div className="flex justify-center items-end pb-4">
                <Link href="/learning/language" className="btn-primary inline-block w-32 h-10 flex items-center justify-center">
                  开始学习
                </Link>
              </div>
            </div>
          </div>

          {/* AI技能刷题站 */}
          <div className="card hover:shadow-lg transition-shadow flex flex-col">
            <div className="text-center flex-1 flex flex-col">
              <div className="bg-purple-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-4">AI技能刷题站</h2>
              <p className="text-gray-600 mb-6 flex-1">AI动态出题、错题深度解析、个性化学习路径，助力各类技能考试备考</p>
              <div className="flex justify-center items-end pb-4">
                <Link href="/learning/skills" className="btn-primary inline-block w-32 h-10 flex items-center justify-center">
                  开始刷题
                </Link>
              </div>
            </div>
          </div>
        </div>

        <footer className="mt-12 text-center text-gray-500 text-sm">
          <p>© 2026 AI互动式学习平台</p>
        </footer>
      </div>
    </div>
  )
}
