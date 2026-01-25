import { NextRequest, NextResponse } from 'next/server'
import { generateToken } from '@/lib/auth/utils'
import { createUser } from '@/lib/auth/userStore'

export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json()

    // 验证输入
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: '用户名、邮箱和密码不能为空' },
        { status: 400 }
      )
    }

    // 创建用户
    const user = await createUser(email, password, name)

    // 生成令牌
    const token = generateToken(user.id)

    // 返回用户信息和令牌
    return NextResponse.json({
      user,
      token
    })
  } catch (error) {
    console.error('注册错误:', error)
    if (error instanceof Error && error.message === 'Email already exists') {
      return NextResponse.json(
        { error: '该邮箱已被注册' },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { error: '注册失败，请稍后重试' },
      { status: 500 }
    )
  }
}
