import { productSchema } from "~/utils/validations"
import db from '~/utils/db'

export default defineEventHandler(async (event) => {
    await requireUserSession(event)
    const session = await getUserSession(event)
    // console.log("session", session)
    if(session.user && session.user.role === 'ADMIN') {
        const { name, categoryId, sizeId, colorId, images, isArchived, isFeatured, price } = await readValidatedBody(event, (body) => productSchema.parse(body))
        const product = await db.product.create({
            data: {
                name,
                price,
                categoryId,
                colorId,
                sizeId,
                images: {
                    createMany: {
                        data: [
                            ...images.map(img => img)
                        ]
                    }
                },
                isFeatured,
                isArchived,
                userId: session.user.id
            }
        })
        return product
    } else {
        throw createError({
            statusCode: 401,
            statusMessage: "Unauthorized. You don't have admin access"
        })
    }
    return null
})