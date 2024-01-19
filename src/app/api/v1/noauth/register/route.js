import { NextResponse } from "next/server";
import { connectToDatabase } from "@/db/connect";
import { prisma } from "@/helper/prismaClient";
import { ApiError } from "@/helper/apiError";
import bcrypt from 'bcrypt'



export async function POST(request) {
    await connectToDatabase();
    try {
        // get user details from frontend
        // validation - not empty
        // check if user already exists: username, email
        // check for images, check for avatar
        // upload them to cloudinary, avatar
        // create user object - create entry in db
        // remove password and refresh token field from response
        // check for user creation
        // return res


        const { name, email, userName, password, role, phone } = await request.json();


        if (
            [name, email, userName, password, role, phone].some((field) => field?.trim() === "")
        ) {
            throw new ApiError(400, "All fields are required")
        }


        const existedUser = await prisma.user.findFirst({
            where: {
                OR: [
                    { email: { equals: email.toLowerCase() } },
                    { userName: { equals: userName.toLowerCase() } }

                ]
            }
        });

        if (existedUser) {
            throw new ApiError(409, "User with email or username already exists")
        }


      const hashedPassword=await bcrypt.hash(password,10)

        const user = await prisma.user.create({
            data: {
                name,
                email:email.toLowerCase(),
                password:hashedPassword,
                role,
                phone,
                userName: userName.toLowerCase(),

            }
        });


        const createdUser = await prisma.user.findUnique({
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

        if (!createdUser) {
            throw new ApiError(500, "Something went wrong while registering the user")
        }

        return NextResponse.json({ createdUser }, { status: 201 }, { message: "User Registered Successfully" })


    }
    catch (err) {
        console.log("Api Failed", err);
    }
    finally {
        await prisma.$disconnect();
    }


}