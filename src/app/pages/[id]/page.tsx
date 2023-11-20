import { getSinglePost } from "@/app/actions/get-single-post";
import React from "react";

const page = async ({ params }: { params: { id: string } }) => {
  const post = await getSinglePost(params.id);
  return <div>{post?.title}</div>;
};

export default page;
