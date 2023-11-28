import { getSinglePost } from "@/app/actions/get-single-post";
import AddFavoriteButton from "@/app/components/AddFavoriteButton";
import SetVisitedUser from "@/app/components/SetVisitedUser";
import AddCommentBool from "@/app/components/post/AddCommentBool";
import AddCommentForm from "@/app/components/post/AddCommentForm";
import prisma from "@/app/lib/prisma";
import { authOptions } from "@/app/utils/authOptions";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const page = async ({ params }: { params: { id: string } }) => {
  const session = await getServerSession(authOptions);
  const sessionEmail = session?.user?.email;
  let userCreated;
  if (sessionEmail) {
    userCreated = await prisma.user.findUnique({
      where: {
        email: sessionEmail,
      },
    });
  }
  const sessionEmailId = userCreated?.id;
  const post = await getSinglePost(params.id);
  const postId = post?.id;
  // const visitedUsers = await getVisitedPostUsers(sessionEmailId);
  const visitedUsers = await prisma.postView.findMany({
    where: {
      postId: params.id,
    },
    include: {
      user: true,
    },
  });
  const isDuplicate = visitedUsers.some(
    (visits) => visits.user.id === sessionEmailId
  );

  return (
    <div>
      <div> {post?.title}</div>
      <Image
        src={post?.imageUrl ? post?.imageUrl : ""}
        width={500}
        height={500}
        alt="bruuuuh"
      ></Image>
      <div className=""></div>
      <AddFavoriteButton userId={sessionEmailId} postId={params.id} />
      {
        <AddCommentBool>
          {session && session?.user?.email ? (
            <AddCommentForm userId={sessionEmailId} postId={params.id} />
          ) : (
            <>
              <div> Man pls sign up to add a comment</div>
              <Link href={"/pages/auth/signUp"} className="text-2xl font-bold">
                Go to sign Up page my man
              </Link>
            </>
          )}
        </AddCommentBool>
      }

      <div>
        {/* setting the visited user requires useEffect hook so client component and in dev mode it renders twice so 
        this function should be commented in dev mode but not when it is deployed for production*/}
        {/* {
          !isDuplicate && (
            <SetVisitedUser userId={sessionEmailId} postId={params.id} />

          )
        } */}
        <SetVisitedUser userId={sessionEmailId} postId={params.id} />
        <>
          <div className="text-xl font-bold text-orange-400 ">
            Visited Users List
          </div>
          <div className="">
            {visitedUsers.map((users) => (
              <>
                <div className=""> {users.user.email}</div>
              </>
            ))}
          </div>
        </>
      </div>
    </div>
  );
};

export default page;
