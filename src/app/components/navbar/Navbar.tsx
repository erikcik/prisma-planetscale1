import { getServerSession } from "next-auth";
import Link from "next/link";
import React, { useState } from "react";
import { authOptions } from "../../utils/authOptions";
import TestEmailButton from "../email/TestEmailButton";
import { getUsers } from "@/app/actions/get-users";
import prisma from "@/app/lib/prisma";

const Navbar = async () => {
  const session = await getServerSession(authOptions);
  const sessionEmail = session?.user?.email;
  if (sessionEmail === null) {
    console.log("session not found yet");
  }
  let userSession;
  if (sessionEmail) {
    userSession = await prisma.user.findUnique({
      where: {
        email: sessionEmail,
      },
    });
  }

  return (
    <div className="w-full px-4 py-8 bg-red-400 flex justify-between gap-4">
      <Link href="/"> Home</Link>
      <Link href={"/pages/protected/dashboard"}>Go to dashboard</Link>

      {session && session.user?.email ? (
        <>
          <Link href={"/pages/auth/signOut"}>Sign Out pussy</Link>
          <p> Signed in as {session.user?.email}</p>
        </>
      ) : (
        <>
          <Link href={"/pages/auth/signIn"}> Sign In</Link>
          <Link href={"/pages/auth/signUp"}> Sign Up</Link>
        </>
      )}

      <Link href={"/pages/profile/" + userSession?.id}>Enter Profile</Link>
      <TestEmailButton />
    </div>
  );
};

export default Navbar;