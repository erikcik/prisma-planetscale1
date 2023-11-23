import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";

type visitProps = {
    id: string;
    postId: string;
    userId: string;
    visitedAt: Date;
}

export async function POST(request: Request) {
    const body = await request.json();
    const {userId, postId} = body

    try{
        const visit : visitProps = await prisma.postView.create({
            data: {
                userId,
                postId
            }
        })
        return NextResponse.json(visit, {status: 200})
    } catch(error){
        return  new Response(JSON.stringify({error: "Failed to add a view for post bruh "}), {
            status: 404,
            headers: {
                'Content-Type' : 'application/json'
            }
        })
    }

}