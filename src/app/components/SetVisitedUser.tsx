"use client";
import React, { useEffect } from "react";

type SetVisitedUserProps = {
  userId: string | undefined;
  postId: string;
};
const AddView = async ({ userId, postId }: SetVisitedUserProps) => {
  try {
    const response = await fetch("/api/add-view", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, postId }),
    });
  } catch (error) {
    console.log(error);
  }

  return null;
};

const SetVisitedUser = async ({ userId, postId }: SetVisitedUserProps) => {
  console.log(userId, postId);

  useEffect(() => {
    let ignore = false;

    const fetchData = async () => {
      await AddView({ userId, postId });
    };
    fetchData();

    return () => {
      ignore: true;
    };
  }, [userId, postId]);

  return null;
};

export default SetVisitedUser;
