import { NextResponse } from "next/server";
import ConnectDB from "@/app/lib/db";
import User from "@/app/lib/models/user";
import mongoose from "mongoose";
import { verifyToken } from "@/app/lib/jwt";

/**
 * Validates the API request by connecting to DB, checking the token,
 * and optionally verifying admin privileges.
 * 
 * @param {Request} req - The Next.js request object
 * @param {Object} options - Configuration options
 * @param {boolean} options.requireAdmin - Whether admin role is required
 * @returns {Promise<{user: Object, decoded: Object, response?: NextResponse}>}
 */
export async function validateApiRequest(req, { requireAdmin = false } = {}) {
    try {
        await ConnectDB();

        let token = req.headers.get("authorization") || req.headers.get("Authorization");
        
        if (!token) {
            token = req.cookies.get("token")?.value;
        } else {
            token = token.split(" ")[1];
        }

        if (!token) {
            return { 
                error: true, 
                response: NextResponse.json({ success: false, message: "UnAuthenticated" }, { status: 400 }) 
            };
        }

        const decoded = await verifyToken(token, 'access');
        if (!decoded) {
            return { 
                error: true, 
                response: NextResponse.json({ success: false, message: "Invalid token" }, { status: 401 }) 
            };
        }

        const userId = decoded.id || decoded._id || decoded.userId;

        if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
            return { 
                error: true, 
                response: NextResponse.json({ success: false, message: "Invalid User ID in token" }, { status: 400 }) 
            };
        }

        const user = await User.findById(userId);
        if (!user) {
            return { 
                error: true, 
                response: NextResponse.json({ success: false, message: "User not found" }, { status: 404 }) 
            };
        }

        if (requireAdmin && user.role !== "admin") {
            return { 
                error: true, 
                response: NextResponse.json({ success: false, message: "Unauthorized. Admin privileges required." }, { status: 401 }) 
            };
        }

        return { error: false, user, decoded };
    } catch (error) {
        console.error("API Validation Error:", error);
        return { 
            error: true, 
            response: NextResponse.json({ success: false, message: "Internal server error during validation" }, { status: 500 }) 
        };
    }
}
