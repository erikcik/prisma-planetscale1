"use client";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
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
      <form onSubmit={handleSubmit} className="flex flex-col pt-5">
        <label className="font-medium text-base pb-1">Enter your email</label>
        <input
          className="bg-gray-400 border-2 rounded-lg"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <label className="font-medium text-base pb-1 pt-3">
          Enter your password
        </label>
        <input
          className="bg-gray-400 border-2 rounded-lg"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <div className="flex justify-between pt-1">
          <div></div>
          <div className="font-bold text-xs">Forgot your password?</div>
        </div>
        <button
          className="bg-black text-white font-medium rounded-md p-1 mt-3 opacity-80 transition-all hover:opacity-100"
          type="submit"
        >
          {" "}
          Enter to sign in{" "}
        </button>
        <div className="flex gap-2 text-[11px] justify-between pt-1">
          <div className="">Don't have a account wow nerd</div>
          <Link href={"/sign-up"}>Click here to sign up</Link>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
