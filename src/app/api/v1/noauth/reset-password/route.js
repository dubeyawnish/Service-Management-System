
import { NextRequest, NextResponse } from "next/server";
import Cryptr from "cryptr";
import { prisma } from "@/helper/prismaClient";
import { connectToDatabase } from "@/db/connect";
import bcrypt from "bcrypt";

export const POST = async (req) => {
    await connectToDatabase();
    try {
        const { email, signature, password } = await req.json();
        const crypter = new Cryptr(process.env.ACCESS_TOKEN_SECRET);
        const mail = crypter.decrypt(email);

        const user = await prisma.user.findUnique({
            where: {
                email: mail,
                resetPasswordToken: signature
            }
        });
        if (user == null || user == undefined) {
            return NextResponse.json({
                status: 400,
                message: "Reset url is not correct. pls double check it .",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await prisma.user.update({
            where: {
                id: user?.id
            },
            data: {
                password: hashedPassword,
                resetPasswordToken: null

            }
        });

        return NextResponse.json({
            status: 200,
            message: "Password changed successfully. please login with new password.",
        });

    }
    catch (err) {
        console.log("Error",err);

    }
}