"use server"

import prisma from "../lib/prisma"


export async function getSingleUser(singleId: string){

    const user = await prisma.user.findUnique({
        where: {
            id: singleId
        },
        include: {
            friends: true,
            friendOf: true
        }
    })
    return user

}