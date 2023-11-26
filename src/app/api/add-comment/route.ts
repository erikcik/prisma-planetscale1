import prisma from "@/app/lib/prisma"
import { NextResponse } from "next/server"



export async function POST(request: Request) {
    const body = await request.json()

    const {title, content, rating, userId, postId} = body
    console.log("APi bruh"+ title, content, rating)

    const comment : any = await prisma.comments.create({
        data: {
            title,
            content,
            rating, 
            userId,
            postId
        }
    })
    return new NextResponse(comment, {status: 201})
}   