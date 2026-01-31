'use client'

import { useState, useEffect } from 'react'

interface Product {
  id: string
  title: string
  description: string
  price: number
  type: 'resource' | 'bundle'
}

const resources: Product[] = [
  {
    id: 'prod_1',
    title: '英语学习资料包',
    description: '包含初级、中级、高级英语学习资料',
    price: 19.9,
    type: 'resource'
  },
  {
    id: 'prod_2',
    title: '日语五十音图',
    description: '标准五十音图发音指南',
    price: 9.9,
    type: 'resource'
  },
  {
    id: 'prod_3',
    title: '程序员面试题库',
    description: '常见编程面试题及解析',
    price: 29.9,
    type: 'resource'
  }
]

const bundle: Product = {
  id: process.env.NEXT_PUBLIC_CREEM_PRODUCT_ID || 'test_bundle_001',
  title: '全部学习资料',
  description: '包含英语学习资料包、日语五十音图、程序员面试题库',
  price: 50,
  type: 'bundle'
}

export default function LearningGrowth() {
  const [isProcessing, setIsProcessing] = useState(false)

  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const url = new URL(window.location.href);
    const paid = url.searchParams.get("paid");
    if (paid === "1") {
      setShowSuccess(true);
      url.searchParams.delete("paid");
      const newQuery = url.searchParams.toString();
      const newUrl = url.pathname + (newQuery ? `?${newQuery}` : "") + url.hash;
      window.history.replaceState({}, "", newUrl);
    }
  }, []);

  const handlePurchase = async (product: Product) => {
    setIsProcessing(true)
    
    try {
      console.log('开始创建支付订单...')
      console.log('产品ID:', product.id)
      
      const resp = await fetch("/api/creem/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: product.id }),
      });

      const data = await resp.json().catch(() => ({}));
      console.log('后端响应:', data)

      if (resp.ok && data?.url) {
        console.log('跳转到支付页面:', data.url)
        window.location.href = data.url as string;
      } else {
        const ft = data?.failureType === "API" ? "上游服务/限流" : "本地参数/配置";
        const errorMessage = `支付创建失败（${ft || "API"}）：${data?.error || "请重试"}`;
        console.error('支付创建失败:', errorMessage);
        alert(errorMessage);
      }
    } catch (error) {
      console.error('网络异常:', error);
      alert("网络异常，请稍后重试");
    } finally {
      setIsProcessing(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-16">
      {/* 支付成功通知 */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full text-center">
            <div className="mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-green-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-4">支付成功！</h3>
            <button 
              className="btn-primary px-6 py-2"
              onClick={() => setShowSuccess(false)}
            >
              确定
            </button>
          </div>
        </div>
      )}
      
      <div className="container mx-auto px-4 max-w-4xl">
        <header className="text-center mb-12">
          <h1 className="text-3xl font-bold text-primary mb-4">学习平台增长工具</h1>
          <p className="text-gray-600">精品资源服务、社群运营工具</p>
        </header>

        <div className="card mb-12">
          <h2 className="text-xl font-bold mb-6">精品学习资料</h2>
          <div className="space-y-8">
            <div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {resources.map((resource) => (
                  <div key={resource.id} className="border rounded-lg p-4">
                    <h4 className="font-bold">{resource.title}</h4>
                    <p className="text-sm text-gray-600">{resource.description}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h3 className="text-lg font-bold mb-2">全部学习资料套餐</h3>
                  <p className="text-gray-600">一次性购买，获得所有学习资料</p>
                </div>
                <div className="flex flex-col items-end">
                  <div className="text-lg font-bold text-primary mb-2">¥{bundle.price}</div>
                  <button 
                    className="btn-primary px-4 py-2"
                    onClick={() => handlePurchase(bundle)}
                    disabled={isProcessing}
                  >
                    {isProcessing ? '处理中...' : '立即购买'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <h2 className="text-xl font-bold mb-6">社群运营工具</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="font-bold mb-2">学习社群</h3>
              <p className="text-gray-600 mb-4">加入我们的学习社群，与其他学习者交流</p>
              <div className="bg-white p-4 rounded-lg inline-block">
                <p className="text-sm font-bold mb-2">扫描二维码加入</p>
                <div className="w-40 h-40 bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500">二维码</span>
                </div>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-bold mb-2">打卡活动</h3>
              <p className="text-gray-600 mb-4">参与每日学习打卡，赢取学习奖励</p>
              <button className="btn-secondary">
                立即参与
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
