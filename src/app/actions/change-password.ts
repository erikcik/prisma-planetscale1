"use server";

import prisma from "../lib/prisma";
import bcrypt from "bcryptjs"

export const changePassword = async (
  resetPasswordToken: string,
  password: string
) => {
  const user = await prisma.user.findUnique({
    where: {
      resetPasswordToken,
    },
  });
  if (!user) {
    throw new Error("user not found big error");
  }

  const resetPasswordTokenExpiry = user.resetPasswordTokenExpiry;
  if(!resetPasswordTokenExpiry){
    throw new Error("token expiry date is present man")
  }
  const today = new Date();

  if (today > resetPasswordTokenExpiry) {
    throw new Error("token is expired probably");
  }
  const passwordHash = bcrypt.hashSync(password, 10);

  await prisma.user.update({
    where: {
      id: user.id
    },
    data: {
      passwordHash,
      resetPasswordToken: null,
      resetPasswordTokenExpiry: null
    }
  })
  return "password changed scuessfully"
};
