import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
//put object command is to upload the objects to the s3 bucket
import { NextResponse } from "next/server"

const s3Client = new S3Client({
    region: process.env.AWS_S3_REGION,
    credentials: {
        accessKeyId: process.env.AWS_S3_ACCESS_KEY_IAM_PUBLIC,
        secretAccessKey: process.env.AWS_S3_ACCESS_KEY_IAM_PRIVATE,
    }
})

async function uploadFileToS3(file , fileName){
    const fileBuffer = file
    console.log(fileName)

     const params = {
         Bucket: process.env.AWS_S3_BUCKET_NAME,
         Key: `${fileName}`, //if I want to create folders withing the s3 bucket to utilize the s3 bucket for different project
         //i can add file/ to initilize the folder name
         Body: fileBuffer,
         ContentType: "image/jpeg"
     }

     const command = new PutObjectCommand(params)

     await s3Client.send(command)
     return fileName
}

export async function POST(request) {
    try{
        const formData = await request.formData()
        const file = formData.get("file") //requesting to getting th data with file format that should be named speciffly file when sending

        if(!file){
            return NextResponse.json({error: "File is required"}, {status: 400})
        }

        const buffer = Buffer.from(await file.arrayBuffer())
        const fileName = await uploadFileToS3(buffer,file.name)

        return NextResponse.json({success: true, imageUrl: `https://erayblog.s3.eu-north-1.amazonaws.com/${fileName}`})

    }catch(error){
        return NextResponse.json(error)
    }
}