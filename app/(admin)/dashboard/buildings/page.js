import { buildingService } from "@/app/services/buildingService";
import getUser from "@/app/lib/getUser";
import DeleteComponent from "@/app/components/DeleteComponent";
import Link from "next/link";
import { Edit3 } from "lucide-react";
export default async function BuildingsPage() {
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

  const buildings = await buildingService.getAllBuildings();

  return (
    <div className="w-full min-h-full p-6 lg:p-12 space-y-12">
      <header className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 border-b border-gold/20 pb-12">
        <div className="space-y-4">
          <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-forest/30 font-sans">Asset Management</h4>
          <h2 className="text-5xl md:text-6xl font-serif text-forest leading-tight">Property <span className="italic text-gold">Inventory.</span></h2>
        </div>
        <div className="flex flex-wrap gap-4 w-full lg:w-auto">
           <Link href="/dashboard/buildings/add" className="flex-1 lg:flex-none flex items-center justify-center gap-3 px-8 py-4 bg-forest text-gold text-[10px] uppercase tracking-widest hover:bg-forest-dark transition-all font-bold border border-gold shadow-lg shadow-forest/10">
             Register Asset
           </Link>
        </div>
      </header>

      <div className="w-full overflow-x-auto custom-scrollbar">
        <table className="w-full border-separate border-spacing-y-4">
          <thead>
            <tr className="text-[10px] uppercase tracking-[0.4em] font-bold text-forest/40">
              <th className="px-8 pb-4 text-left">Reference Asset</th>
              <th className="px-8 pb-4 text-center">Location</th>
              <th className="px-8 pb-4 text-center">Valuation</th>
              <th className="px-8 pb-4 text-center">Lifecycle</th>
              <th className="px-8 pb-4 text-right">Curation</th>
            </tr>
          </thead>
          <tbody className="space-y-4">
            {buildings.length > 0 ? (
              buildings.map((building) => (
                <tr 
                  key={building._id} 
                  className="group bg-white/40 hover:bg-white transition-all duration-500 shadow-sm hover:shadow-2xl border border-gold/10"
                >
                  <td className="py-8 px-8 align-middle first:rounded-l-lg">
                    <div className="flex items-center gap-8">
                      <div className="w-24 aspect-[4/3] flex-shrink-0 bg-forest-dark overflow-hidden border border-gold/20 grayscale group-hover:grayscale-0 transition-all duration-700 shadow-sm relative">
                         <img src={building.images?.[0]?.url || `https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=200`} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 scale-110 group-hover:scale-100 transition-transform duration-700" alt="Building" />
                         <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <div className="space-y-1.5">
                        <Link href={`/dashboard/buildings/${building._id}`} className="text-xl font-serif text-forest hover:text-gold transition-colors block leading-tight">
                          {building.title}
                        </Link>
                        <p className="text-[9px] uppercase tracking-[0.2em] text-forest/40 font-bold flex items-center gap-2">
                           <span className="w-1 h-1 rounded-full bg-gold" />
                           {building.type || "Exclusive Estate"}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-8 px-8 align-middle text-center">
                    <div className="flex flex-col gap-1">
                       <span className="text-xs uppercase tracking-widest text-forest font-bold">{building.city}</span>
                       <span className="text-[10px] tracking-widest text-forest/30 font-serif italic">{building.state}</span>
                    </div>
                  </td>
                  <td className="py-8 px-8 align-middle text-center">
                    <span className="text-xl font-serif text-forest/80 group-hover:text-gold transition-colors">
                      ${building.price?.toLocaleString()}
                    </span>
                  </td>
                  <td className="py-8 px-8 align-middle text-center">
                    <span className={`inline-block text-[8px] uppercase tracking-[0.2em] font-bold px-4 py-2 border ${
                      building.isActive 
                        ? "text-forest border-forest/20 bg-forest/5" 
                        : "text-red-900 border-red-900/20 bg-red-900/5 opacity-60"
                    }`}>
                      {building.isActive ? "Active Sale" : "Private Archive"}
                    </span>
                  </td>
                  <td className="py-8 px-8 align-middle last:rounded-r-lg">
                    <div className="flex justify-end items-center gap-6">
                        <Link 
                          href={`/dashboard/buildings/${building._id}/edit`} 
                          className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-forest/40 hover:text-gold transition-all font-bold group/btn"
                        >
                            <span className="opacity-0 group-hover/btn:opacity-100 transition-opacity mr-1">Modify</span>
                            <div className="p-3 border border-gold/20 hover:border-gold hover:bg-gold/5 transition-all">
                                <Edit3 size={16} />
                            </div>
                        </Link>
                        <div className="flex items-center gap-2">
                           <DeleteComponent id={building._id} title={building.title} />
                        </div>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
                <tr>
                    <td colSpan="5" className="py-40 text-center border-2 border-dashed border-gold/20 bg-cream/20">
                        <p className="text-[10px] uppercase tracking-[0.4em] text-forest/30 font-bold italic">The guild archives are currently empty.</p>
                    </td>
                </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
