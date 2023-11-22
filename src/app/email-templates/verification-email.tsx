import * as React from "react";

interface VerifyEmailTemplateProps {
  email: string;
  emailVerificationToken: string;
}

export const VerifyEmailTemplate: React.FC<
  Readonly<VerifyEmailTemplateProps>
> = ({ email, emailVerificationToken }) => (
  <div>
    <h1>
      Verify Email for <b>{email}</b>
    </h1>
    <p>Verify your email with this link dumbass</p>
    <a
      href={`http://localhost:3000/pages/verifyEmail?token=${emailVerificationToken}`}
    >
      Verify your Email
    </a>
  </div>
);
