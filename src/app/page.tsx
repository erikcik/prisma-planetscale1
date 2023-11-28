import Image from "next/image";
import { getPosts } from "./actions/get-posts";
import Link from "next/link";
import { getUsers } from "./actions/get-users";
import { SearchBar } from "./components/navbar/SearchBar";
import { getServerSession } from "next-auth";
import { authOptions } from "./utils/authOptions";
import prisma from "./lib/prisma";

export default async function Home() {
  const posts = await getPosts();
  const users = await getUsers();
  const session = await getServerSession(authOptions);
  const sessionEmail = session?.user?.email;
  let userFounded;
  if (sessionEmail) {
    userFounded = await prisma.user.findUnique({
      where: {
        email: sessionEmail,
      },
    });
  }
  const sessionUserId = userFounded?.id;

  return (
    <>
      <div className="m-8">
        <div className="text-3xl font-bold bg-red-1">DEMO VERSION OF BLOG</div>
        {posts?.map((post) => (
          <>
            <div className="bg-gray-400 animate-waving-hand">
              <div>{post.title}</div>
              <Link href={"/pages/" + post.id}>To your Link</Link>
            </div>
          </>
        ))}
        <Link href={"/pages/AddPost"}> Enter to add your post</Link>
        <Link href={"/pages/auth/signUp"}> Enter to sign Upp</Link>
        {users?.map((user) => (
          <>
            <div className="bg-red-300">
              <div>{user.email}</div>
              <div>{user.passwordHash}</div>
            </div>
          </>
        ))}
        <Link href={"/pages/auth/signIn"} className="bg-blue-400">
          Go to the sign in page
        </Link>
        <SearchBar users={users} sessionUserId={sessionUserId} />
      </div>
    </>
  );
}
