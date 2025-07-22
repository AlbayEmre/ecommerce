// utils/sendEmail.js
const nodemailer = require("nodemailer");

module.exports = async function sendEmail({ to, subject, text }) {
  const transporter = nodemailer.createTransport({
    service: "gmail", // veya mailgun, mailtrap, smtp vs.
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"Şifre Sıfırlama" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    text,
  });
};
