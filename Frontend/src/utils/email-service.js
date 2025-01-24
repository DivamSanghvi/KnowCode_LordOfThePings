import nodemailer from "nodemailer";

export const sendMail = async ({to,subject,textMessage}) => {
    const transporter = nodemailer.createTransport({
        service: "Gmail",
        port: 465,
        secure: true,
        auth: {
            user: process.env.GMAIL,
            pass: process.env.GPASSWORD
        }
    });

    try {
        const info = await transporter.sendMail({
            from: process.env.GMAIL,
            to,
            subject,
            html: `<b>${textMessage}</b>`,
        });
        console.log("Email sent: %s", info.messageId);
    } catch (error) {
        console.error("Error sending email:", error.message);
        throw new Error("Email not sent");
    }
};
