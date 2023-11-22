"use client";

import { sendEmail } from "@/app/actions/email-send";
import { EmailTemplate } from "@/app/email-templates/test-email";
import React from "react";

const TestEmailButton = () => {
  const handleSubmit = () => {
    sendEmail({
      from: "Admin <admin@eraybaydemir.com>",
      to: ["ediz.cagan.uysal@gmail.com"],
      subject: "test email",
      react: EmailTemplate({ firstName: "bruhh" }) as React.ReactElement,
    });
  };
  return <button onClick={handleSubmit}>Test Email </button>;
};

export default TestEmailButton;
