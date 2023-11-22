"use client";
import React, { useState } from "react";
import { resetPassword } from "../actions/reset-password";

export const ResetPasswordForm = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const handleSubmit = async () => {
    const message = await resetPassword(email);

    setMessage(message);
  };
  return (
    <div className="m-40 flex flex-col gap-4">
      <div className="text-3xl">Reset Password</div>
      <label className="text-2xl font-bold">Enter your email</label>
      <input
        className="bg-gray-400"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      ></input>
      <button onClick={handleSubmit}>Send email to reset</button>
    </div>
  );
};
