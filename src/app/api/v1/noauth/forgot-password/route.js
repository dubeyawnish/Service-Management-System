import { prisma } from "@/helper/prismaClient";
import { connectToDatabase } from "@/db/connect";
import { NextRequest, NextResponse } from "next/server";
import cryptoRandomString from "crypto-random-string";
import Cryptr from "cryptr";
import { render } from "@react-email/render";
import ForgotPasswordEmail from "@/components/Password-Reset-Template/forgotPasswordTemplate";
import { sendEmail } from "@/config/mail";


export async function POST(request) {
    await connectToDatabase();
    const { email } = await request.json();

    // Check user email first
    const user = await prisma.user.findUnique({
        where: {
            email: email
        }
    });
    if (user == null) {
        return NextResponse.json({
            status: 400,
            errors: {
                email: "No user found with this email.",
            },
        });
    }

    // Generate random string
    const randomStr = cryptoRandomString({
        length: 64,
        type: "alphanumeric",
    });

    await prisma.user.update({
        where: {
            email: email
        },
        data: {
            resetPasswordToken: {
                set: randomStr
            }
        }
    });
    // Encrypt user email
    const crypt = new Cryptr(process.env.ACCESS_TOKEN_SECRET);
    const encryptedEmail = crypt.encrypt(user.email);

    const url = `${process.env.APP_URL}/reset-password/${encryptedEmail}?signature=${randomStr}`;

    try {
        const html = render(
            ForgotPasswordEmail({
                params: {
                    name: user.name,
                    url: url,
                },
            })
        );

        // Send email to user
       const mail= await sendEmail(email, "Reset Password", html);
    //    console.log("maillllll",mail)
        return NextResponse.json({
            status: 200,
            message: "Email sent successfully. Please check your email.",
        });
    } catch (error) {
        console.log("the error is", error);
        return NextResponse.json({
            status: 500,
            message: "Something went wrong. Please try again!",
        });
    }

}