import { NextResponse } from "next/server";
import { commentService } from "@/app/services/commentService";
import { validateApiRequest } from "@/app/lib/api-helpers";
import { AppError } from "@/app/lib/errors";

export async function POST(req) {
    const { error, user, response } = await validateApiRequest(req);
    if (error) return response;

    try {
        const { buildingId, comment } = await req.json();
        const result = await commentService.addComment(buildingId, comment, user._id);
        
        return NextResponse.json(result, { status: 200 });
    } catch (error) {
        console.error("Add comment error:", error);
        
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