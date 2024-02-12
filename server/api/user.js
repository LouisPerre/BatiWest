import { serverSupabaseUser } from '#supabase/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    const user = await serverSupabaseUser(event)
    if (!user) {
        throw createError({statusCode: 401, message: 'Unauthorized'})
    }

    const data = await prisma.profiles.findUnique({
        where: {
            id: user.id
        }
    })

    return data
})