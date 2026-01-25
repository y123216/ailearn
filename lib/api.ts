import axios from 'axios'

const apiClient = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// AI模型调用
export const aiAPI = {
  generate: async (model: string, prompt: string, messages?: any[]) => {
    try {
      const response = await apiClient.post('/ai', {
        model,
        prompt,
        messages
      })
      return response.data
    } catch (error) {
      console.error('AI模型调用失败:', error)
      throw error
    }
  }
}

// 语音API
export const voiceAPI = {
  recognize: async (audio: string) => {
    try {
      const response = await apiClient.post('/voice', {
        type: 'recognize',
        audio
      })
      return response.data
    } catch (error) {
      console.error('语音识别失败:', error)
      throw error
    }
  },
  synthesize: async (text: string) => {
    try {
      const response = await apiClient.post('/voice', {
        type: 'synthesize',
        text
      })
      return response.data
    } catch (error) {
      console.error('语音合成失败:', error)
      throw error
    }
  }
}

// 文件处理API
export const filesAPI = {
  upload: async (files: File[]) => {
    try {
      const formData = new FormData()
      files.forEach(file => {
        formData.append('files', file)
      })
      
      const response = await axios.post('/api/files', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      return response.data
    } catch (error) {
      console.error('文件上传失败:', error)
      throw error
    }
  }
}

export default apiClient