import { NextResponse } from "next/server";
import { buildingService } from "@/app/services/buildingService";
import { validateApiRequest } from "@/app/lib/api-helpers";
import { AppError } from "@/app/lib/errors";

export async function GET(req, { params }) {
    try {
        const { error, response } = await validateApiRequest(req);
        if (error) return response;

        const { id } = await params;
        // Fix: was incorrectly calling buildingService.getById (non-existent)
        const building = await buildingService.getBuildingById(id);

        return NextResponse.json(
            { success: true, building },
            { status: 200 }
        );
    } catch (error) {
        console.error("Building details error:", error);
        
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

export async function DELETE(req, { params }) {
    try {
        const { error, response } = await validateApiRequest(req, { requireAdmin: true });
        if (error) return response;

        const { id } = await params;
        const result = await buildingService.deleteBuilding(id);

        return NextResponse.json(result, { status: 200 });
    } catch (error) {
        console.error("Delete building error:", error);

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