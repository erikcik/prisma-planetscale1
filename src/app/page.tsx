import Image from "next/image";
import { getPosts } from "./actions/get-posts";
import Link from "next/link";
import { getUsers } from "./actions/get-users";

export default async function Home() {
  const posts = await getPosts();
  const users = await getUsers();
  return (
    <>
      <div className="m-8">
        {posts?.map((post) => (
          <>
            <div className="bg-gray-400">
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
      </div>
    </>
  );
}
