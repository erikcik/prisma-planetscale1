import SignUpForm from "@/app/components/SignUpForm";
import React from "react";

const page = () => {
  return (
    <div className="w-auto h-auto flex justify-center pt-14">
      <div className="w-96 h-96 border-2 p-4 flex flex-col animate-waving-hand">
        <h1 className="text-3xl font-bold text-center">Sign Up Page </h1>
        <h2 className="text-xl font-medium text-center">because why not </h2>
        <SignUpForm />
      </div>
    </div>
  );
};

export default page;
