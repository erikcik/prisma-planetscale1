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

      <div className="flex justify-center items-center gap-4">
        <Link
          href={"/blog"}
          className="hover:text-gray-200 transition-all duration-500"
        >
          Blog
        </Link>
        <Link
          href={"/diary"}
          className="hover:text-gray-200 transition-all duration-500"
        >
          Diary
        </Link>
        <Link
          href={"/projects"}
          className="hover:text-gray-200 transition-all duration-500"
        >
          Projects
        </Link>
        <div className="flex pt-2 ">
          <Link href="/chat" className="mr-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={20}
              height={20}
              viewBox="0 0 64 64"
              className="fill-current text-white opacity-70 hover:opacity-100 transition-all duration-100"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M13.3333 5.33333H50.6667C55.0849 5.33333 58.6667 8.91505 58.6667 13.3333V40C58.6667 44.4183 55.0849 48 50.6667 48H48V56C47.9946 57.0765 47.3425 58.0443 46.3467 58.4533C46.0302 58.6026 45.6831 58.6757 45.3333 58.6667C44.6245 58.6708 43.9432 58.3925 43.44 57.8933L33.5733 48H13.3333C8.91505 48 5.33333 44.4183 5.33333 40V13.3333C5.33333 8.91505 8.91505 5.33333 13.3333 5.33333ZM50.6667 42.6667C52.1394 42.6667 53.3333 41.4728 53.3333 40V13.3333C53.3333 11.8606 52.1394 10.6667 50.6667 10.6667H13.3333C11.8606 10.6667 10.6667 11.8606 10.6667 13.3333V40C10.6667 41.4728 11.8606 42.6667 13.3333 42.6667H34.6667C35.3755 42.6626 36.0567 42.9408 36.56 43.44L42.6667 49.5733V45.3333C42.6667 43.8606 43.8606 42.6667 45.3333 42.6667H50.6667Z"
              />
            </svg>
          </Link>
          <Link href={"https://twitter.com/eray_bayde79492"} className="mr-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={20}
              height={25}
              viewBox="0 0 64 64"
              className="fill-current text-white opacity-70 hover:opacity-100 transition-all duration-100"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                className="flex justify-center items-center"
                d="M17.982 24.344 0 2h14.243l11.1 13.81L37.2 2.062h7.844L29.135 20.53 48 44H33.8L21.78 29.065 8.95 43.96H1.063l16.919-19.615ZM35.87 39.86 8.733 6.14h3.438l27.103 33.72H35.87Z"
              />
            </svg>
          </Link>
          <Link href={"https://github.com/erikcik"}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={20}
              height={25}
              viewBox="0 0 64 64"
              className="fill-current text-white opacity-70 hover:opacity-100 transition-all duration-100"
            >
              <path
                fillRule="evenodd"
                d="M23.998 0C10.745 0 0 10.745 0 24c0 10.604 6.876 19.6 16.413 22.774 1.2.22 1.638-.521 1.638-1.158 0-.569-.02-2.079-.032-4.081-6.676 1.45-8.084-3.218-8.084-3.218-1.092-2.771-2.666-3.51-2.666-3.51-2.179-1.489.165-1.46.165-1.46 2.41.172 3.676 2.474 3.676 2.474 2.141 3.668 5.618 2.608 6.986 1.995.218-1.551.836-2.609 1.523-3.209-5.33-.605-10.932-2.665-10.932-11.862 0-2.62.935-4.761 2.47-6.44-.247-.607-1.07-3.046.235-6.351 0 0 2.015-.645 6.6 2.46 1.914-.531 3.968-.798 6.009-.807 2.037.009 4.091.276 6.008.807 4.582-3.105 6.593-2.46 6.593-2.46 1.31 3.305.486 5.744.239 6.351 1.538 1.679 2.468 3.82 2.468 6.44 0 9.22-5.612 11.25-10.959 11.843.862.741 1.63 2.206 1.63 4.445 0 3.208-.03 5.796-.03 6.583 0 .642.432 1.39 1.65 1.155 9.53-3.18 16.4-12.17 16.4-22.77C48 10.745 37.253 0 23.998 0Z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
          {session && session.user?.email ? (
            <div className="flex">
              <Link href={"/pages/auth/signOut"}>Sign Out pussy</Link>
              <Link href={"/pages/profile/" + userSession?.id}></Link>

              {/* <p> Signed in as {session.user?.email}</p> */}
            </div>
          ) : (
            <Link href={"/auth-page"} className="pt-[2px] pl-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={16}
                height={16}
                fill="none"
                className="fill-current text-white opacity-70 hover:opacity-100 transition-all duration-100"
              >
                <path
                  fillRule="evenodd"
                  d="M11.333 4.667A3.333 3.333 0 1 0 8 8h-.667a6 6 0 0 0-6 6c0 .368.299.667.667.667h12a.667.667 0 0 0 .667-.667 6 6 0 0 0-6-6H8a3.333 3.333 0 0 0 3.333-3.333Zm-4 4.666a4.667 4.667 0 0 0-4.62 4h10.574c-.332-2.296-2.3-4-4.62-4H7.333ZM6 4.667a2 2 0 1 0 4 0 2 2 0 0 0-4 0Z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          )}
        </div>

        {/* <Link href={"/pages/profile/" + userSession?.id}>Enter Profile</Link>
        <TestEmailButton /> */}
      </div>
    </div>
  );
};

export default Navbar;
