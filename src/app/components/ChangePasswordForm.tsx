"use client";
import React, { useState } from "react";
import prisma from "../lib/prisma";
import { changePassword } from "../actions/change-password";

interface ChangePasswordFormProps {
  resetPasswordToken: string;
}
const ChangePasswordForm = ({
  resetPasswordToken,
}: ChangePasswordFormProps) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    if (password !== confirmPassword) {
      setMessage("please enter your password right bruh");
      return;
    }

    const message = await changePassword(resetPasswordToken, password);
    setMessage(message);
  };

  return (
    <div className="m-40 flex flex-col gap-4">
      <div className="text-3xl">Change your password</div>
      <label className="text-2xl font-bold">Password enter</label>
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="bg-gray-400"
      ></input>
      <label className="text-xl font-bold">Password Confirm enter</label>
      <input
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className="bg-gray-400"
      ></input>
      <button onClick={handleSubmit}>Change your password</button>
      <p>{message}</p>
    </div>
  );
};

export default ChangePasswordForm;
