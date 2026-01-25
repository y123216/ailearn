import { User } from './types'
import { hashPassword } from './utils'

interface StoredUser extends User {
  password: string
}

let users: StoredUser[] = []

export async function createUser(email: string, password: string, name: string): Promise<User> {
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
    createdAt: new Date()
  }

  users.push(newUser)
  return {
    id: newUser.id,
    email: newUser.email,
    name: newUser.name,
    createdAt: newUser.createdAt
  }
}

export function getUserByEmail(email: string): StoredUser | undefined {
  return users.find(user => user.email === email)
}

export function getUserById(id: string): User | undefined {
  const user = users.find(user => user.id === id)
  if (user) {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      createdAt: user.createdAt
    }
  }
  return undefined
}
