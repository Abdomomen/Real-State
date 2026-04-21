import getUser from "@/app/lib/getUser";
import Searching from "@/app/components/Searching";

export default async function Search({ params }){
    const user = await getUser()
    if(!user || user.role !== "admin"){
        return (
            <div className="flex items-center justify-center min-h-screen bg-black overflow-hidden">
              <img 
                src="https://res.cloudinary.com/doq3eivyt/image/upload/q_auto/f_auto/v1776437405/Tom_The_Cat_In_A_Suit_ho6jeb.jpg" 
                alt="Intruder Alert" 
                className="max-h-screen object-contain"
              />
            </div>
        );
    }

    return(
        <>
        <Searching role={user.role} />
        </>
    )
}
