import AddPostForm from "@/app/components/AddPostForm";
import prisma from "@/app/lib/prisma";
import { authOptions } from "@/app/utils/authOptions";
import { getServerSession } from "next-auth";
import { useRouter } from "next/navigation";
import React from "react";

const page = async () => {
  // const [postAuthor, setPostAuthor] = useState("");
  const session = await getServerSession(authOptions);
  const sessionEmail = session?.user?.email;
  if (sessionEmail === null) {
    return (
      <div>
        Wtf are you doing mate, you should not create post without reegistered
      </div>
    );
  }
  let userSession;
  if (sessionEmail) {
    userSession = await prisma.user.findUnique({
      where: {
        email: sessionEmail,
      },
    });
  }
  const postAuthorEmail = userSession?.email;

  return (
    <div>
      <div className="text-3xl font-extrabold m-8">
        Page to enter your post{" "}
      </div>
      <AddPostForm postAuthorEmail={postAuthorEmail} />
    </div>
  );
};

export default page;
