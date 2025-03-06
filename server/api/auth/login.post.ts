import { authSchema } from "~/utils/validations"
import db from '~/utils/db'
import { sanitizeUser } from '~/server/utils/auth'


export default defineEventHandler(async(event) => {
    const { name, password, email } = await readValidatedBody(event, (body) => authSchema.parse(body))
    const existingUser = await db.user.findUnique({
        where: {
            email,
        }
    })
    if(!existingUser) {
        throw createError({
            status: 400,
            statusMessage: 'User Not Found'
        })
    }
    if(!existingUser.hashedPassword) {
        const connectedOAuthAccount = await db.oauthAccount.findFirst({
            where: {
                userId:existingUser.id
            }
        })
        if(!connectedOAuthAccount) {
            const oAuthProvider = connectedOAuthAccount.providerId

            throw createError({
                statusCode: 400,
                statusMessage: `Account connected with ${oAuthProvider}. Please continue with ${oAuthProvider} to login`
            })
        }
    }
    if(existingUser.hashedPassword) {
        const isPasswordCorrect = await verifyPassword(existingUser.hashedPassword, password)
        if(!isPasswordCorrect) {
            throw createError({
                status: 400,
                statusMessage: 'Invalid Credentials'
            })
        }
    }

    const transformedUser = sanitizeUser(existingUser)
    if(transformedUser) {
        await setUserSession(event, {
            user: transformedUser
        })
    }

    return transformedUser
})