import { NextResponse } from "next/server";
import { verifyToken, generateToken, generateRefreshToken } from "@/app/lib/jwt";
import ConnectDB from "@/app/lib/db";
import User from "@/app/lib/models/user";
import mongoose from "mongoose";

export async function POST(req) {
    try {
        await ConnectDB();
        const refresh = req.cookies.get("refreshToken")?.value;

        if (!refresh) {
            return NextResponse.json(
                { success: false, message: "Refresh token is required" },
                { status: 400 }
            );
        }

        const decodedToken = await verifyToken(refresh, 'refresh');

        if (!decodedToken) {
            return NextResponse.json(
                { success: false, message: "Invalid refresh token" },
                { status: 401 }
            );
        }

        if (!mongoose.Types.ObjectId.isValid(decodedToken.id)) {
            return NextResponse.json(
                { success: false, message: "Invalid ID in token" },
                { status: 400 }
            );
        }

        // Check if user still exists
        const user = await User.findById(decodedToken.id);
        if (!user) {
            return NextResponse.json(
                { success: false, message: "User no longer exists" },
                { status: 404 }
            );
        }

        const token = await generateToken({ id: user._id, email: user.email, role: user.role });
        const newRefreshToken = await generateRefreshToken({ id: user._id, email: user.email, role: user.role });

        const response = NextResponse.json(
            { success: true, user: { id: user._id, email: user.email, role: user.role } },
            { status: 200 }
        );

        // Set the new Access Token in HTTP-only cookie
        response.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
            maxAge: 60 * 60 * 24 // 1 day
        });

        // Update the cookie with the new refresh token
        response.cookies.set("refreshToken", newRefreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
            maxAge: 60 * 60 * 24 * 7 // 7 days
        });

        return response;
    } catch (error) {
        console.error("Refresh token error:", error);
        return NextResponse.json(
            { success: false, message: "Internal server error" },
            { status: 500 }
        );
    }
}
