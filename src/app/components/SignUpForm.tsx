"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const SignUpForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch("/api/add-user", {
      method: "POST",
      headers: {
        "Content-Type": "application-json",
      },
      body: JSON.stringify({ email, password }),
    });
    const signInResponse = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    if (!signInResponse || signInResponse.ok !== true) {
      alert("no");
    } else {
      router.push("/");
      router.refresh();
    }
    console.log(email, password);
  };
  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label> Enter to give your email</label>
        <input
          className="bg-gray-400"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <label> Enter yoru password</label>
        <input
          className="bg-gray-400"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <button type="submit"> Enter to sign up</button>
      </form>
    </div>
  );
};

export default SignUpForm;
