import nodemailer from "nodemailer";

export class EmailService {

    async sendOTP( email: string, otp: number ) {
        const transporter = nodemailer.createTransport ({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });
        await transporter.sendMail ({
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Codecrush OTP verification" ,
            text: `Your OTP is ${otp}`

        })
    }
}
