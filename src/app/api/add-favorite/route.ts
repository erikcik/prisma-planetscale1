import prisma from "@/app/lib/prisma"


export async function POST(request: Request) {
    const body = await request.json()
    const {userId, postId} = body
    console.log(userId)

    await prisma.user.update({
        where: {
            id: userId
        },
        data: {
            favoritePosts: {
                connect: {
                    id: postId
                }
            }
        }
    })
}