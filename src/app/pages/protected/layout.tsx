import { authOptions } from "@/app/utils/authOptions";
import { getServerSession } from "next-auth";
import React from "react";

type ProtectedLayoutProps = {
  children: React.ReactNode | React.ReactNode[];
};
const layout = async ({ children }: ProtectedLayoutProps) => {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) {
    return <div>This is protected dont have access to it</div>;
  }
  return <>{children}</>;
};

export default layout;
