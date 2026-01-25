# AI学习平台

一个基于Next.js开发的智能学习平台，提供个性化学习体验和AI辅助功能。

## 项目介绍

AI学习平台是一个现代化的教育科技应用，结合了人工智能技术和个性化学习方案，为用户提供全方位的学习支持。

## 主要功能

### 1. 认证系统
- **用户登录** (`/auth/login`)
- **用户注册** (`/auth/register`)

### 2. 学习模块

#### 语言学习
- **对话练习** (`/learning/language/conversation`)
- **学习计划** (`/learning/language/plan`)
- **个人资料** (`/learning/language/profile`)
- **学习工具** (`/learning/language/tools`)

#### 技能学习
- **学习分析** (`/learning/skills/analysis`)
- **错题本** (`/learning/skills/error-book`)
- **模拟考试** (`/learning/skills/mock-exam`)
- **学习路径** (`/learning/skills/path`)
- **问题练习** (`/learning/skills/questions`)
- **文件上传** (`/learning/skills/upload`)

### 3. 成长记录
- **学习记录** (`/growth/learning`)

### 4. API接口
- **AI服务** (`/api/ai`)
- **认证服务** (`/api/auth`)
- **文件服务** (`/api/files`)
- **语音服务** (`/api/voice`)

## 技术栈

- **前端框架**: Next.js 14+ (App Router)
- **编程语言**: TypeScript
- **样式方案**: Tailwind CSS
- **状态管理**: React Hooks + 本地存储
- **API设计**: Next.js API Routes
- **部署**: Vercel (推荐)

## 快速开始

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

打开 [http://localhost:3000](http://localhost:3000) 查看应用。

### 构建生产版本

```bash
npm run build
npm start
```

## 项目结构

```
ailearn/
├── app/
│   ├── api/            # API接口
│   ├── auth/           # 认证页面
│   ├── growth/         # 成长记录
│   ├── learning/       # 学习模块
│   ├── globals.css     # 全局样式
│   ├── layout.tsx      # 应用布局
│   └── page.tsx        # 首页
├── components/         # 可复用组件
├── lib/                # 工具库
├── public/             # 静态资源
├── next.config.js      # 项目配置
├── package.json        # 依赖管理
└── tsconfig.json       # TypeScript配置
```

## 开发说明

- 页面文件位于 `app/` 目录，使用Next.js 13+的App Router结构
- 组件文件位于 `components/` 目录
- 工具函数和业务逻辑位于 `lib/` 目录
- API接口位于 `app/api/` 目录

## 贡献

欢迎提交Issue和Pull Request来改进这个项目！

## 许可证

MIT License
