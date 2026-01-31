import { User } from './types'
import { hashPassword } from './utils'
import { readFileSync, writeFileSync, existsSync } from 'fs'
import { join } from 'path'

interface StoredUser extends Omit<User, 'createdAt'> {
  password: string
  createdAt: string
}

const USERS_FILE = join(process.cwd(), 'data', 'users.json')

function ensureDataDir() {
  const dataDir = join(process.cwd(), 'data')
  if (!existsSync(dataDir)) {
    require('fs').mkdirSync(dataDir, { recursive: true })
  }
}

function loadUsers(): StoredUser[] {
  ensureDataDir()
  if (existsSync(USERS_FILE)) {
    try {
      const data = readFileSync(USERS_FILE, 'utf8')
      return JSON.parse(data)
    } catch (error) {
      console.error('Error loading users:', error)
      return []
    }
  }
  return []
}

function saveUsers(users: StoredUser[]) {
  ensureDataDir()
  try {
    writeFileSync(USERS_FILE, JSON.stringify(users, null, 2))
  } catch (error) {
    console.error('Error saving users:', error)
  }
}

export async function createUser(email: string, password: string, name: string): Promise<User> {
  const users = loadUsers()
  const existingUser = users.find(user => user.email === email)
  if (existingUser) {
    throw new Error('Email already exists')
  }

  const hashedPassword = await hashPassword(password)
  const newUser: StoredUser = {
    id: Date.now().toString(),
    email,
    name,
    password: hashedPassword,
    createdAt: new Date().toISOString()
  }

  users.push(newUser)
  saveUsers(users)
  return {
    id: newUser.id,
    email: newUser.email,
    name: newUser.name,
    createdAt: new Date(newUser.createdAt)
  }
}

export function getUserByEmail(email: string): StoredUser | undefined {
  const users = loadUsers()
  return users.find(user => user.email === email)
}

export function getUserById(id: string): User | undefined {
  const users = loadUsers()
  const user = users.find(user => user.id === id)
  if (user) {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      createdAt: new Date(user.createdAt)
    }
  }
  return undefined
}
