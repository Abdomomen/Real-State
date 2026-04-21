import { NextResponse } from "next/server";
import User from "@/app/lib/models/user";
import Comments from "@/app/lib/models/comments";
import Likes from "@/app/lib/models/likes";
import Building from "@/app/lib/models/buildings";
import { validateApiRequest } from "@/app/lib/api-helpers";
import mongoose from "mongoose";

const CommentReal = Comments;

export async function GET(req, { params }) {
    const { error, response } = await validateApiRequest(req, { requireAdmin: true });
    if (error) return response;

    try {
        const { id } = await params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json({ success: false, message: "Invalid user ID format" }, { status: 400 });
        }
        const user = await User.findById(id).select("-password");
        if (!user) {
            return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
        }
        return NextResponse.json({ success: true, user }, { status: 200 });
    } catch (error) {
        console.error("Get user error:", error);
        return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
    }
}

export async function DELETE(req, { params }) {
    const { error, response } = await validateApiRequest(req, { requireAdmin: true });
    if (error) return response;

    try {
        const { id } = await params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json({ success: false, message: "Invalid user ID format" }, { status: 400 });
        }
        const user = await User.findById(id);
        if (!user) {
            return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
        }

        // Cleanup user data
        await CommentReal.deleteMany({ user: id });
        await Likes.deleteMany({ user: id });
        await Building.deleteMany({ user: id }); 
        
        await user.deleteOne();
        return NextResponse.json({ success: true, message: "User deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("Delete user error:", error);
        return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
    }
}

