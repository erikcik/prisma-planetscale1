"use client";

import { getServerSession } from "next-auth";
import React, { useState } from "react";
import { authOptions } from "../utils/authOptions";
import { useRouter } from "next/navigation";
import prisma from "../lib/prisma";

type AddPostFormProps = {
  postAuthorEmail: string | undefined;
};

const AddPostForm = ({ postAuthorEmail }: AddPostFormProps) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState<any>();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    //image upload
    const formData = new FormData();
    formData.append("file", file);
    let imageUrl = "";
    try {
      const response = await fetch("/api/s3-upload", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      imageUrl = data.imageUrl;
    } catch (error) {
      console.log(error);
    }
    if (!title || !content) {
      return alert("enter your post input dumbass");
    }
    try {
      await fetch("/api/add-post", {
        method: "POST",
        headers: { "Content-Type": "application/json," },
        body: JSON.stringify({
          title,
          content,
          authorEmail: postAuthorEmail,
          imageUrl,
        }),
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="m-40">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label className="text-2xl font-bold "> Enter your title</label>
        <input
          className="bg-gray-200 "
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        ></input>
        <label className="text-xl font-medium"> Enter your content</label>
        <input
          className="bg-gray-200 "
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></input>
        <input type="file" accept="image/*" onChange={handleFileChange} />

        <button type="submit"> Enter to submit the post</button>
      </form>
    </div>
  );
};

export default AddPostForm;
