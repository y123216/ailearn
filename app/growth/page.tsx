import Link from 'next/link'

export default function GrowthTools() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 py-16">
      <div className="container mx-auto px-4">
        <header className="text-center mb-16">
          <h1 className="text-4xl font-bold text-primary mb-4">冷启动与用户增长工具</h1>
          <p className="text-gray-600 text-lg">助力产品快速获取用户，实现可持续增长</p>
        </header>

        <div className="max-w-3xl mx-auto">
          {/* AI互动式学习平台增长工具 */}
          <div className="card hover:shadow-lg transition-shadow">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-4">学习平台增长工具</h2>
              <p className="text-gray-600 mb-6">免费资源引流、社群运营工具，提升用户粘性</p>
              <Link href="/growth/learning" className="btn-primary inline-block">
                查看工具
              </Link>
            </div>
          </div>
        </div>

        <footer className="mt-20 text-center text-gray-500 text-sm">
          <p>© 2026 冷启动与用户增长工具</p>
        </footer>
      </div>
    </div>
  )
}
