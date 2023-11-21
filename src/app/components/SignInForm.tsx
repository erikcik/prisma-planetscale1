"use client";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();
  const { status } = useSession();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(email, password);

    const signInResponse = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    if (!signInResponse || signInResponse.ok !== true) {
      setMessage("invalid credentials");
    } else {
      router.refresh();
    }
  };
  useEffect(() => {
    if (status === "authenticated") {
      router.refresh();
      router.push("/");
    }
  }, [status]);

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 ">
        <label className="text-3xl font-bold">Enter your email</label>
        <input
          className="bg-gray-400"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <label className="text-3xl font-bold">Enter your password</label>
        <input
          className="bg-gray-400"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <button className="border-2 border-black w-16 h-8" type="submit">
          {" "}
          Enter to sign in{" "}
        </button>
      </form>
    </div>
  );
};

export default SignInForm;
