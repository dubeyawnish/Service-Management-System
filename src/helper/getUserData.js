import jwt from 'jsonwebtoken'
import { ApiError } from './apiError'
import { prisma } from './prismaClient';
import { connectToDatabase } from '@/db/connect';
import { NextRequest } from 'next/server';


const GetDataFromToken = async (req) => {
    await connectToDatabase();
    try {
        // console.log("Reeee", NextRequest)
        const token = req?.cookies.get("accessToken")?.value || "";
        if (!token) {
            throw new ApiError(400, "Token not found!!");
        }
        //console.log(token)
        const decodeToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        //console.log("Ram",decodeToken.tokenData.id)
        if (!decodeToken.tokenData.id) {
            throw new ApiError(400, "Token not Decoded");
        }       
        const user = await prisma.user.findUnique({
            where: {
                id: decodeToken.tokenData.id
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

        return user;
    }
    catch (err) {
        throw new ApiError(400, "some thing went wrong in finding current user data");
    }
}

export default GetDataFromToken ;