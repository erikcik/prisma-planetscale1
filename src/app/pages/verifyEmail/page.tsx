import ChangePasswordForm from "@/app/components/ChangePasswordForm";
import { ResetPasswordForm } from "@/app/components/ResetPasswordForm";
import prisma from "@/app/lib/prisma";
import React from "react";

type VerifyEmailPageProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};

const VerifyEmailPage = async ({ searchParams }: VerifyEmailPageProps) => {
  if (searchParams.token) {
    const user = await prisma.user.findUnique({
      where: {
        emailVerificationToken: searchParams.token as string,
      },
    });
    if (!user) {
      return <div>Invalid Token bruh</div>;
    }

    await prisma.user.update({
      where: {
        emailVerificationToken: searchParams.token as string,
      },
      data: {
        emailVerified: true,
        emailVerificationToken: null,
      },
    });
    return (
      <div className="m-40">
        <div className="text-3xl">Email verified for {user.email}</div>
      </div>
    );
  } else {
    <div>
      <div>
        Bruh my man there is no token found to verify your emailk wahtosever
      </div>
    </div>;
  }
};

export default VerifyEmailPage;
