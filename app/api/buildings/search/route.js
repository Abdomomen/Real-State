import { NextResponse } from "next/server";
import { buildingService } from "@/app/services/buildingService";
import { validateApiRequest } from "@/app/lib/api-helpers";
import { AppError } from "@/app/lib/errors";

export async function GET(req) {
    try {
        const { error, response } = await validateApiRequest(req);
        if (error) return response;

        const { searchParams } = new URL(req.url);
        const filters = {
            city: searchParams.get("city"),
            state: searchParams.get("state"),
            minPrice: searchParams.get("minPrice"),
            maxPrice: searchParams.get("maxPrice"),
            type: searchParams.get("type"),
        };

        const buildings = await buildingService.searchBuildings(filters);

        return NextResponse.json(
            { success: true, buildings },
            { status: 200 }
        );
    } catch (error) {
        console.error("Search buildings error:", error);
        
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
