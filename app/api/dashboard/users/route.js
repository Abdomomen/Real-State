import { NextResponse } from "next/server";
import User from "@/app/lib/models/user";
import { validateApiRequest } from "@/app/lib/api-helpers";

export async function GET(req) {
    const { error, response } = await validateApiRequest(req, { requireAdmin: true });
    if (error) return response;

    try {
        const users = await User.find().select("-password").limit(10);
        return NextResponse.json({ success: true, users }, { status: 200 });
    } catch (error) {
        console.error("Get users error:", error);
        return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
    }
}