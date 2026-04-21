import { cookies } from "next/headers";
import { verifyToken } from "@/app/lib/jwt";

export default async function getUser() {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) return null;

    try {
        const user = await verifyToken(token);
        const actualId = user.id || user._id || user.userId;

        return {
            id: actualId,
            _id: actualId,
            // Fix: added name field so layout/dashboard header display correctly
            name: user.name || user.username || null,
            email: user.email,
            role: user.role || 'user'
        };
    } catch (error) {
        console.error("Auth Error:", error);
        return null;
    }
}