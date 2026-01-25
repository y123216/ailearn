'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface Activity {
  id: number
  title: string
  content: string
  duration: string
}

interface DayPlan {
  day: string
  activities: Activity[]
}

interface StudyPlan {
  id: string
  language: string
  level: string
  scenarios: string[]
  duration: string
  createdAt: string
  updatedAt: string
  weeklyPlan: DayPlan[]
}

export default function StudyPlanDetail() {
  const router = useRouter()
  const [studyPlan, setStudyPlan] = useState<StudyPlan | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [editedPlan, setEditedPlan] = useState<StudyPlan | null>(null)

  useEffect(() => {
    // 从本地存储加载学习计划
    const savedPlan = localStorage.getItem('studyPlan')
    if (savedPlan) {
      const plan = JSON.parse(savedPlan) as StudyPlan
      setStudyPlan(plan)
      setEditedPlan(plan)
    } else {
      // 如果没有学习计划，跳回用户画像录入页面
      router.push('/learning/language/profile')
    }
  }, [router])

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleCancel = () => {
    setIsEditing(false)
    setEditedPlan(studyPlan)
  }

  const handleSave = () => {
    if (editedPlan) {
      const updatedPlan = {
        ...editedPlan,
        updatedAt: new Date().toISOString()
      }
      localStorage.setItem('studyPlan', JSON.stringify(updatedPlan))
      setStudyPlan(updatedPlan)
      setIsEditing(false)
    }
  }

  const handleActivityChange = (dayIndex: number, activityIndex: number, field: Exclude<keyof Activity, 'id'>, value: string) => {
    if (editedPlan) {
      const updatedPlan = { ...editedPlan }
      updatedPlan.weeklyPlan[dayIndex].activities[activityIndex][field] = value
      setEditedPlan(updatedPlan)
    }
  }

  const handleAddActivity = (dayIndex: number) => {
    if (editedPlan) {
      const updatedPlan = { ...editedPlan }
      const newActivity: Activity = {
        id: Date.now(),
        title: '新活动',
        content: '活动内容',
        duration: '10分钟'
      }
      updatedPlan.weeklyPlan[dayIndex].activities.push(newActivity)
      setEditedPlan(updatedPlan)
    }
  }

  const handleRemoveActivity = (dayIndex: number, activityIndex: number) => {
    if (editedPlan) {
      const updatedPlan = { ...editedPlan }
      updatedPlan.weeklyPlan[dayIndex].activities.splice(activityIndex, 1)
      setEditedPlan(updatedPlan)
    }
  }

  if (!studyPlan || !editedPlan) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="card text-center py-12">
            <p className="text-gray-600 mb-4">加载中...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <header className="text-center mb-12">
          <h1 className="text-3xl font-bold text-primary mb-4">个性化学习计划</h1>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
            <span>语言: {studyPlan.language}</span>
            <span>水平: {studyPlan.level}</span>
            <span>场景: {studyPlan.scenarios.join(', ')}</span>
            <span>时长: {studyPlan.duration}</span>
          </div>
        </header>

        <div className="flex justify-end mb-6">
          {isEditing ? (
            <>
              <button
                onClick={handleCancel}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md mr-2 hover:bg-gray-300 transition"
              >
                取消
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-primary text-white rounded-md hover:bg-blue-600 transition"
              >
                保存修改
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => router.push('/learning/language/profile')}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md mr-2 hover:bg-gray-300 transition"
              >
                重新生成
              </button>
              <button
                onClick={handleEdit}
                className="px-4 py-2 bg-primary text-white rounded-md hover:bg-blue-600 transition"
              >
                修改计划
              </button>
            </>
          )}
        </div>

        <div className="card mb-8">
          <div className="p-6">
            <h2 className="text-xl font-bold mb-6 text-gray-800">周学习计划</h2>
            
            {editedPlan.weeklyPlan.map((dayPlan, dayIndex) => (
              <div key={dayIndex} className="mb-8 border-b pb-6 last:border-0">
                <h3 className="text-lg font-semibold mb-4 text-gray-700 flex items-center">
                  <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-2">
                    {dayIndex + 1}
                  </span>
                  {dayPlan.day}
                </h3>
                
                {dayPlan.activities.map((activity, activityIndex) => (
                  <div key={activityIndex} className="bg-gray-50 p-4 rounded-md mb-3">
                    {isEditing ? (
                      <>
                        <div className="mb-2">
                          <label className="block text-sm text-gray-600 mb-1">活动标题</label>
                          <input
                            type="text"
                            value={activity.title}
                            onChange={(e) => handleActivityChange(dayIndex, activityIndex, 'title', e.target.value)}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div className="mb-2">
                          <label className="block text-sm text-gray-600 mb-1">活动内容</label>
                          <textarea
                            value={activity.content}
                            onChange={(e) => handleActivityChange(dayIndex, activityIndex, 'content', e.target.value)}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            rows={2}
                          />
                        </div>
                        <div className="flex justify-between items-center">
                          <div>
                            <label className="block text-sm text-gray-600 mb-1">时长</label>
                            <input
                              type="text"
                              value={activity.duration}
                              onChange={(e) => handleActivityChange(dayIndex, activityIndex, 'duration', e.target.value)}
                              className="w-32 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                          <button
                            onClick={() => handleRemoveActivity(dayIndex, activityIndex)}
                            className="px-3 py-1 bg-red-100 text-red-600 rounded-md hover:bg-red-200 transition"
                          >
                            删除
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <h4 className="font-medium text-gray-800 mb-1">{activity.title}</h4>
                        <p className="text-gray-600 mb-2">{activity.content}</p>
                        <div className="flex items-center text-sm text-gray-500">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {activity.duration}
                        </div>
                      </>
                    )}
                  </div>
                ))}
                
                {isEditing && (
                  <button
                    onClick={() => handleAddActivity(dayIndex)}
                    className="mt-2 px-4 py-2 bg-green-100 text-green-700 rounded-md hover:bg-green-200 transition"
                  >
                    添加活动
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="text-center text-sm text-gray-500">
          <p>创建时间: {new Date(studyPlan.createdAt).toLocaleString()}</p>
          {studyPlan.updatedAt !== studyPlan.createdAt && (
            <p>更新时间: {new Date(studyPlan.updatedAt).toLocaleString()}</p>
          )}
        </div>
      </div>
    </div>
  )
}
