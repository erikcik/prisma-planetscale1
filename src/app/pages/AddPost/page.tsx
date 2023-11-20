import AddPostForm from "@/app/components/AddPostForm";
import React from "react";

const page = () => {
  return (
    <div>
      <div className="text-3xl font-extrabold m-8">
        Page to enter your post{" "}
      </div>
      <AddPostForm />
    </div>
  );
};

export default page;
