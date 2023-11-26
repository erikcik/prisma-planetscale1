"use client";
import React from "react";

type AddFavoriteButtonProps = {
  userId: string | undefined;
  postId: string;
};
const addFavoritePost = async ({ userId, postId }: AddFavoriteButtonProps) => {
  try {
    const response = await fetch("/api/add-favorite", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, postId }),
    });
  } catch (error) {
    console.log("bruh");
    console.log(error);
  }
};

const AddFavoriteButton = ({ postId, userId }: AddFavoriteButtonProps) => {
  const submitFavoritePost =
    ({ postId, userId }: AddFavoriteButtonProps) =>
    async () => {
      await addFavoritePost({ userId, postId });
    };

  return (
    <div>
      <button onClick={submitFavoritePost({ postId, userId })}>
        {" "}
        {/* Corrected */}
        Press to add as your favorite post
      </button>
    </div>
  );
};

export default AddFavoriteButton;
