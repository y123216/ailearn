import { NextRequest, NextResponse } from 'next/server'
import { verifyToken } from '@/lib/auth/utils'
import { getUserById } from '@/lib/auth/userStore'

export async function GET(request: NextRequest) {
  try {
    // 从请求头获取令牌
    const authHeader = request.headers.get('authorization')
    if (!authHeader) {
      return NextResponse.json(
        { error: '未提供认证令牌' },
        { status: 401 }
      )
    }

    const token = authHeader.replace('Bearer ', '')
    
    // 验证令牌
    const decoded = verifyToken(token)
    if (!decoded) {
      return NextResponse.json(
        { error: '无效的认证令牌' },
        { status: 401 }
      )
    }

    // 查找用户
    const user = getUserById(decoded.userId)
    if (!user) {
      return NextResponse.json(
        { error: '用户不存在' },
        { status: 404 }
      )
    }

    // 返回用户信息
    return NextResponse.json({ user })
  } catch (error) {
    console.error('获取用户信息错误:', error)
    return NextResponse.json(
      { error: '获取用户信息失败' },
      { status: 500 }
    )
  }
}
