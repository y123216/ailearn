'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function UserProfile() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    language: '',
    level: '',
    scenarios: [] as string[],
    duration: ''
  })

  const languages = ['英语', '日语', '韩语', '法语', '德语']
  const levels = ['初级', '中级', '高级']
  const scenarios = ['旅游', '职场', '考级', '日常交流', '商务谈判']
  const durations = ['15分钟/天', '30分钟/天', '1小时/天', '2小时/天']

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({ ...formData, language: e.target.value })
  }

  const handleLevelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, level: e.target.value })
  }

  const handleScenarioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (e.target.checked) {
      setFormData({ ...formData, scenarios: [...formData.scenarios, value] })
    } else {
      setFormData({ ...formData, scenarios: formData.scenarios.filter(s => s !== value) })
    }
  }

  const handleDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, duration: e.target.value })
  }

  const generateStudyPlan = (data: any) => {
    // 生成学习计划
    const plan = {
      id: Date.now().toString(),
      language: data.language,
      level: data.level,
      scenarios: data.scenarios,
      duration: data.duration,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      weeklyPlan: [
        {
          day: '周一',
          activities: [
            { id: 1, title: '词汇学习', content: '学习20个核心词汇', duration: '10分钟' },
            { id: 2, title: '语法练习', content: '复习基础语法', duration: '15分钟' }
          ]
        },
        {
          day: '周二',
          activities: [
            { id: 1, title: '听力练习', content: '听2篇短文', duration: '15分钟' },
            { id: 2, title: '口语练习', content: '跟读模仿', duration: '10分钟' }
          ]
        },
        {
          day: '周三',
          activities: [
            { id: 1, title: '阅读理解', content: '阅读1篇文章', duration: '20分钟' },
            { id: 2, title: '写作练习', content: '写一篇短文', duration: '15分钟' }
          ]
        },
        {
          day: '周四',
          activities: [
            { id: 1, title: '词汇复习', content: '复习本周词汇', duration: '10分钟' },
            { id: 2, title: '语法巩固', content: '做语法练习题', duration: '15分钟' }
          ]
        },
        {
          day: '周五',
          activities: [
            { id: 1, title: '听力进阶', content: '听1篇较长文章', duration: '20分钟' },
            { id: 2, title: '口语对话', content: '模拟场景对话', duration: '15分钟' }
          ]
        },
        {
          day: '周六',
          activities: [
            { id: 1, title: '综合练习', content: '做一套模拟题', duration: '40分钟' },
            { id: 2, title: '错题回顾', content: '复习本周错题', duration: '20分钟' }
          ]
        },
        {
          day: '周日',
          activities: [
            { id: 1, title: '周总结', content: '总结本周学习内容', duration: '30分钟' },
            { id: 2, title: '下周规划', content: '制定下周学习计划', duration: '15分钟' }
          ]
        }
      ]
    }
    return plan
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // 生成学习计划
    const studyPlan = generateStudyPlan(formData)
    // 保存到本地存储
    localStorage.setItem('studyPlan', JSON.stringify(studyPlan))
    // 跳转到学习计划详情页
    router.push('/learning/language/plan')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-16">
      <div className="container mx-auto px-4 max-w-3xl">
        <header className="text-center mb-12">
          <h1 className="text-3xl font-bold text-primary mb-4">用户画像录入</h1>
          <p className="text-gray-600">请填写以下信息，我们将为您生成个性化的学习计划</p>
        </header>

        <form onSubmit={handleSubmit} className="card">
          {/* 语言选择 */}
          <div className="mb-6">
            <label className="label" htmlFor="language">语言选择</label>
            <select
              id="language"
              className="input"
              value={formData.language}
              onChange={handleLanguageChange}
              required
            >
              <option value="">请选择语言</option>
              {languages.map((lang) => (
                <option key={lang} value={lang}>{lang}</option>
              ))}
            </select>
          </div>

          {/* 水平分级 */}
          <div className="mb-6">
            <label className="label">水平分级</label>
            <div className="space-y-2">
              {levels.map((level) => (
                <div key={level} className="flex items-center">
                  <input
                    type="radio"
                    id={`level-${level}`}
                    name="level"
                    value={level}
                    className="mr-2"
                    checked={formData.level === level}
                    onChange={handleLevelChange}
                    required
                  />
                  <label htmlFor={`level-${level}`}>{level}</label>
                </div>
              ))}
            </div>
          </div>

          {/* 场景选择 */}
          <div className="mb-6">
            <label className="label">场景选择（可多选）</label>
            <div className="grid grid-cols-2 gap-2">
              {scenarios.map((scenario) => (
                <div key={scenario} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`scenario-${scenario}`}
                    value={scenario}
                    className="mr-2"
                    checked={formData.scenarios.includes(scenario)}
                    onChange={handleScenarioChange}
                  />
                  <label htmlFor={`scenario-${scenario}`}>{scenario}</label>
                </div>
              ))}
            </div>
          </div>

          {/* 时长设置 */}
          <div className="mb-6">
            <label className="label">时长设置</label>
            <div className="space-y-2">
              {durations.map((duration) => (
                <div key={duration} className="flex items-center">
                  <input
                    type="radio"
                    id={`duration-${duration}`}
                    name="duration"
                    value={duration}
                    className="mr-2"
                    checked={formData.duration === duration}
                    onChange={handleDurationChange}
                    required
                  />
                  <label htmlFor={`duration-${duration}`}>{duration}</label>
                </div>
              ))}
            </div>
          </div>

          <button type="submit" className="btn-primary w-full">
            生成学习计划
          </button>
        </form>
      </div>
    </div>
  )
}