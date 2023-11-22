"use server"

import prisma from "../lib/prisma"
import crypto from "crypto"
import { sendEmail } from "./email-send";
import { ResetPasswordEmailTemplate } from "../email-templates/reset-password-email";

export const resetPassword = async (email: string) => {
    console.log("Resetting the password for " + email);

    const user = await prisma.user.findUnique({
        where: {
            email,
        }
    })
    if(!user) {
        throw new Error("User not Found");
    }

    const resetPasswordToken = crypto.randomBytes(32).toString("base64url"); //base64url is safe for browser to read
    const today = new Date();
    const expiryDate= new Date(today.setDate(today.getDate() + 1 ));

    await prisma.user.update({
        where: {
            id: user.id
        },
        data: {
            resetPasswordToken: resetPasswordToken,
            resetPasswordTokenExpiry: expiryDate
        }
    })
    await sendEmail({
        from: "Admin <admin@eraybaydemir.com>",
        to: [email],
        subject: "Reset your password",
        react: ResetPasswordEmailTemplate({ email, resetPasswordToken}) as React.ReactElement,
      });
      return "Password reset email sent"
    
}