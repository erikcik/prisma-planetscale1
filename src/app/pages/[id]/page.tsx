import { getSinglePost } from "@/app/actions/get-single-post";
import SetVisitedUser from "@/app/components/SetVisitedUser";
import prisma from "@/app/lib/prisma";
import { authOptions } from "@/app/utils/authOptions";
import { getServerSession } from "next-auth";
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
  // const visitedUsers = await getVisitedPostUsers(sessionEmailId);
  const visitedUsers = await prisma.postView.findMany({
    where: {
      postId: params.id,
    },
    include: {
      user: true,
    },
  });

  return (
    <div>
      <SetVisitedUser userId={sessionEmailId} postId={params.id} />
      <div> {post?.title}</div>
      <div>
        {/* setting the visited user requires useEffect hook so client component */}
        <>
          <div className="text-xl font-bold text-orange-400 ">
            Visited Users List
          </div>
          <div>
            {visitedUsers.map((users) => (
              <>
                <div> {users.user.email}</div>
              </>
            ))}
          </div>
        </>
      </div>
    </div>
  );
};

export default page;
