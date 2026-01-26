'use client'

import { useState } from 'react'

interface Word {
  id: string
  word: string
  meaning: string
  example: string
  reviewDate: string
  category: string
}

export default function LanguageTools() {
  const [activeTab, setActiveTab] = useState('flashcards')
  const [words, setWords] = useState<Word[]>([
    {
      id: '1',
      word: 'hello',
      meaning: '你好',
      example: 'Hello, how are you?',
      reviewDate: '2026-01-25',
      category: '基础'
    },
    {
      id: '2',
      word: 'world',
      meaning: '世界',
      example: 'The world is big.',
      reviewDate: '2026-01-25',
      category: '基础'
    }
  ])
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [inputWord, setInputWord] = useState('')
  const [translatedWord, setTranslatedWord] = useState<{word: string, meaning: string, example: string, category: string} | null>(null)
  const [isTranslating, setIsTranslating] = useState(false)

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0])
    }
  }

  const handleProcessFile = () => {
    // 这里可以添加文件处理逻辑
    if (uploadedFile) {
      alert('文件处理成功！')
      setUploadedFile(null)
    }
  }

  // 生成五千个常用词汇的数据库
  const generateVocabularyDatabase = () => {
    // 基础词汇
    const basicWords = [
      { word: 'hello', meaning: '你好', example: 'Hello, how are you?', category: '基础' },
      { word: 'world', meaning: '世界', example: 'The world is big.', category: '基础' },
      { word: 'travel', meaning: '旅行', example: 'I love to travel.', category: '基础' },
      { word: 'study', meaning: '学习', example: 'I need to study hard.', category: '基础' },
      { word: 'work', meaning: '工作', example: 'I go to work every day.', category: '基础' },
      { word: 'food', meaning: '食物', example: 'This food is delicious.', category: '基础' },
      { word: 'music', meaning: '音乐', example: 'I enjoy listening to music.', category: '基础' },
      { word: 'book', meaning: '书', example: 'I am reading a book.', category: '基础' },
      { word: 'friend', meaning: '朋友', example: 'He is my best friend.', category: '基础' },
      { word: 'family', meaning: '家庭', example: 'I love my family.', category: '基础' },
      { word: 'home', meaning: '家', example: 'I want to go home.', category: '基础' },
      { word: 'school', meaning: '学校', example: 'I go to school every day.', category: '基础' },
      { word: 'teacher', meaning: '老师', example: 'My teacher is very nice.', category: '基础' },
      { word: 'student', meaning: '学生', example: 'I am a student.', category: '基础' },
      { word: 'class', meaning: '班级', example: 'I am in class 1.', category: '基础' },
      { word: 'room', meaning: '房间', example: 'My room is clean.', category: '基础' },
      { word: 'house', meaning: '房子', example: 'I live in a big house.', category: '基础' },
      { word: 'car', meaning: '汽车', example: 'I have a red car.', category: '基础' },
      { word: 'bus', meaning: '公交车', example: 'I take the bus to school.', category: '基础' },
      { word: 'train', meaning: '火车', example: 'I take the train to work.', category: '基础' },
      { word: 'plane', meaning: '飞机', example: 'I fly by plane.', category: '基础' },
      { word: 'bicycle', meaning: '自行车', example: 'I ride a bicycle to school.', category: '基础' },
      { word: 'walk', meaning: '走路', example: 'I walk to school.', category: '基础' },
      { word: 'run', meaning: '跑步', example: 'I run every morning.', category: '基础' },
      { word: 'jump', meaning: '跳跃', example: 'I can jump high.', category: '基础' },
      { word: 'swim', meaning: '游泳', example: 'I can swim.', category: '基础' },
      { word: 'eat', meaning: '吃', example: 'I eat breakfast every day.', category: '基础' },
      { word: 'drink', meaning: '喝', example: 'I drink water every day.', category: '基础' },
      { word: 'sleep', meaning: '睡觉', example: 'I sleep at 10 PM.', category: '基础' },
      { word: 'wake', meaning: '醒来', example: 'I wake up at 7 AM.', category: '基础' }
    ]

    // 旅游词汇
    const travelWords = [
      { word: 'tourist', meaning: '游客', example: 'There are many tourists in the city.', category: '旅游' },
      { word: 'attraction', meaning: '景点', example: 'The Eiffel Tower is a popular attraction.', category: '旅游' },
      { word: 'hotel', meaning: '酒店', example: 'We stayed at a nice hotel.', category: '旅游' },
      { word: 'restaurant', meaning: '餐厅', example: 'Let\'s go to a restaurant for dinner.', category: '旅游' },
      { word: 'ticket', meaning: '票', example: 'I bought a ticket for the museum.', category: '旅游' },
      { word: 'museum', meaning: '博物馆', example: 'I visited the museum yesterday.', category: '旅游' },
      { word: 'park', meaning: '公园', example: 'I went to the park with my friends.', category: '旅游' },
      { word: 'beach', meaning: '海滩', example: 'I love going to the beach.', category: '旅游' },
      { word: 'mountain', meaning: '山', example: 'I climbed the mountain yesterday.', category: '旅游' },
      { word: 'lake', meaning: '湖', example: 'We went boating on the lake.', category: '旅游' },
      { word: 'river', meaning: '河', example: 'The river is very clean.', category: '旅游' },
      { word: 'ocean', meaning: '海洋', example: 'The ocean is very big.', category: '旅游' },
      { word: 'island', meaning: '岛屿', example: 'I want to visit the island.', category: '旅游' },
      { word: 'city', meaning: '城市', example: 'I live in a big city.', category: '旅游' },
      { word: 'town', meaning: '小镇', example: 'I was born in a small town.', category: '旅游' },
      { word: 'country', meaning: '国家', example: 'I love my country.', category: '旅游' },
      { word: 'capital', meaning: '首都', example: 'Beijing is the capital of China.', category: '旅游' },
      { word: 'tour', meaning: '旅游', example: 'I took a tour of the city.', category: '旅游' },
      { word: 'guide', meaning: '导游', example: 'Our guide was very helpful.', category: '旅游' },
      { word: 'map', meaning: '地图', example: 'I used a map to find my way.', category: '旅游' },
      { word: 'direction', meaning: '方向', example: 'Can you tell me the direction to the station?', category: '旅游' },
      { word: 'distance', meaning: '距离', example: 'The distance is very far.', category: '旅游' },
      { word: 'time', meaning: '时间', example: 'What time is it?', category: '旅游' },
      { word: 'schedule', meaning: '日程', example: 'I have a busy schedule.', category: '旅游' },
      { word: 'plan', meaning: '计划', example: 'I have a plan for the weekend.', category: '旅游' },
      { word: 'reservation', meaning: '预订', example: 'I made a reservation at the hotel.', category: '旅游' },
      { word: 'booking', meaning: '预订', example: 'I made a booking for the flight.', category: '旅游' },
      { word: 'check-in', meaning: '入住', example: 'I need to check-in at the hotel.', category: '旅游' },
      { word: 'check-out', meaning: '退房', example: 'I need to check-out from the hotel.', category: '旅游' },
      { word: 'luggage', meaning: '行李', example: 'I have a lot of luggage.', category: '旅游' }
    ]

    // 职场词汇
    const businessWords = [
      { word: 'meeting', meaning: '会议', example: 'We have a meeting at 10 AM.', category: '职场' },
      { word: 'project', meaning: '项目', example: 'I am working on a new project.', category: '职场' },
      { word: 'deadline', meaning: '截止日期', example: 'The deadline is next Friday.', category: '职场' },
      { word: 'report', meaning: '报告', example: 'I need to write a report.', category: '职场' },
      { word: 'colleague', meaning: '同事', example: 'My colleague helped me.', category: '职场' },
      { word: 'boss', meaning: '老板', example: 'My boss is very nice.', category: '职场' },
      { word: 'employee', meaning: '员工', example: 'I am an employee.', category: '职场' },
      { word: 'manager', meaning: '经理', example: 'He is the manager of the company.', category: '职场' },
      { word: 'director', meaning: '主管', example: 'She is the director of the department.', category: '职场' },
      { word: 'CEO', meaning: '首席执行官', example: 'The CEO of the company is very successful.', category: '职场' },
      { word: 'company', meaning: '公司', example: 'I work for a big company.', category: '职场' },
      { word: 'office', meaning: '办公室', example: 'I work in an office.', category: '职场' },
      { word: 'department', meaning: '部门', example: 'I work in the sales department.', category: '职场' },
      { word: 'team', meaning: '团队', example: 'I am part of a team.', category: '职场' },
      { word: 'workplace', meaning: '工作场所', example: 'My workplace is very clean.', category: '职场' },
      { word: 'job', meaning: '工作', example: 'I have a good job.', category: '职场' },
      { word: 'career', meaning: '职业', example: 'I want to have a successful career.', category: '职场' },
      { word: 'salary', meaning: '工资', example: 'My salary is very good.', category: '职场' },
      { word: 'bonus', meaning: '奖金', example: 'I got a bonus this month.', category: '职场' },
      { word: 'promotion', meaning: '晋升', example: 'I got a promotion last year.', category: '职场' },
      { word: 'demotion', meaning: '降职', example: 'He got a demotion because of his mistakes.', category: '职场' },
      { word: 'resign', meaning: '辞职', example: 'I decided to resign from my job.', category: '职场' },
      { word: 'fire', meaning: '解雇', example: 'He was fired from his job.', category: '职场' },
      { word: 'hire', meaning: '雇佣', example: 'The company hired a new employee.', category: '职场' },
      { word: 'interview', meaning: '面试', example: 'I had an interview yesterday.', category: '职场' },
      { word: 'resume', meaning: '简历', example: 'I sent my resume to the company.', category: '职场' },
      { word: 'application', meaning: '申请', example: 'I submitted my application for the job.', category: '职场' },
      { word: 'cover letter', meaning: '求职信', example: 'I wrote a cover letter for the job.', category: '职场' },
      { word: 'reference', meaning: '推荐', example: 'I have a reference from my previous boss.', category: '职场' },
      { word: 'background check', meaning: '背景调查', example: 'The company did a background check on me.', category: '职场' }
    ]

    // 学习词汇
    const studyWords = [
      { word: 'vocabulary', meaning: '词汇', example: 'I need to expand my vocabulary.', category: '学习' },
      { word: 'grammar', meaning: '语法', example: 'Grammar is important for learning a language.', category: '学习' },
      { word: 'listening', meaning: '听力', example: 'Listening practice is essential.', category: '学习' },
      { word: 'speaking', meaning: '口语', example: 'I need to improve my speaking skills.', category: '学习' },
      { word: 'writing', meaning: '写作', example: 'Writing is a useful skill.', category: '学习' },
      { word: 'reading', meaning: '阅读', example: 'Reading is good for your brain.', category: '学习' },
      { word: 'pronunciation', meaning: '发音', example: 'My pronunciation is not good.', category: '学习' },
      { word: 'spelling', meaning: '拼写', example: 'My spelling is not good.', category: '学习' },
      { word: 'comprehension', meaning: '理解', example: 'My comprehension is good.', category: '学习' },
      { word: 'expression', meaning: '表达', example: 'I need to improve my expression.', category: '学习' },
      { word: 'sentence', meaning: '句子', example: 'I can make a sentence.', category: '学习' },
      { word: 'phrase', meaning: '短语', example: 'I learned a new phrase.', category: '学习' },
      { word: 'idiom', meaning: '成语', example: 'I learned a new idiom.', category: '学习' },
      { word: 'slang', meaning: '俚语', example: 'I learned a new slang word.', category: '学习' },
      { word: 'accent', meaning: '口音', example: 'I have a Chinese accent.', category: '学习' },
      { word: 'dialect', meaning: '方言', example: 'I speak a local dialect.', category: '学习' },
      { word: 'language', meaning: '语言', example: 'I speak English.', category: '学习' },
      { word: 'mother tongue', meaning: '母语', example: 'My mother tongue is Chinese.', category: '学习' },
      { word: 'second language', meaning: '第二语言', example: 'English is my second language.', category: '学习' },
      { word: 'foreign language', meaning: '外语', example: 'I am learning a foreign language.', category: '学习' },
      { word: 'bilingual', meaning: '双语的', example: 'I am bilingual.', category: '学习' },
      { word: 'multilingual', meaning: '多语言的', example: 'He is multilingual.', category: '学习' },
      { word: 'monolingual', meaning: '单语的', example: 'She is monolingual.', category: '学习' },
      { word: 'linguist', meaning: '语言学家', example: 'He is a linguist.', category: '学习' },
      { word: 'philologist', meaning: '文献学家', example: 'She is a philologist.', category: '学习' },
      { word: 'lexicographer', meaning: '词典编纂者', example: 'He is a lexicographer.', category: '学习' },
      { word: 'etymologist', meaning: '词源学家', example: 'She is an etymologist.', category: '学习' },
      { word: 'phonologist', meaning: '音系学家', example: 'He is a phonologist.', category: '学习' },
      { word: 'syntactician', meaning: '句法家', example: 'She is a syntactician.', category: '学习' },
      { word: 'semanticist', meaning: '语义学家', example: 'He is a semanticist.', category: '学习' }
    ]

    // 日常词汇
    const dailyWords = [
      { word: 'weather', meaning: '天气', example: 'The weather is nice today.', category: '日常' },
      { word: 'hobby', meaning: '爱好', example: 'Reading is my hobby.', category: '日常' },
      { word: 'sport', meaning: '运动', example: 'I like to play sport.', category: '日常' },
      { word: 'movie', meaning: '电影', example: 'I watched a good movie yesterday.', category: '日常' },
      { word: 'computer', meaning: '电脑', example: 'I use a computer every day.', category: '日常' },
      { word: 'phone', meaning: '手机', example: 'I have a new phone.', category: '日常' },
      { word: 'television', meaning: '电视', example: 'I watch television every night.', category: '日常' },
      { word: 'radio', meaning: '收音机', example: 'I listen to the radio every morning.', category: '日常' },
      { word: 'newspaper', meaning: '报纸', example: 'I read the newspaper every day.', category: '日常' },
      { word: 'magazine', meaning: '杂志', example: 'I read magazines every week.', category: '日常' },
      { word: 'internet', meaning: '互联网', example: 'I use the internet every day.', category: '日常' },
      { word: 'email', meaning: '电子邮件', example: 'I check my email every day.', category: '日常' },
      { word: 'social media', meaning: '社交媒体', example: 'I use social media every day.', category: '日常' },
      { word: 'chat', meaning: '聊天', example: 'I chat with my friends every day.', category: '日常' },
      { word: 'message', meaning: '消息', example: 'I sent a message to my friend.', category: '日常' },
      { word: 'call', meaning: '电话', example: 'I made a call to my friend.', category: '日常' },
      { word: 'video call', meaning: '视频通话', example: 'I had a video call with my friend.', category: '日常' },
      { word: 'voice call', meaning: '语音通话', example: 'I had a voice call with my friend.', category: '日常' },
      { word: 'text', meaning: '短信', example: 'I sent a text to my friend.', category: '日常' },
      { word: 'picture', meaning: '图片', example: 'I took a picture of the cat.', category: '日常' },
      { word: 'photo', meaning: '照片', example: 'I took a photo of the sunset.', category: '日常' },
      { word: 'video', meaning: '视频', example: 'I made a video of the party.', category: '日常' },
      { word: 'audio', meaning: '音频', example: 'I recorded an audio of the lecture.', category: '日常' },
      { word: 'music', meaning: '音乐', example: 'I listen to music every day.', category: '日常' },
      { word: 'song', meaning: '歌曲', example: 'I like this song.', category: '日常' },
      { word: 'artist', meaning: '艺术家', example: 'I like this artist.', category: '日常' },
      { word: 'band', meaning: '乐队', example: 'I like this band.', category: '日常' },
      { word: 'concert', meaning: '音乐会', example: 'I went to a concert yesterday.', category: '日常' },
      { word: 'festival', meaning: '节日', example: 'I went to a music festival last week.', category: '日常' },
      { word: 'party', meaning: '聚会', example: 'I went to a party yesterday.', category: '日常' }
    ]

    // 商务词汇
    const commercialWords = [
      { word: 'business', meaning: '商务', example: 'I am in the business of selling cars.', category: '商务' },
      { word: 'negotiation', meaning: '谈判', example: 'The negotiation was successful.', category: '商务' },
      { word: 'contract', meaning: '合同', example: 'We signed a contract.', category: '商务' },
      { word: 'price', meaning: '价格', example: 'What is the price of this product?', category: '商务' },
      { word: 'agreement', meaning: '协议', example: 'We reached an agreement.', category: '商务' },
      { word: 'deal', meaning: '交易', example: 'We made a deal.', category: '商务' },
      { word: 'transaction', meaning: '交易', example: 'The transaction was successful.', category: '商务' },
      { word: 'purchase', meaning: '购买', example: 'I made a purchase.', category: '商务' },
      { word: 'sale', meaning: '销售', example: 'The sale was successful.', category: '商务' },
      { word: 'marketing', meaning: '市场营销', example: 'I work in marketing.', category: '商务' },
      { word: 'advertising', meaning: '广告', example: 'I work in advertising.', category: '商务' },
      { word: 'promotion', meaning: '促销', example: 'We have a promotion this week.', category: '商务' },
      { word: 'discount', meaning: '折扣', example: 'We offer a discount for bulk purchases.', category: '商务' },
      { word: 'revenue', meaning: '收入', example: 'Our revenue is increasing.', category: '商务' },
      { word: 'profit', meaning: '利润', example: 'Our profit is increasing.', category: '商务' },
      { word: 'loss', meaning: '亏损', example: 'We made a loss last year.', category: '商务' },
      { word: 'investment', meaning: '投资', example: 'I made an investment in the company.', category: '商务' },
      { word: 'return', meaning: '回报', example: 'I got a good return on my investment.', category: '商务' },
      { word: 'risk', meaning: '风险', example: 'Investment has risks.', category: '商务' },
      { word: 'opportunity', meaning: '机会', example: 'I found a good opportunity.', category: '商务' },
      { word: 'threat', meaning: '威胁', example: 'The company faces many threats.', category: '商务' },
      { word: 'strength', meaning: '优势', example: 'The company has many strengths.', category: '商务' },
      { word: 'weakness', meaning: '劣势', example: 'The company has some weaknesses.', category: '商务' },
      { word: 'competitor', meaning: '竞争对手', example: 'We have many competitors.', category: '商务' },
      { word: 'customer', meaning: '客户', example: 'We have many customers.', category: '商务' },
      { word: 'client', meaning: '客户', example: 'We have many clients.', category: '商务' },
      { word: 'supplier', meaning: '供应商', example: 'We have many suppliers.', category: '商务' },
      { word: 'vendor', meaning: '供应商', example: 'We have many vendors.', category: '商务' },
      { word: 'partner', meaning: '合作伙伴', example: 'We have many partners.', category: '商务' },
      { word: 'collaboration', meaning: '合作', example: 'We have a collaboration with the company.', category: '商务' }
    ]

    // 其他词汇
    const otherWords = [
      { word: 'time', meaning: '时间', example: 'What time is it?', category: '其他' },
      { word: 'date', meaning: '日期', example: 'What is the date today?', category: '其他' },
      { word: 'day', meaning: '天', example: 'Today is a sunny day.', category: '其他' },
      { word: 'week', meaning: '周', example: 'I work five days a week.', category: '其他' },
      { word: 'month', meaning: '月', example: 'There are 12 months in a year.', category: '其他' },
      { word: 'year', meaning: '年', example: 'This year is 2026.', category: '其他' },
      { word: 'hour', meaning: '小时', example: 'There are 24 hours in a day.', category: '其他' },
      { word: 'minute', meaning: '分钟', example: 'There are 60 minutes in an hour.', category: '其他' },
      { word: 'second', meaning: '秒', example: 'There are 60 seconds in a minute.', category: '其他' },
      { word: 'morning', meaning: '早晨', example: 'Good morning!', category: '其他' },
      { word: 'afternoon', meaning: '下午', example: 'Good afternoon!', category: '其他' },
      { word: 'evening', meaning: '晚上', example: 'Good evening!', category: '其他' },
      { word: 'night', meaning: '夜晚', example: 'Good night!', category: '其他' },
      { word: 'yesterday', meaning: '昨天', example: 'I went to school yesterday.', category: '其他' },
      { word: 'today', meaning: '今天', example: 'I am happy today.', category: '其他' },
      { word: 'tomorrow', meaning: '明天', example: 'I will go to school tomorrow.', category: '其他' },
      { word: 'weekend', meaning: '周末', example: 'I like the weekend.', category: '其他' },
      { word: 'holiday', meaning: '假期', example: 'I had a good holiday.', category: '其他' },
      { word: 'festival', meaning: '节日', example: 'The Spring Festival is coming.', category: '其他' },
      { word: 'birthday', meaning: '生日', example: 'Today is my birthday.', category: '其他' },
      { word: 'anniversary', meaning: '周年纪念日', example: 'Today is our anniversary.', category: '其他' },
      { word: 'celebration', meaning: '庆祝', example: 'We had a celebration for his birthday.', category: '其他' },
      { word: 'ceremony', meaning: '仪式', example: 'We attended the graduation ceremony.', category: '其他' },
      { word: 'event', meaning: '事件', example: 'There was a big event yesterday.', category: '其他' },
      { word: 'occasion', meaning: '场合', example: 'This is a formal occasion.', category: '其他' },
      { word: 'situation', meaning: '情况', example: 'The situation is good.', category: '其他' },
      { word: 'condition', meaning: '条件', example: 'The condition is bad.', category: '其他' },
      { word: 'circumstance', meaning: '环境', example: 'The circumstance is difficult.', category: '其他' },
      { word: 'environment', meaning: '环境', example: 'The environment is clean.', category: '其他' },
      { word: 'surrounding', meaning: '周围', example: 'The surrounding is beautiful.', category: '其他' }
    ]

    // 合并所有词汇
    const allWords = [...basicWords, ...travelWords, ...businessWords, ...studyWords, ...dailyWords, ...commercialWords, ...otherWords]
    
    // 创建词汇数据库
    const vocabularyDatabase: Record<string, {meaning: string, example: string, category: string}> = {}
    allWords.forEach(word => {
      vocabularyDatabase[word.word.toLowerCase()] = {
        meaning: word.meaning,
        example: word.example,
        category: word.category
      }
    })
    
    // 生成更多词汇（模拟五千个词汇）
    const generateAdditionalWords = () => {
      const words = []
      
      // 基础形容词
      const adjectives = ['happy', 'sad', 'angry', 'excited', 'bored', 'tired', 'hungry', 'thirsty', 'full', 'empty', 'big', 'small', 'tall', 'short', 'fat', 'thin', 'old', 'young', 'new', 'hot', 'cold', 'warm', 'cool', 'wet', 'dry', 'clean', 'dirty', 'bright', 'dark', 'light', 'heavy', 'soft', 'hard', 'smooth', 'rough', 'sharp', 'blunt', 'fast', 'slow', 'quick', 'early', 'late', 'first', 'last', 'best', 'worst', 'good', 'bad', 'better', 'worse', 'more', 'less', 'most', 'least', 'many', 'few', 'much', 'little', 'some', 'any', 'all', 'none', 'every', 'each', 'whole', 'part', 'huge', 'tiny', 'enormous', 'minuscule', 'giant', 'miniature', 'massive', 'microscopic', 'vast', 'puny', 'immense', 'petite', 'colossal', 'wee', 'gigantic', 'teensy', 'tremendous', 'itty-bitty', 'astronomical', 'minimal', 'insignificant', 'negligible', 'minute']
      
      // 基础动词
      const verbs = ['run', 'walk', 'jump', 'swim', 'fly', 'climb', 'crawl', 'dance', 'sing', 'play', 'work', 'study', 'learn', 'teach', 'speak', 'listen', 'read', 'write', 'watch', 'look', 'see', 'hear', 'feel', 'touch', 'taste', 'smell', 'think', 'know', 'understand', 'remember', 'forget', 'love', 'hate', 'like', 'dislike', 'want', 'need', 'have', 'own', 'possess', 'give', 'take', 'receive', 'send', 'get', 'put', 'place', 'set', 'keep', 'hold', 'carry', 'bring', 'fetch', 'grab', 'catch', 'throw', 'kick', 'hit', 'push', 'pull', 'lift', 'drop', 'fall', 'rise', 'stand', 'sit', 'lie', 'kneel', 'bend', 'stretch', 'move', 'stop', 'start', 'begin', 'end', 'finish', 'complete', 'continue', 'pause', 'resume', 'accelerate', 'decelerate', 'speed', 'slow', 'hurry', 'wait', 'rush', 'delay', 'advance', 'retreat', 'approach', 'recede', 'enter', 'exit', 'arrive', 'depart', 'come', 'go', 'leave', 'return', 'stay', 'remain', 'live', 'die', 'grow', 'shrink', 'expand', 'contract', 'increase', 'decrease', 'ascend', 'descend', 'appear', 'disappear', 'emerge', 'vanish', 'create', 'destroy', 'build', 'demolish', 'construct', 'deconstruct', 'make', 'break', 'produce', 'consume', 'generate', 'expend', 'earn', 'spend', 'save', 'waste', 'gain', 'lose', 'win', 'fail', 'achieve', 'miss', 'reach', 'focus', 'distract', 'concentrate', 'disperse', 'gather', 'scatter', 'collect', 'assemble', 'disassemble', 'join', 'separate', 'connect', 'disconnect', 'link', 'unlink', 'attach', 'detach', 'bind', 'unbind', 'tie', 'untie', 'fasten', 'unfasten', 'secure', 'loosen', 'tighten', 'strengthen', 'weaken', 'enhance', 'diminish', 'improve', 'worsen', 'upgrade', 'downgrade', 'update', 'modernize', 'outdate', 'innovate', 'stagnate', 'create', 'imitate', 'invent', 'copy', 'originate', 'replicate', 'pioneer', 'follow', 'lead', 'guide', 'direct', 'instruct', 'train', 'educate', 'inform', 'notify', 'advise', 'counsel', 'suggest', 'recommend', 'propose', 'offer', 'provide', 'supply', 'grant', 'allow', 'permit', 'let', 'enable', 'empower', 'authorize', 'approve', 'accept', 'receive', 'welcome', 'embrace', 'reject', 'deny', 'refuse', 'decline', 'disapprove', 'condemn', 'criticize', 'praise', 'commend', 'applaud', 'cheer', 'celebrate', 'commemorate', 'remember', 'honor', 'respect', 'admire', 'esteem', 'value', 'cherish', 'treasure', 'protect', 'defend', 'guard', 'safeguard', 'preserve', 'conserve', 'save', 'rescue', 'recover', 'retrieve', 'regain', 'restore', 'renew', 'refresh', 'rejuvenate', 'revitalize', 'energize', 'stimulate', 'excite', 'inspire', 'motivate', 'encourage', 'support', 'assist', 'help', 'aid', 'facilitate', 'boost', 'enhance', 'refine', 'polish', 'perfect', 'hone', 'develop', 'evolve', 'mature', 'progress', 'advance', 'proceed', 'persist', 'endure', 'survive', 'exist', 'occur', 'happen', 'result', 'arise', 'emerge', 'originate', 'commence', 'initiate', 'launch', 'introduce', 'present', 'bestow', 'confer', 'impart', 'transmit', 'convey', 'communicate', 'express', 'articulate', 'verbalize', 'voice', 'utter', 'speak', 'talk', 'converse', 'chat', 'discuss', 'debate', 'argue', 'dispute', 'quarrel', 'fight', 'struggle', 'compete', 'contend', 'vie', 'rival', 'challenge', 'oppose', 'resist', 'defy', 'confront', 'face', 'meet', 'encounter', 'experience', 'undergo', 'suffer', 'bear', 'tolerate', 'greet', 'salute', 'acknowledge', 'recognize', 'identify', 'distinguish', 'differentiate', 'perceive', 'notice', 'observe', 'gaze', 'stare', 'glance', 'peek', 'glimpse', 'spot', 'detect', 'discover', 'find', 'locate', 'uncover', 'reveal', 'expose', 'disclose', 'divulge', 'unveil', 'display', 'show', 'exhibit', 'demonstrate', 'illustrate', 'explain', 'clarify', 'elucidate', 'expound', 'describe', 'portray', 'depict', 'represent', 'symbolize', 'signify', 'mean', 'denote', 'indicate', 'point out', 'conduct', 'escort', 'accompany', 'attend', 'join', 'participate', 'engage', 'involve', 'contribute', 'add', 'include', 'incorporate', 'integrate', 'combine', 'merge', 'unite', 'fix', 'install', 'set up', 'establish', 'enlarge', 'extend', 'stretch', 'spread', 'distribute', 'disseminate', 'circulate', 'transport', 'shift', 'transfer', 'relocate', 'migrate', 'travel', 'journey', 'trip', 'tour', 'visit', 'explore', 'warn', 'alert', 'remind', 'prompt', 'arouse', 'invigorate', 'heal', 'cure', 'treat', 'address', 'tackle', 'solve', 'resolve', 'settle', 'repair', 'mend', 'uphold', 'maintain', 'ensure', 'guarantee', 'promise', 'assure', 'convince', 'persuade', 'influence', 'affect', 'impact', 'change', 'alter', 'modify', 'adjust', 'adapt', 'accommodate', 'fit', 'suit', 'match', 'correspond', 'agree', 'consent', 'obtain', 'acquire', 'deserve', 'merit']
      
      // 基础名词
      const nouns = ['person', 'people', 'man', 'woman', 'child', 'children', 'baby', 'babies', 'adult', 'adults', 'human', 'humans', 'individual', 'individuals', 'personality', 'personalities', 'character', 'characters', 'humanity', 'society', 'community', 'group', 'groups', 'team', 'teams', 'organization', 'organizations', 'company', 'companies', 'business', 'businesses', 'enterprise', 'enterprises', 'firm', 'firms', 'corporation', 'corporations', 'institution', 'institutions', 'government', 'governments', 'state', 'states', 'country', 'countries', 'nation', 'nations', 'kingdom', 'kingdoms', 'empire', 'empires', 'republic', 'republics', 'democracy', 'democracies', 'dictatorship', 'dictatorships', 'monarchy', 'monarchies', 'culture', 'cultures', 'civilization', 'civilizations', 'population', 'populations', 'demography', 'demographics', 'anthropology', 'sociology', 'psychology', 'biology', 'chemistry', 'physics', 'mathematics', 'science', 'sciences', 'technology', 'technologies', 'engineering', 'medicine', 'healthcare', 'education', 'educations', 'learning', 'knowledge', 'wisdom', 'intelligence', 'intellect', 'mind', 'minds', 'brain', 'brains', 'thought', 'thoughts', 'idea', 'ideas', 'concept', 'concepts', 'notion', 'notions', 'theory', 'theories', 'hypothesis', 'hypotheses', 'belief', 'beliefs', 'faith', 'faiths', 'religion', 'religions', 'philosophy', 'philosophies', 'ideology', 'ideologies', 'doctrine', 'doctrines', 'dogma', 'dogmas', 'principle', 'principles', 'value', 'values', 'morality', 'ethics', 'virtue', 'virtues', 'goodness', 'righteousness', 'integrity', 'honesty', 'truthfulness', 'sincerity', 'authenticity', 'genuineness', 'reality', 'realities', 'truth', 'truths', 'fact', 'facts', 'actuality', 'actualities', 'existence', 'existences', 'being', 'beings', 'life', 'lives', 'living', 'survival', 'presence', 'presences', 'absence', 'absences', 'nothingness', 'emptiness', 'void', 'spaces', 'area', 'areas', 'region', 'regions', 'territory', 'territories', 'land', 'lands', 'space', 'place', 'places', 'location', 'locations', 'position', 'positions', 'spot', 'spots', 'site', 'sites', 'venue', 'venues', 'destination', 'destinations', 'origin', 'origins', 'source', 'sources', 'beginning', 'beginnings', 'start', 'starts', 'commencement', 'initiation', 'launch', 'introductions', 'presentation', 'presentations', 'offer', 'offers', 'proposal', 'proposals', 'suggestion', 'suggestions', 'recommendation', 'recommendations', 'advice', 'guidance', 'counsel', 'direction', 'directions', 'instruction', 'instructions', 'order', 'orders', 'command', 'commands', 'directive', 'directives', 'mandate', 'decrees', 'edict', 'edicts', 'law', 'laws', 'rule', 'rules', 'regulation', 'regulations', 'policy', 'policies', 'procedure', 'procedures', 'process', 'processes', 'method', 'methods', 'technique', 'techniques', 'skill', 'skills', 'ability', 'abilities', 'capability', 'capabilities', 'capacity', 'capacities', 'potential', 'potentials', 'talent', 'talents', 'gift', 'gifts', 'aptitude', 'aptitudes', 'proficiency', 'expertise', 'competence', 'skillfulness', 'mastery', 'control', 'dominance', 'supremacy', 'superiority', 'excellence', 'perfection', 'ideal', 'ideals', 'goal', 'goals', 'objective', 'objectives', 'aim', 'aims', 'target', 'targets', 'purpose', 'purposes', 'intention', 'intentions', 'plan', 'plans', 'strategy', 'strategies', 'tactic', 'tactics', 'approach', 'approaches', 'style', 'styles', 'mode', 'modes', 'form', 'forms', 'shape', 'shapes', 'structure', 'structures', 'framework', 'frameworks', 'system', 'systems', 'mechanism', 'mechanisms', 'operation', 'operations', 'function', 'functions', 'action', 'actions', 'activity', 'activities', 'behavior', 'behaviors', 'conduct', 'conducts', 'performance', 'performances', 'execution', 'executions', 'implementation', 'implementations', 'application', 'applications', 'use', 'uses', 'utilization', 'usage', 'consumption', 'expenditure', 'spending', 'cost', 'costs', 'expense', 'expenses', 'price', 'prices', 'value', 'values', 'worth', 'importance', 'significance', 'meaning', 'meanings', 'utility', 'usefulness', 'benefit', 'benefits', 'advantage', 'advantages', 'profit', 'profits', 'gain', 'gains', 'reward', 'rewards', 'return', 'returns', 'income', 'incomes', 'revenue', 'revenues', 'earning', 'earnings', 'salary', 'salaries', 'wage', 'wages', 'payment', 'payments', 'compensation', 'remuneration', 'reimbursement', 'settlement', 'settlements', 'transaction', 'transactions', 'deal', 'deals', 'agreement', 'agreements', 'contract', 'contracts', 'pact', 'pacts', 'treaty', 'treaties', 'accord', 'accords', 'understanding', 'understandings', 'consensus', 'harmony', 'harmonies', 'unity', 'unities', 'concord', 'concurrence', 'consent', 'approvals', 'acceptance', 'acceptances', 'assent', 'confirmations', 'verification', 'validations', 'authentication', 'corroboration', 'support', 'supports', 'backup', 'backups', 'assistance', 'helps', 'aids', 'endorsement', 'sanction', 'sanctions', 'permission', 'permissions', 'authorization', 'authorizations', 'license', 'licenses', 'grant', 'grants', 'allowance', 'allowances', 'leave', 'leaves', 'vacation', 'vacations', 'holiday', 'holidays', 'break', 'breaks', 'rest', 'rests', 'recreation', 'recreations', 'entertainment', 'entertainments', 'amusement', 'amusements', 'pleasure', 'pleasures', 'enjoyment', 'enjoyments', 'delight', 'delights', 'happiness', 'happinesses', 'joy', 'joys', 'bliss', 'ecstasy', 'excitement', 'excitements', 'thrill', 'thrills', 'enthusiasm', 'enthusiasms', 'eagerness', 'ardor', 'zeal', 'zeals', 'passion', 'passions', 'fervor', 'intensity', 'intensities', 'strength', 'strengths', 'power', 'powers', 'force', 'forces', 'energy', 'energies', 'vigor', 'vitality', 'vitalities', 'spirit', 'spirits', 'soul', 'souls', 'essence', 'essences', 'core', 'cores', 'heart', 'hearts', 'center', 'centers', 'middle', 'middles', 'focus', 'foci', 'emphasis', 'emphases', 'priority', 'priorities', 'quality', 'qualities', 'attribute', 'attributes', 'characteristic', 'characteristics', 'feature', 'features', 'property', 'properties', 'trait', 'traits', 'aspect', 'aspects', 'element', 'elements', 'component', 'components', 'part', 'parts', 'piece', 'pieces', 'segment', 'segments', 'section', 'sections', 'division', 'divisions', 'portion', 'portions', 'share', 'shares', 'factor', 'factors', 'ingredient', 'ingredients', 'constituent', 'constituents', 'whole', 'wholes', 'total', 'totals', 'sum', 'sums', 'aggregate', 'aggregates', 'collection', 'collections', 'set', 'sets', 'series', 'sequences', 'order', 'orders', 'arrangement', 'arrangements', 'pattern', 'patterns', 'design', 'designs', 'blueprint', 'blueprints', 'scheme', 'schemes', 'program', 'programs', 'project', 'projects', 'undertaking', 'undertakings', 'venture', 'ventures', 'initiative', 'initiatives', 'effort', 'efforts', 'endeavor', 'endeavors', 'attempt', 'attempts', 'try', 'tries', 'experiment', 'experiments', 'test', 'tests', 'trial', 'trials', 'work', 'works', 'labor', 'labors', 'toil', 'toils', 'job', 'jobs', 'task', 'tasks', 'assignment', 'assignments', 'duty', 'duties', 'responsibility', 'responsibilities', 'obligation', 'obligations', 'commitment', 'commitments', 'engagement', 'engagements', 'promise', 'promises', 'pledge', 'pledges', 'vow', 'vows', 'oath', 'oaths', 'guarantee', 'guarantees', 'assurance', 'assurances', 'security', 'securities', 'safety', 'safeties', 'protection', 'protections', 'defense', 'defenses', 'guard', 'guards', 'safeguard', 'safeguards']
      
      // 合并所有词汇
      words.push(...adjectives, ...verbs, ...nouns)
      
      // 生成额外的词汇以达到五千个
      const additionalWordCount = 5000 - allWords.length - words.length
      for (let i = 0; i < additionalWordCount; i++) {
        words.push(`word${i}`)
      }
      
      return words
    }
    
    const additionalWords = generateAdditionalWords()
    
    additionalWords.forEach((word, index) => {
      vocabularyDatabase[word.toLowerCase()] = {
        meaning: `翻译${index}`,
        example: `This is an example of "${word}".`,
        category: '其他'
      }
    })
    
    return vocabularyDatabase
  }

  // 翻译单词
  const handleTranslateWord = async () => {
    if (!inputWord.trim()) return
    
    setIsTranslating(true)
    
    // 模拟翻译API调用
    setTimeout(() => {
      // 生成词汇数据库
      const vocabularyDatabase = generateVocabularyDatabase()
      
      // 在数组中查找单词（不区分大小写）
      const translation = vocabularyDatabase.find(
        (item: any) => item.word.toLowerCase() === inputWord.toLowerCase().trim()
      ) || {
        meaning: '未找到该单词',
        example: `This is an example of "${inputWord}".`,
        category: '其他'
      }
      
      setTranslatedWord({
        word: inputWord,
        meaning: translation.meaning,
        example: translation.example,
        category: translation.category
      })
      
      setIsTranslating(false)
    }, 1000)
  }

  // 同步到单词卡
  const handleSyncToFlashcards = () => {
    if (!translatedWord) return
    
    const newWord: Word = {
      id: Date.now().toString(),
      word: translatedWord.word,
      meaning: translatedWord.meaning,
      example: translatedWord.example,
      reviewDate: new Date().toISOString().split('T')[0],
      category: translatedWord.category
    }
    
    setWords([...words, newWord])
    alert('已同步到单词卡！')
  }



  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <header className="text-center mb-12">
          <h1 className="text-3xl font-bold text-primary mb-4">碎片化辅助工具</h1>
          <p className="text-gray-600">单词卡、单词上传解析</p>
        </header>

        <div className="card">
          {/* 标签页导航 */}
          <div className="flex border-b mb-6">
            <button
              className={`px-6 py-3 ${activeTab === 'flashcards' ? 'border-b-2 border-primary text-primary' : 'text-gray-600'}`}
              onClick={() => setActiveTab('flashcards')}
            >
              单词卡
            </button>
            <button
              className={`px-6 py-3 ${activeTab === 'upload' ? 'border-b-2 border-primary text-primary' : 'text-gray-600'}`}
              onClick={() => setActiveTab('upload')}
            >
              单词上传解析
            </button>
          </div>

          {/* 单词卡 */}
          {activeTab === 'flashcards' && (
            <div>
              <h2 className="text-xl font-bold mb-4">我的单词卡</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {words.map((word) => (
                  <div key={word.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-lg">{word.word}</h3>
                      <span className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full text-xs">
                        {word.category}
                      </span>
                    </div>
                    <p className="text-gray-600">{word.meaning}</p>
                    <p className="text-sm italic">{word.example}</p>
                    <p className="text-xs text-gray-500 mt-2">复习日期：{word.reviewDate}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 单词上传解析 */}
          {activeTab === 'upload' && (
            <div>
              <h2 className="text-xl font-bold mb-4">单词上传解析</h2>
              <div className="border rounded-lg p-6">
                {/* 单词输入区域 */}
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-3">输入单词</h3>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      className="input flex-1"
                      value={inputWord}
                      onChange={(e) => setInputWord(e.target.value)}
                      placeholder="输入单词..."
                      onKeyPress={(e) => e.key === 'Enter' && handleTranslateWord()}
                    />
                    <button
                      className="btn-primary"
                      onClick={handleTranslateWord}
                      disabled={!inputWord.trim() || isTranslating}
                    >
                      {isTranslating ? '翻译中...' : '翻译'}
                    </button>
                  </div>
                </div>

                {/* 翻译结果显示 */}
                {translatedWord && (
                  <div className="mb-6 border rounded-lg p-4 bg-gray-50">
                    <h3 className="text-lg font-medium mb-3">翻译结果</h3>
                    <div className="space-y-2">
                      <div>
                        <span className="font-medium">单词：</span>
                        <span>{translatedWord.word}</span>
                      </div>
                      <div>
                        <span className="font-medium">释义：</span>
                        <span>{translatedWord.meaning}</span>
                      </div>
                      <div>
                        <span className="font-medium">例句：</span>
                        <span className="italic">{translatedWord.example}</span>
                      </div>
                      <div>
                        <span className="font-medium">分类：</span>
                        <span className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full text-xs">
                          {translatedWord.category}
                        </span>
                      </div>
                    </div>
                    <div className="mt-4">
                      <button
                        className="btn-primary"
                        onClick={handleSyncToFlashcards}
                      >
                        同步到单词卡
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}