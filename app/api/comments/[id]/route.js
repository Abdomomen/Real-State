import { NextResponse } from "next/server";
import { validateApiRequest } from "@/app/lib/api-helpers";
import Comment from "@/app/lib/models/comments";
import Building from "@/app/lib/models/buildings";

const CommentReal = Comment;

export async function DELETE(req, { params }) {
    try {
        const { error, user, decoded, response } = await validateApiRequest(req);
        if (error) return response;

        const { id } = await params;

        const comment = await CommentReal.findById(id);
        if (!comment) {
            return NextResponse.json({ success: false, message: "Comment not found" }, { status: 404 });
        }

        if (comment.user.toString() === decoded.id || user.role === "admin") {
            // Check both buildingId and building field just in case
            const bId = comment.buildingId || comment.building;
            if (bId) {
                await Building.findByIdAndUpdate(bId, { $pull: { commentsReal: id } });
            }
            await comment.deleteOne();
            return NextResponse.json({ success: true, message: "Comment deleted successfully" }, { status: 200 });
        }

        return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });

    } catch (error) {
        console.error("Delete comment error:", error);
        return NextResponse.json(
            {success:false,message:error.message || "internal server Error"},
            {status:500}
        )
    }
}

