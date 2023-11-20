"use server"

import prisma from "../lib/prisma"

export async function getSinglePost(singleId: string) {
    
    const post = await prisma.post.findUnique({
        where: {
            id: singleId
        }
    })
    return post
} 