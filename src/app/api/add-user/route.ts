import prisma from "@/app/lib/prisma"
import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import crypto from "crypto"
import { sendEmail } from "@/app/actions/email-send"
import { VerifyEmailTemplate } from "@/app/email-templates/verification-email"

function GetRandomisedProfilePictures() {
    const randomImages = [
      "https://erayblog.s3.eu-north-1.amazonaws.com/indir.jpg",
      "https://erayblog.s3.eu-north-1.amazonaws.com/indir+(3).jpg",
      "https://erayblog.s3.eu-north-1.amazonaws.com/indir+(2).jpg",
      "https://erayblog.s3.eu-north-1.amazonaws.com/indir+(1).jpg",
      "https://erayblog.s3.eu-north-1.amazonaws.com/814fdf56146a585f6395f871ef919415.jpg",
    ];
    const randomIndex = Math.floor(Math.random() * randomImages.length);
    return randomImages[randomIndex];
  }

export async function POST(request: Request) {
    try{
        const body = await request.json()
        const {email, password, imageUrl} = body
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
                passwordHash,
                profilePicture: imageUrl || GetRandomisedProfilePictures()
            }
        })
        const emailVerificationToken = crypto.randomBytes(32).toString("base64url"); //base64url is safe for browser to read
    
        await prisma.user.update({
            where: {
                id: userCreation.id
            },
            data: {
                emailVerificationToken: emailVerificationToken,
            }
        })
        await sendEmail({
            from: "Admin <admin@eraybaydemir.com>",
            to: [email],
            subject: "Verify your email adress",
            react: VerifyEmailTemplate({ email, emailVerificationToken}) as React.ReactElement,
          });
        return NextResponse.json(userCreation, {status: 201,})
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