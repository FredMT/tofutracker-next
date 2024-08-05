import { PrismaClient } from '@prisma/client'

const prismaClientSingleton = () => {
  return new PrismaClient()
}

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>

declare global {
  var prismaGlobal: PrismaClientSingleton | undefined
}

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

export const db = prisma

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma
