import { getServerSession } from "next-auth";
import Link from "next/link";
import React, { useState } from "react";
import { authOptions } from "../../utils/authOptions";
import TestEmailButton from "../email/TestEmailButton";
import { getUsers } from "@/app/actions/get-users";
import prisma from "@/app/lib/prisma";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookOpen } from "@fortawesome/free-solid-svg-icons/faBookOpen";

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
    <div className="w-full px-2 py-4 bg-black flex justify-between gap-4 text-gray-400 font-medium">
      <Link href={"/"}>
        <div className="bg-white w-[48px] h-[48px]"></div>
      </Link>

      <div className="flex justify-center items-center">
        <Link href={"/pages/protected/dashboard"}>Go to dashboard</Link>
        <div className="flex "></div>
        {session && session.user?.email ? (
          <div className=" flex">
            <Link href={"/pages/auth/signOut"}>Sign Out pussy</Link>
            <p> Signed in as {session.user?.email}</p>
          </div>
        ) : (
          <>
            <Link href={"/pages/auth/signIn"}> Sign In</Link>
            <Link href={"/pages/auth/signUp"}> Sign Up</Link>
          </>
        )}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={45}
          height={45}
          fill="none"
          className="fill-current  text-blue-500 hover:text-red-500"
        >
          <path d="m37.699 2.678 3.147 3.148c.87.87.87 2.276 0 3.147l-9.598 9.62v21.583H6.696V6.696h23.815l4.018-4.018c.893-.87 2.299-.892 3.17 0ZM25.065 21.606 37.051 9.642l-3.17-3.17L21.919 18.46l-1.584 4.732 4.731-1.585Z" />
        </svg>

        {/* <Link href={"/pages/profile/" + userSession?.id}>Enter Profile</Link>
        <TestEmailButton /> */}
      </div>
    </div>
  );
};

export default Navbar;
