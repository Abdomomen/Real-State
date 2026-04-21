import { validateApiRequest } from "@/app/lib/api-helpers";
import Likes from "@/app/lib/models/likes";

export async function GET(req, { params }) {
    try {
        const { error, response } = await validateApiRequest(req, { requireAdmin: true });
        if (error) return response;

        const { id } = await params;
        const likes= await Likes.find({user:id}).limit(20).sort({createdAt:-1})
        return NextResponse.json(
            {success:true,likes},
            {status:200}
        )
    } catch (error) {
        console.error("Get likes error:", error);
        return NextResponse.json(
            {success:false,message:"Internal server error"},
            {status:500}
        )
    }
}