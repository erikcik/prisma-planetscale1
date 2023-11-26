import prisma from "@/app/lib/prisma"
import { NextResponse } from "next/server"


export async  function POST(request: Request) {
    const body = await request.json()
    console.log(body)
     const {title, content, authorEmail, imageUrl} = await body
     const user = await prisma.user.findUnique({
         where: {
             email: authorEmail
         }
     })
     if(!user){
         return new Response(JSON.stringify({error: "User not found"}), {
             status: 404,
             headers: {
                 'Content-Type': 'application/json'
             }
         })
     }
     const post = await prisma.post.create({
         data: {
             title,
             content,
             authorId: user.id,
            imageUrl
         }
     })

     return NextResponse.json(post , {status: 200})
}