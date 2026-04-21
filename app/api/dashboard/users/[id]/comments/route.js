import { validateApiRequest } from "@/app/lib/api-helpers";
import Comment from "@/app/lib/models/comments";
import { NextResponse } from "next/server";

const CommentReal = Comment;

export async function GET(req, { params }) {
    try {
        const { error, response } = await validateApiRequest(req, { requireAdmin: true });
        if (error) return response;

        const { id } = await params;
        const comments= await CommentReal.find({user:id}).limit(20).sort({createdAt:-1})
        return NextResponse.json(
            {success:true,comments},
            {status:200}
        )
    } catch (error) {
        console.error("Get comments error:", error);
        return NextResponse.json(
            {success:false,message:"Internal server error"},
            {status:500}
        )
    }
}