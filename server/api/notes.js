import { serverSupabaseUser } from "#supabase/server"
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    const user = await serverSupabaseUser(event)
    if (!user) {
        throw createError({statusCode: 401, message: 'Unauthorized'})
    }

    const data = await prisma.notes.findMany({
        where: {
            users_id: user.id
        },
        select: {
            content: true,
            id: true,
        }
    })

    return data
})