import { NextResponse } from "next/server";
import Comment from '@/app/lib/models/comments';
import Building from '@/app/lib/models/buildings';
import { validateApiRequest } from "@/app/lib/api-helpers";
import User from "@/app/lib/models/user";
import mongoose from "mongoose";

const CommentReal = Comment;

export async function DELETE(req, { params }) {
    const { error, response } = await validateApiRequest(req, { requireAdmin: true });
    if (error) return response;

    try {
        const { id } = await params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json({ success: false, message: "Invalid comment ID format" }, { status: 400 });
        }
        const comment = await CommentReal.findById(id);
        
        if (!comment) {
            return NextResponse.json({ success: false, message: "Comment not found" }, { status: 404 });
        }

        // Remove reference from building
        await Building.findByIdAndUpdate(comment.building, { $pull: { commentsReal: id } });
        await User.findByIdAndUpdate(comment.user, { $pull: { comments: id } });
        await comment.deleteOne();
        return NextResponse.json({ success: true, message: "Comment deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("Delete dashboard comment error:", error);
        return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
    }
}

