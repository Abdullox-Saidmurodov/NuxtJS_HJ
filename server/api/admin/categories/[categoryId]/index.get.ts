import db from '~/utils/db'

export default defineEventHandler(async (event) => {
    // await console.log("event.context.params", event.context)
    const category = await db.category.findUnique({
        where: {
            id: event.context.params?.categoryId
        }
    })
    console.log(category)
    return category
    // return '1'
})