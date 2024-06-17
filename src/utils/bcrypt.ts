import bcrypt from 'bcrypt'

const saltRounds = 10

export const hashPassword = (password: string) => bcrypt.hashSync(password, saltRounds)

export const comparePassword = (password: string, hash: string) => bcrypt.compareSync(password, hash)
