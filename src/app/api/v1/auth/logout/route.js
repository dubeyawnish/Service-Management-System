import {NextResponse } from "next/server";
import { ApiError } from "@/helper/apiError";



export const POST = async(req) => {
    

    try{
        const options={
            httpOnly:true,
            secure:true
        }
        const res=NextResponse.json({Message:"User Logged Out successfull"},{status:201},{message:"User Logged Out Successfully"});
        res.cookies.delete("accessToken");
        return res;

    }
    catch(err){
        throw new ApiError(400,"Try after sometime!!")
    }
    


}