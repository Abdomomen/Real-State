import { NextResponse } from "next/server";
import { validateApiRequest } from "@/app/lib/api-helpers";
import Like from "@/app/lib/models/likes";
import Building from "@/app/lib/models/buildings";

export async function POST(req, { params }) {
    const { error, user, response } = await validateApiRequest(req);
    if (error) return response;

    try {
        const { id } = await params; 

        const building = await Building.findById(id);
        if (!building) {
            return NextResponse.json({ success: false, message: "Building not found" }, { status: 404 });
        }

        const existingLike = await Like.findOne({ user: user._id, building: id });

        if (existingLike) {
            // Unlike
            await existingLike.deleteOne();
            await Building.findByIdAndUpdate(id, { $inc: { likesCount: -1 } });
            return NextResponse.json({ success: true, message: "Like removed" }, { status: 200 });
        } else {
            // Like
            const newLike = new Like({ user: user._id, building: id });
            await newLike.save();
            await Building.findByIdAndUpdate(id, { $inc: { likesCount: 1 } });
            return NextResponse.json({ success: true, message: "Like added" }, { status: 200 });
        }

    } catch (error) {
        console.error("Toggle like error:", error);
        return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
    }
}