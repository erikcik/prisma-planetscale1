import prisma from "@/app/lib/prisma"


export async  function POST(request: Request) {
    const body = await request.json()
    console.log(body)
    const {title, content} = await body

    const post = await prisma.post.create({
        data: {
            title,
            content,
            
        }
    })
}