"use client";
import React, { useState } from "react";

type AddCommentBoolProps = {
  children: React.ReactNode | React.ReactNode[];
};

const AddCommentBool = ({ children }: AddCommentBoolProps) => {
  const [formOpen, setFormOpen] = useState(false);

  const handleClick = () => {
    setFormOpen(!formOpen);
  };
  return (
    <div>
      <button onClick={handleClick}>Form open button</button>
      {formOpen ? (
        <>
          <div> Form is open</div>
          <div> {children}</div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default AddCommentBool;
