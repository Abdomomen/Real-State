import { NextResponse } from "next/server";

export async function POST() {
    try {
        const response = NextResponse.json(
            { success: true, message: "Logged out successfully" },
            { status: 200 }
        );

        // Clear tokens
        response.cookies.delete("token",{path:"/"});
        response.cookies.delete("refreshToken",{path:"/"});

        return response;
    } catch (error) {
        return NextResponse.json(
            { success: false, message: "Internal server error" },
            { status: 500 }
        );
    }
}
