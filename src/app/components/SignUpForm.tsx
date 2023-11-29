"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const SignUpForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [file, setFile] = useState<any>("");
  const router = useRouter();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files);
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    let imageUrl = "";
    try {
      const uploadProfilePic = await fetch("/api/s3-upload", {
        method: "POST",
        body: formData,
      });
      const data = await uploadProfilePic.json();
      imageUrl = data.imageUrl;
    } catch (error) {
      console.log(error);
    }
    try {
      const response = await fetch("/api/add-user", {
        method: "POST",
        headers: {
          "Content-Type": "application-json",
        },
        body: JSON.stringify({ email, password, imageUrl }),
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
    } catch (error) {
      console.log(error);
    }

    console.log(email, password);
  };
  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col pt-2">
        <div className="flex flex-col items-center justify-center">
          <label
            htmlFor="file-upload"
            className="flex flex-col items-center justify-center w-3/4 h-24 bg-white text-gray-700 rounded-lg border-2 border-dashed border-gray-300 cursor-pointer hover:bg-gray-100"
          >
            <div className="flex flex-col items-center justify-center pt-2 pb-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={30}
                height={30}
                fill="none"
              >
                <path
                  fill="#231F20"
                  fillRule="evenodd"
                  d="M4.023 8.922a1 1 0 0 0 1.647.838L11 5.18V17a1 1 0 1 0 2 0V5.18l5.37 4.58a1 1 0 0 0 1.3-1.52l-7-6a.829.829 0 0 0-.16-.09l-.12-.08a1 1 0 0 0-.74 0l-.12.08a.829.829 0 0 0-.16.09l-7 6a1 1 0 0 0-.347.682ZM20 18a1 1 0 1 1 2 0v2a2.17 2.17 0 0 1-2.29 2H4.29A2.17 2.17 0 0 1 2 20v-2a1 1 0 1 1 2 0v1.93a.58.58 0 0 0 .29.07h15.42a.58.58 0 0 0 .29-.07V18Z"
                  clipRule="evenodd"
                />
              </svg>
              <p className=" text-sm text-gray-500">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-gray-500 text-center">
                to upload your profile pic or it will be random
              </p>
            </div>
            <input
              id="file-upload"
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
            />
          </label>
        </div>

        <label className="font-medium text-base pb-1 pt-3">
          Enter to give your email
        </label>
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
        <button
          className="bg-black text-white font-medium rounded-md p-1 mt-3 opacity-80 transition-all hover:opacity-100 duration-300"
          type="submit"
        >
          {" "}
          Enter to sign up{" "}
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;
