import prisma from "@/app/lib/prisma"
import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"

export async function POST(request: Request) {
    try{
        const body = await request.json()
        const {email, password} = body
        if(!email || !password) {
            return new Response(JSON.stringify({error: "you need to enter email or password my man"}), {
                status: 400,
                headers: {
                    'Content-Type': "application/json"
                }
            })
        }
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })
        if(user){
            return new Response(JSON.stringify({error: "there is already email assosicated with this email"}), {
                status: 400,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        }
        const passwordHash = bcrypt.hashSync(password, 10)
        const userCreation = await prisma.user.create({
            data: {
                email,
                passwordHash
            }
        })
        return NextResponse.json(userCreation, {status: 201})
    }catch(error){
        console.error("Failed to create the user", error); //can show the error of the conosle by console.error
        return new Response(JSON.stringify({error: "Internal Baya kötü bişi oldu"}), {
            status: 500,
            headers: {
                "Content-Type": "application.json"
            }
        })

    }
}