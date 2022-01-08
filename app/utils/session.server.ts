import bcrypt from 'bcrypt'
import { db } from './db.server'
import { createCookieSessionStorage } from 'remix'

// Login user
export const login = async ({
  username,
  password
}: {
  username: any
  password: any
}) => {
  const user = await db.user.findUnique({
    where: {
      username
    }
  })

  if (!user) return null

  // Check password
  const isCorrectPassword = await bcrypt.compare(password, user.passwordHash)

  if (!isCorrectPassword) return null

  return user
}
