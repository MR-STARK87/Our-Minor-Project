import Mailgen from "mailgen";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const mailGenerator = new Mailgen({
  theme: "default",
  product: {
    name: "The Retro Project",
    link: process.env.APP_URL || "http://localhost:3000/",
    logo: process.env.LOGO_URL || "https://yourdomain.com/images/logo.png",
    logoHeight: "40px",
    copyright: `Copyright © ${new Date().getFullYear()} The Retro Project. All rights reserved.`,
  },
  theme: {
    // Brand colors
    primaryColor: "#22BC66",
    backgroundColor: "#f9fafb",
    textColor: "#374151",
    linkColor: "#22BC66",

    // Button styling
    buttonBackgroundColor: "#22BC66",
    buttonTextColor: "#ffffff",

    // Typography
    fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
    fontSize: "16px",
  },
});

const transporter = nodemailer.createTransport({
  host: process.env.MAILTRAP_SMTP_HOST,
  port: Number(process.env.MAILTRAP_SMTP_PORT) || 587,
  auth: {
    user: process.env.MAILTRAP_SMTP_USER,
    pass: process.env.MAILTRAP_SMTP_PASS,
  },
});

const EMAIL_TEMPLATES = {
  verification: (username, url) => ({
    body: {
      name: username,
      intro: [
        "Welcome! We're excited to have you on board.",
        "To get started and ensure the security of your account, we need to verify your email address.",
      ],
      action: {
        instructions:
          "Click the button below to verify your email address and activate your account. This link will expire in 24 hours:",
        button: {
          color: "#22BC66",
          text: "Verify Email Address",
          link: url,
        },
      },
      outro: [
        "If you didn't create an account with us, you can safely ignore this email.",
        "This verification link will expire in 24 hours for security reasons.",
        "Need help? Just reply to this email and we'll be happy to assist you.",
      ],
      signature: "Welcome aboard",
    },
  }),

  resetPassword: (username, url) => ({
    body: {
      name: username,
      intro: [
        "We received a request to reset the password for your account.",
        "If you made this request, click the button below to create a new password.",
      ],
      action: {
        instructions:
          "To reset your password, click the button below. This link will expire in 1 hour for security reasons:",
        button: {
          color: "#22BC66",
          text: "Reset Your Password",
          link: url,
        },
      },
      outro: [
        "If you did not request a password reset, please ignore this email or contact our support team if you have concerns.",
        "For security reasons, this link will expire in 1 hour.",
        "Never share this link with anyone.",
      ],
      signature: "Thanks for using our service",
    },
  }),
};

const sendEmail = async ({ to, subject, url, template, username }) => {
  try {
    const content = EMAIL_TEMPLATES[template](username, url);
    const emailTextual = mailGenerator.generatePlaintext(content);
    const emailHTML = mailGenerator.generate(content);

    const info = await transporter.sendMail({
      from: "Retro.AI",
      to,
      subject,
      text: emailTextual,
      html: emailHTML,
    });
    return info;
  } catch (error) {
    console.error("Error with email transporter", error);
    throw error;
  }
};

export { sendEmail };
