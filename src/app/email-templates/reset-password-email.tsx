import * as React from "react";

interface ResetPasswordEmailTemplateProps {
  email: string;
  resetPasswordToken: string;
}

export const ResetPasswordEmailTemplate: React.FC<
  Readonly<ResetPasswordEmailTemplateProps>
> = ({ email, resetPasswordToken }) => (
  <div>
    <h1>
      Reset Password for <b>{email}</b>
    </h1>
    <p>Reset your password with this link dumbass</p>
    <a
      href={`http://localhost:3000/pages/resetPassword?token=${resetPasswordToken}`}
    >
      Reset Password
    </a>
  </div>
);
