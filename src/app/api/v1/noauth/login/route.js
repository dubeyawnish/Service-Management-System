import {NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt'
import { ApiError } from "@/helper/apiError";
import { connectToDatabase } from "@/db/connect";
import { prisma } from "@/helper/prismaClient";




export const POST = async (req) => {

    await connectToDatabase();

    try {
        const { userName, email, password } = await req.json();
        
        //console.log(email);
        if (!userName && !email) {
            throw new ApiError(400, "username or email is required")
        }

        const user = await prisma.user.findFirst({
            where: {
                OR: [
                    { email: { equals: email?.toLowerCase() } },
                    { userName: { equals: userName?.toLowerCase() } }
                ]
            }
        });
        if (!user) {
            throw new ApiError(404, "User does not exist")
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new ApiError(401, "Invalid user credentials");
        }

        const tokenData = {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
        }

        const accessToken = jwt.sign({ tokenData }, process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn: process.env.ACCESS_TOKEN_EXPIRY
            });

        const loggedInUser = await prisma.user.findUnique({
            where: {
                id: user.id
            },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                phone: true,
                userName: true,
                createdAt: true,
                updatedAt: true
            }
        });

        const options = {
            httpOnly: true,
            secure: true
        }
        // console.log(accessToken)
        const res = NextResponse.json({ accessToken, loggedInUser }, { status: 201 }, { message: "User logged In Successfully" });
        // res.cookies.set({
        //     name: 'accessToken',
        //     value: accessToken,
        //     httpOnly: true,
        //     secure: true,
        // })
        res.cookies.set("accessToken",accessToken,options)
        return res;
    }
    catch (err) {
        console.log("Errrroor", err);
    }
    finally {
        await prisma.$disconnect();
    }

} 