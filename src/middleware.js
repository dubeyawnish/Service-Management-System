import { NextResponse } from 'next/server';


export function middleware(req) {
  try {
    console.log("Middleware Executed");
    const headerToken = req?.headers.get("Authorization")?.replace("Bearer ", "") ;
    const cookieToken=req.cookies.get("accessToken")?.value;
    // console.log("Tokennn", token);
    //console.log(headerToken,"    ",cookieToken);
    if (headerToken!==cookieToken) {
      return new NextResponse(
        JSON.stringify({success: false, message: 'Authentication failed: You are not authorised to do this'}),
        {status: 401, headers: {'content-type': 'application/json'}}
    );
    }

    // console.log("Nextttt");
    return NextResponse.next();
    // console.log("first");
  } catch (err) {
    console.log(err);
  }
}

export const config = {
  matcher: ['/api/v1/auth/:path*']
};
