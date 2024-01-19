import { NextResponse } from "next/server";
import bcrypt from 'bcrypt'
import { ApiError } from "@/helper/apiError";
import { connectToDatabase } from "@/db/connect";
import { prisma } from "@/helper/prismaClient";
import GetDataFromToken from "@/helper/getUserData";


export const POST = async (req) => {
    await connectToDatabase();
    try {
        const { oldPassword, newPassword } = await req.json();
         console.log(oldPassword,newPassword)
       

        const user = await GetDataFromToken(req);
        // console.log("USer",user);
        if (!user) {
            throw new ApiError(400, "User not found");
        }
        const userDetail = await prisma.user.findUnique({
            where: {
                id: user?.id
            }
        });
        //  console.log(userDetail);
        const isPasswordValid = await bcrypt.compare(oldPassword, userDetail?.password);
        // console.log("Helllo",isPasswordValid)
        if (!isPasswordValid) {
            throw new ApiError(401, "Invalid Old Password");
        }
        // console.log("Helllo",isPasswordValid)
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await prisma.user.update({
            where: {
                id: user?.id
            },
            data: {
                password: hashedPassword
            }
        });
        return NextResponse.json({ changed: "Password changed" }, { status: 201 }, { message: "Password Changed Successfully" });
    }
    catch (err) {
        throw new ApiError(401, "Something error occured password not changed")
    }

}