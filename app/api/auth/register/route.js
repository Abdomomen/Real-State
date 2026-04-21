import { NextResponse } from "next/server";
import { userService } from "@/app/services/userService";
import { AppError } from "@/app/lib/errors";

export async function POST(req) {
    try {
        const data = await req.json();
        const { user, token, refreshToken } = await userService.register(data);

        const response = NextResponse.json(
            { success: true, message: "User registered successfully", user },
            { status: 201 }
        );

        // Set Access Token in HTTP-only cookie
        response.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
            maxAge: 60 * 60 * 24 // 1 day
        });

        // Set Refresh Token in HTTP-only cookie
        response.cookies.set("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
            maxAge: 60 * 60 * 24 * 7 // 7 days
        });

        return response;
    } catch (error) {
        console.error("Registration error:", error);
        
        if (error instanceof AppError) {
            return NextResponse.json(
                { success: false, message: error.message },
                { status: error.statusCode }
            );
        }

        return NextResponse.json(
            { success: false, message: "Internal server error" },
            { status: 500 }
        );
    }
}