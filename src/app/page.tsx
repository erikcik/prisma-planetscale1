import Image from "next/image";
import { getPosts } from "./actions/get-posts";
import Link from "next/link";

export default async function Home() {
  const posts = await getPosts();

  return (
    <>
      <div className="m-8">
        {posts.map((post) => (
          <>
            <div className="bg-gray-400">
              <div>{post.title}</div>
              <Link href={"/pages/" + post.id}>To your Link</Link>
            </div>
          </>
        ))}
        <Link href={"/pages/AddPost"}> Enter to add your post</Link>
      </div>
    </>
  );
}
