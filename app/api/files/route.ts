import { NextRequest, NextResponse } from 'next/server'
import { writeFileSync, unlinkSync } from 'fs'
import { join } from 'path'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const files = formData.getAll('files') as File[]

    if (!files || files.length === 0) {
      return NextResponse.json(
        { success: false, error: '请选择文件' },
        { status: 400 }
      )
    }

    // 处理文件上传
    const uploadedFiles: Array<{
      name: string
      size: number
      type: string
      url: string
    }> = []
    for (const file of files) {
      const buffer = Buffer.from(await file.arrayBuffer())
      const filePath = join(process.cwd(), 'public', 'uploads', file.name)
      
      // 确保上传目录存在
      const fs = require('fs')
      const path = require('path')
      const uploadDir = path.join(process.cwd(), 'public', 'uploads')
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true })
      }

      writeFileSync(filePath, buffer)
      uploadedFiles.push({
        name: file.name,
        size: file.size,
        type: file.type,
        url: `/uploads/${file.name}`
      })
    }

    // 模拟文件处理
    setTimeout(() => {
      // 清理临时文件
      uploadedFiles.forEach(file => {
        try {
          const filePath = join(process.cwd(), 'public', 'uploads', file.name)
          unlinkSync(filePath)
        } catch (error) {
          console.error('文件清理失败:', error)
        }
      })
    }, 30000)

    const response = {
      success: true,
      data: {
        files: uploadedFiles,
        message: '文件上传成功，正在处理...'
      }
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('文件处理失败:', error)
    return NextResponse.json(
      { success: false, error: '文件处理失败' },
      { status: 500 }
    )
  }
}