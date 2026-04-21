import { NextResponse } from "next/server";
import { buildingService } from "@/app/services/buildingService";
import { validateApiRequest } from "@/app/lib/api-helpers";
import { AppError } from "@/app/lib/errors";

export async function PUT(req, { params }) {
    const { error, response } = await validateApiRequest(req, { requireAdmin: true });
    if (error) return response;

    try {
        const { id } = await params;
        const formData = await req.formData();
        
        // Parse the structured metadata sent by the client
        const imagesMetadata = JSON.parse(formData.get("imagesFiles") || "[]");
        
        // Reconstruct the imageFiles array for the service
        const imageFiles = imagesMetadata.map(item => {
            if (item.tempId) {
                // New file: match metadata tempId to the uploaded file in formData
                return {
                    file: formData.get(`file_${item.tempId}`),
                    tempId: item.tempId,
                    order: item.order
                };
            }
            // Existing image
            return {
                id: item.id,
                order: item.order
            };
        });

        const data = {
            title: formData.get("title"),
            description: formData.get("description"),
            price: formData.get("price"),
            address: formData.get("address"),
            city: formData.get("city"),
            state: formData.get("state"),
            imageFiles, // Structured array
            type: formData.get("type"),
            isActive: formData.get("isActive"),
            bedrooms: formData.get("bedrooms"),
            bathrooms: formData.get("bathrooms"),
            area: formData.get("area"),
        };

        const result = await buildingService.updateBuilding(id, data);
        return NextResponse.json(result, { status: 200 });
    } catch (error) {
        console.error("Update building error:", error);
        
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
    const { error, response } = await validateApiRequest(req, { requireAdmin: true });
    if (error) return response;

    try {
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

export async function GET(req, { params }) {
    const { error, response } = await validateApiRequest(req, { requireAdmin: true });
    if (error) return response;

    try {
        const { id } = await params;
        const building = await buildingService.getBuildingById(id);
        return NextResponse.json({ success: true, building }, { status: 200 });
    } catch (error) {
        console.error("Get building error:", error);
        
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