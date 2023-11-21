import prisma from "@/app/lib/prisma";
import { Account, AuthOptions, Profile, Session, User } from "next-auth";
import  CredentialsProvider  from "next-auth/providers/credentials";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { JWT } from "next-auth/jwt";
import NextAuth from "next-auth/next";
export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",

            credentials: {
                email: {
                    label: "Email",
                    type: "text",
                    placeholder: "your@gmail.com"
                },
                password: {
                    label: "Password",
                    type: "password"
                }

            },
            authorize: async (credentials) => {
                if(!credentials) {
                    return null
                }
                const {email, password} = credentials;

                const user = await prisma.user.findUnique({
                    where: {
                        email
                    }
                })
                if(!user){
                    return null
                }

                const userPassword = user.passwordHash;

                const validatePassword = bcrypt.compareSync(password, userPassword)
                if(!validatePassword) {
                    return null
                }
                return user
            }   
        })
    ],
    pages: {
        signIn: "/pages/auth/signIn",
        signOut: "/pages/auth/signOut"
    },
    secret: process.env.NEXTAUTH_SECRET,
    jwt: {
        async encode({secret, token}) {
            if(!token) {
                throw new Error("there is no token to encode and make hashed token")
            }
            const encodedToken=  jwt.sign(token, secret) //encoding the token wtih the secret key we obtain from .env file
            return encodedToken
        },
        async decode({secret, token}){
            if(!token) {
                throw new Error("there is no to token to decode and decrypt the token ")
            }
            const decodedToken = jwt.verify(token,secret); //decoding the token with the same secret string you encoded with to obtain from .env file 
            if(typeof decodedToken === "string"){ // there is a chanche that decoded token can aslo be plain string so to change that, we parse the decoded token with JSON parse
                return JSON.parse(decodedToken)
            } else{
                return decodedToken
            }
        }
    },
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60,
        updateAge: 24 * 60 * 60
    },
    callbacks: {
        async session( params: {session: Session, token: JWT, user: User}) {
            if(params.session.user){
                params.session.user.email = params.token.email;
            }
            return params.session
        },
        async jwt( params: {
            token: JWT;
            user?: User | undefined;
            account?: Account | null | undefined;
            profile?: Profile | undefined;
            isNewUser?: boolean | undefined;
        }) {
            if(params.user){
                params.token.email = params.user.email
            }

            return params.token
        }
    }
}

const handler = NextAuth(authOptions);

export {handler as GET, handler as POST}