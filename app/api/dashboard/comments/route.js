import { NextResponse } from "next/server";
import Comment from "@/app/lib/models/comments";
import { validateApiRequest } from "@/app/lib/api-helpers";

const CommentReal = Comment;

export async function GET(req) {
    const { error, response } = await validateApiRequest(req, { requireAdmin: true });
    if (error) return response;

    try {
        const comments = await CommentReal.find().populate("user", "name email").limit(20);
        return NextResponse.json({ success: true, comments }, { status: 200 });
    } catch (error) {
        console.error("Get comments error:", error);
        return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
    }
}
