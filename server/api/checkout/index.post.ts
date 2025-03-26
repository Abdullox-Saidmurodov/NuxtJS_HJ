import db from "~/utils/db"

export default defineEventHandler(async(event) => {
    const productIds = await readBody(event)
    if(!productIds || !productIds.length) {
        throw createError({
            statusCode: 400,
            statusMessage:'Products ids are required'
        })
    }
    const products = await db.product.findMany({
        where: {
            id: {
                in: productIds
            }
        }
    })
    const order = await db.order.create({
        data: {
            isPaid: false,
            orderItems: {
                create: productIds.map((productId: string) => ({
                    product: {
                        connect: {
                            id: productId
                        }
                    }
                }))
            }
        }
    })
    // Stripe Session
    return order
})