import { NextResponse } from "next/server";
import { buildingService } from "@/app/services/buildingService";
import { validateApiRequest } from "@/app/lib/api-helpers";
import { AppError } from "@/app/lib/errors";

export async function GET(req) {
    const { error, response } = await validateApiRequest(req, { requireAdmin: true });
    if (error) return response;

    try {
        const buildings = await buildingService.getDashboardBuildings(10);
        return NextResponse.json({ success: true, buildings }, { status: 200 });
    } catch (error) {
        console.error("Get buildings error:", error);
        return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
    }
}

export async function POST(req) {
    const { error, user, response } = await validateApiRequest(req, { requireAdmin: true });
    if (error) return response;

    try {
        const formData = await req.formData();
        
        // Prepare data for service
        const data = {
            title: formData.get("title"),
            description: formData.get("description"),
            price: formData.get("price"),
            address: formData.get("address"),
            city: formData.get("city"),
            state: formData.get("state"),
            imageFiles: formData.getAll("imagesFiles"), // Passing File objects directly to service
            type: formData.get("type"),
            isActive: formData.get("isActive"),
            bedrooms: formData.get("bedrooms"),
            bathrooms: formData.get("bathrooms"),
            area: formData.get("area"),
        };

        const result = await buildingService.addBuilding(data);
        return NextResponse.json(result, { status: 200 });
    } catch (error) {
        console.error("Add building error:", error);
        
        if (error instanceof AppError) {
            return NextResponse.json(
                { success: false, message: error.message },
                { status: error.statusCode }
            );
        }

        return NextResponse.json(
            { success: false, message: error.message || "Internal server error" },
            { status: 500 }
        );
    }
}
