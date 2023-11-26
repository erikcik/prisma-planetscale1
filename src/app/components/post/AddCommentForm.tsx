"use client";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";

type AddCommentFormProps = {
  userId: string | undefined;
  postId: string;
};

const AddCommentForm = ({ userId, postId }: AddCommentFormProps) => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [rating, setRating] = useState<number>(5);
  const handleRating = (rate: number) => {
    setRating(rate);
    console.log(rate);
  };
  const handleSubmit = async () => {
    try {
      await fetch("/api/add-comment", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ title, content, rating, userId, postId }),
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label>Enter your title for comment</label>
        <input
          className="bg-gray-400"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        ></input>
        <label>Enter your content for comment</label>
        <input
          className="bg-gray-400"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></input>
        <div className="star-rating">
          {[1, 2, 3, 4, 5].map((star) => (
            <span key={star} onClick={() => handleRating(star)}>
              <FontAwesomeIcon
                icon={star <= rating ? solidStar : regularStar}
              />
            </span>
          ))}
        </div>
        <button type="submit"> Enter your comment</button>
      </form>
    </div>
  );
};

export default AddCommentForm;
