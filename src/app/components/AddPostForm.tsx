"use client";

import React, { useState } from "react";

const AddPostForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !content) {
      return alert("enter your post input dumbass");
    }

    await fetch("/api/add-post", {
      method: "POST",
      headers: { "Content-Type": "application/json," },
      body: JSON.stringify({ title, content }),
    });
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
        <button type="submit"> Enter to submit the post</button>
      </form>
    </div>
  );
};

export default AddPostForm;
