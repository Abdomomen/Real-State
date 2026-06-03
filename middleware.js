import { NextResponse } from "next/server";
import { verifyToken, generateToken, generateRefreshToken } from "@/app/lib/jwt";

export async function middleware(request) {
  const { nextUrl } = request;
  let token = request.cookies.get("token")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;

  let userDecoded = null;
  let response = NextResponse.next(); 

  if (token) {
    userDecoded = await verifyToken(token, "access");
  }

  if (!userDecoded && refreshToken) {
    const refreshDecoded = await verifyToken(refreshToken, "refresh");

    if (refreshDecoded) {
      const payload = { 
        id: refreshDecoded.id, 
        email: refreshDecoded.email, 
        role: refreshDecoded.role 
      };

      const newToken = await generateToken(payload);
      const newRefreshToken = await generateRefreshToken(payload);

      userDecoded = payload; 

      response.cookies.set("token", newToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60 * 24 // 1 day
      });

      response.cookies.set("refreshToken", newRefreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60 * 24 * 7 // 7 days
      });

      request.cookies.set("token", newToken);
      request.cookies.set("refreshToken", newRefreshToken);
    }
  }

  const isProtectedRoute = nextUrl.pathname.startsWith("/dashboard");
  
  if (isProtectedRoute && !userDecoded) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!api/auth|_next/static|_next/image|favicon.ico).*)",
  ],
};
