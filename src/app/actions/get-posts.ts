"use server"
import prisma from "../lib/prisma";


export async function getPosts() {
        try {
              const posts = await prisma.post.findMany()
        return posts   
        } catch (error) {
             console.log(error)   
        }
       
}