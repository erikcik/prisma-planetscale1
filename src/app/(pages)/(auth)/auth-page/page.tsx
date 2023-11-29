import SignInForm from "@/app/components/SignInForm";
import React from "react";

const page = () => {
  return (
    <div className="w-auto h-auto flex justify-center pt-14">
      <div className="border-2 p-4 w-96 h-96 flex flex-col animate-waving-hand">
        <h1 className="text-3xl font-bold text-center">Sign In Page </h1>
        <h2 className="text-xl font-medium text-center">because why not </h2>
        <h3 className=" font-light text-center text-[12px]">
          It is my blog so you need account to continue. This all logic made
          from scratch so I want to flex as much as possible
        </h3>
        <SignInForm />
      </div>
    </div>
  );
};

export default page;
