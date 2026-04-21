import { NextResponse } from "next/server";
import { buildingService } from "@/app/services/buildingService";
import { validateApiRequest } from "@/app/lib/api-helpers";
import { AppError } from "@/app/lib/errors";

export async function GET(req) {
    try {
        const { error, response } = await validateApiRequest(req);
        if (error) return response;

        const buildings = await buildingService.getRecent(10);

        return NextResponse.json(
            { success: true, buildings },
            { status: 200 }
        );
    } catch (error) {
        console.error("Recent buildings error:", error);
        
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