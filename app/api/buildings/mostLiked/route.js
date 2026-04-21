import { validateApiRequest } from "@/app/lib/api-helpers";

export async function GET(req) {
    try {
        const { error, response } = await validateApiRequest(req);
        if (error) return response;
        const mostLiked= await Building.find().sort({likesCount: -1}).limit(10)
        return NextResponse.json(
            {success:true,mostLiked},
            {status:200}
        )
    } catch (error) {
        console.error("Most liked buildings error:", error);
        return NextResponse.json(
            {success:false,message:"Internal server error"},
            {status:500}
        )
    }
}