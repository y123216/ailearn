import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { model, prompt, messages } = await request.json()

    // 模拟AI模型响应
    // 实际部署时，这里可以替换为真实的模型调用
    setTimeout(() => {
      // 模拟模型处理时间
    }, 1000)

    const response = {
      success: true,
      data: {
        model: model || 'qwen-7b',
        response: `这是${model || 'qwen-7b'}模型的回复：${prompt}`,
        tokens: {
          input: prompt.length,
          output: 100
        }
      }
    }

    return NextResponse.json(response)
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'AI模型调用失败' },
      { status: 500 }
    )
  }
}