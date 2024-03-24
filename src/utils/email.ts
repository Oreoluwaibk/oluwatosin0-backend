import nodemailer, { createTransport } from "nodemailer";

const transporter = createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
    }
})

export const sendMail = async ({ email, token }) => {
    const info  = await transporter.sendMail({
        from: '"oluwatosin0" <oluwatosin0@admin.com>',
        to: email,
        subject: "Reset Password",
        text: "Click the link to reset password",
        html: `<p><a href='http://localhost:3000/reset-password/${token}'>click</a>here to reset your password</p>`
    });

    console.log("mail sent", info.messageId);
    
}

