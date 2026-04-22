import ConnectDB from "@/app/lib/db";
import Comment from "@/app/lib/models/comments";
import Building from "@/app/lib/models/buildings";
import User from "@/app/lib/models/user";
import { AppError } from "@/app/lib/errors";

const CommentReal = Comment;

/**
 * Service to handle comment logic with 1:1 parity with original API routes.
 */
export const commentService = {
    /**
     * Adds a new comment (1:1 with /api/comments/add).
     */
    async addComment(buildingId, comment, userId) {
        await ConnectDB();

        if (!buildingId || !comment) {
            throw new AppError("Missing buildingId or comment", 400);
        }

        const building = await Building.findById(buildingId);
        if (!building) {
            throw new AppError("Building not found", 404);
        }

        const newComment = new CommentReal({
            building: buildingId,
            text: comment,
            user: userId
        });

        await newComment.save();

        // Push to building comments array logic preserved
        building.commentsReal.push(newComment._id);
        await building.save();

        return JSON.parse(JSON.stringify({ 
            success: true, 
            comment: newComment 
        }));
    },

    /**
     * Deletes a comment (1:1 with /api/comments/del/[id]).
     */
    // async deleteComment(commentId, userId) {
    //     await ConnectDB();
        
    //     const comment = await CommentReal.findById(commentId);
    //     if (!comment) {
    //         throw new AppError("Comment not found", 404);
    //     }

    //     // Authorization check logic copied if present in original route
    //     // (Assuming simple delete for now based on common patterns)
    //     await CommentReal.findByIdAndDelete(commentId);
        
    //     // Remove from building's comments array
    //     await Building.findOneAndUpdate(
    //         { comments: commentId },
    //         { $pull: { comments: commentId } }
    //     );

    //     return { success: true, message: "Comment deleted" };
    // },
    async getAllComments(){
        await ConnectDB();
        const comments = await CommentReal.find().populate("user", "name").populate("building", "title").sort({ createdAt: -1 }).lean();
        return JSON.parse(JSON.stringify(comments));
    },
    async getCommentById(id){
        await ConnectDB();
        const comment = await CommentReal.findById(id).populate("user", "name").populate("building", "title").lean();
        return JSON.parse(JSON.stringify(comment));
    },
    async updateCommentAdmin(id, comment) {
        await ConnectDB();
        const updatedComment = await CommentReal.findByIdAndUpdate(id, comment, { new: true });
        return JSON.parse(JSON.stringify(updatedComment));
    },
    async deleteCommentAdmin(id) {
        await ConnectDB();
        const deletedComment = await CommentReal.findByIdAndDelete(id);
        return JSON.parse(JSON.stringify(deletedComment));
    },
    async updateComment(id, comment) {
        await ConnectDB();
        const updatedComment = await CommentReal.findByIdAndUpdate(id, comment, { new: true });
        return JSON.parse(JSON.stringify(updatedComment));
    },
    async deleteComment(id) {
        await ConnectDB();
        const deletedComment = await CommentReal.findByIdAndDelete(id);
        return { success: true, message: "Comment deleted" };
    },

};
