
import nodemailer from "nodemailer"


export const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {

      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });


  export  const sendEmail = async (to, subject, html) => {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: to,
      subject: subject,
      html: html,
    });
    console.log("Infomation",info);
  
    return info?.messageId;
  };