import getUser from "@/app/lib/getUser";
import { redirect } from "next/navigation";
import { buildingService } from "@/app/services/buildingService";
import EditBuildingForm from "@/app/components/EditBuildingForm";

export default async function Edit({ params }) {
  const { id } = await params;
  const user = await getUser();
  if (!user || user.role !== "admin") {
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


  const building = await buildingService.getBuildingById(id);

  return <EditBuildingForm initialData={building} />;
}
