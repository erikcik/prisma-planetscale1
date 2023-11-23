"use client";
import prisma from "@/app/lib/prisma";
import React, { useState } from "react";

const getFilteredItems = (searchInput: string, items: User[] | undefined) => {
  if (!items) {
    return [];
  }
  return items.filter((user) =>
    user.email.toLowerCase().includes(searchInput.toLowerCase())
  );
};

type User = {
  id: string;
  email: string;
  passwordHash: string;
  resetPasswordToken: string | null;
  resetPasswordTokenExpiry: Date | null;
  emailVerified: boolean;
  emailVerificationToken: string | null;
};

type SearchBarProps = {
  users: User[] | undefined;
  sessionUserId: string | undefined; // Assuming sessionUserId is a string
};

const handleSubmitFriend = async (
  userId: string,
  sessionUserId: string | undefined
) => {
  try {
    await fetch("/api/add-friend", {
      method: "POST",
      headers: { "Content-Type": "application/json," },
      body: JSON.stringify({ sessionUserId, userId }),
    });
  } catch (error) {
    console.log(error);
  }
};

export const SearchBar = ({ users, sessionUserId }: SearchBarProps) => {
  const [searchInput, setSearchInput] = useState("");

  const handleFriendClick = (userId: string) => async () => {
    await handleSubmitFriend(userId, sessionUserId);
  };

  const filteredItems = getFilteredItems(searchInput, users);

  return (
    <div>
      <input
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        placeholder="search here"
        type="text"
        className="bg-gray-400"
      />
      {filteredItems.map((user) => (
        <>
          <div key={user.id} className="bg-green-500 flex justify-between">
            <div> {user.email}</div>
            <button onClick={handleFriendClick(user.id)}>
              Click to add as a friend
            </button>
          </div>
        </>
      ))}
    </div>
  );
};
