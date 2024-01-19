import { connectToDatabase } from "@/db/connect"
import { NextResponse } from "next/server";
import { prisma } from "@/helper/prismaClient";
import GetDataFromToken from "@/helper/getUserData";

export const GET=async(req)=>{
    await connectToDatabase();
    try{ 
        const userDetail= await GetDataFromToken(req);
        return NextResponse.json({userDetail},{status:200},{message:"All user in database"})
    }
    catch(err){
        console.log("Something went wrong",err);
    }
    finally{
        await prisma.$disconnect();

    }

}