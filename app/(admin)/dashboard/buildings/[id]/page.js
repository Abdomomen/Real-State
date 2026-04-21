import getUser from "@/app/lib/getUser"
import { redirect } from "next/navigation"
import { buildingService } from "@/app/services/buildingService"
import DeleteComponent from "@/app/components/DeleteComponent"
import AddCommentAdmin from "@/app/components/AddCommentAdmin"
import Link from "next/link"
import { ArrowLeft, Edit3 } from "lucide-react"
import BuildingGallery from "@/app/components/BuildingGallery"
import DeleteComment     from "@/app/components/DeleteComment"
export default async function BuildingPage({params}){
    const user = await getUser()
    if (!user || user.role !== "admin"){
        return <div className="flex items-center justify-center min-h-screen bg-black overflow-hidden">
        <img 
          src="https://res.cloudinary.com/doq3eivyt/image/upload/q_auto/f_auto/v1776437405/Tom_The_Cat_In_A_Suit_ho6jeb.jpg" 
          alt="Intruder Alert" 
          className="max-h-screen object-contain"
        />
      </div>
    }
    const {id} = await params
    const building = await buildingService.getBuildingById(id)
    const buildingComments= await buildingService.getBuildingComments(id)
    // Fix: added null guard — redirect to list if building not found
    if (!building) {
        redirect("/dashboard/buildings");
    }
    
    return (
        <div className="w-full min-h-full p-6 lg:p-12 space-y-12">
            <header className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 border-b border-gold/20 pb-12">
                <div className="space-y-4">
                    <Link href="/dashboard/buildings" className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-forest/40 hover:text-forest transition-colors font-bold mb-4 font-sans">
                        <ArrowLeft size={14} /> Back to Inventory
                    </Link>
                    <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-forest/30 font-sans">Asset Dossier</h4>
                    <h2 className="text-4xl md:text-5xl font-serif text-forest leading-tight">{building.title}</h2>
                    <div className="flex items-center gap-4 text-xs uppercase tracking-widest text-forest/50 font-bold font-sans mt-2">
                        <span>{building.city}, {building.state}</span>
                        <div className="w-1.5 h-1.5 rounded-full bg-gold/50" />
                        <span className="text-gold border border-gold/20 px-2 py-0.5">{building.type || "estate"}</span>
                        <div className="w-1.5 h-1.5 rounded-full bg-gold/50" />
                        <span className={building.isActive ? "text-green-600" : "text-red-900"}>{building.isActive ? "Active Listing" : "Private Archive"}</span>
                    </div>
                </div>
                <div className="flex gap-4 w-full lg:w-auto">
                    <Link href={`/dashboard/buildings/${id}/edit`} className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-6 py-3 border border-gold/30 text-[10px] uppercase tracking-widest text-forest/60 hover:text-forest hover:bg-forest/5 transition-all font-bold group">
                        <Edit3 size={14} className="text-gold group-hover:text-forest" /> Edit Brief
                    </Link>
                    <div className="flex-1 lg:flex-none">
                       <DeleteComponent id={id} role={user.role} />
                    </div>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 space-y-12">
                    <BuildingGallery images={building.images} />

                    <div className="space-y-6">
                        <h3 className="text-2xl font-serif text-forest border-b border-gold/10 pb-4">Architectural Narrative</h3>
                        <p className="text-forest/70 font-serif leading-relaxed text-lg italic">{building.description || "No narrative has been recorded for this asset yet."}</p>
                    </div>
                </div>

                <div className="space-y-10">
                    <div className="p-10 border border-gold/20 bg-cream/30 space-y-8 shadow-sm">
                        <h3 className="text-[10px] uppercase tracking-[0.4em] font-bold text-gold font-sans border-b border-gold/10 pb-4">Financials & Specifications</h3>
                        <div className="space-y-6">
                            <div className="flex justify-between items-end border-b border-forest/5 pb-4">
                                <span className="text-[10px] uppercase tracking-widest text-forest/40 font-bold">Valuation</span>
                                <span className="text-2xl font-serif text-forest">${building.price?.toLocaleString() || "Upon Request"}</span>
                            </div>
                            <div className="flex justify-between items-end border-b border-forest/5 pb-4">
                                <span className="text-[10px] uppercase tracking-widest text-forest/40 font-bold">Location</span>
                                <span className="text-sm font-serif italic text-forest text-right">{building.address}<br/>{building.city}, {building.state}</span>
                            </div>
                        </div>
                    </div>
                    {/* Show building Comments */}
                    <div className="p-10 border border-gold/20 bg-forest text-cream space-y-8 shadow-xl">
                        <h3 className="text-[10px] uppercase tracking-[0.4em] font-bold text-gold font-sans border-b border-gold/20 pb-4">Moderation Deck</h3>
                        <div className="space-y-6 max-h-[400px] overflow-y-auto pr-4 custom-scrollbar">
                            {buildingComments && buildingComments.length > 0 ? (
                                buildingComments.map((comment) => (
                                    <div key={comment._id} className="p-6 bg-white/5 border border-gold/10 space-y-4">
                                        <div className="flex justify-between items-start">
                                            <div className="space-y-1">
                                                <p className="text-[9px] uppercase tracking-widest text-gold font-bold">Collector</p>
                                                <p className="text-sm font-serif italic text-cream">{comment.user?.name || "Anonymous"}</p>
                                            </div>
                                            <DeleteComment id={comment._id} />
                                        </div>
                                        <p className="text-xs text-cream/70 leading-relaxed font-sans">{comment.text}</p>
                                        <p className="text-[8px] text-gold/40 uppercase tracking-widest">{new Date(comment.createdAt).toLocaleDateString()}</p>
                                    </div>
                                ))
                            ) : (
                                <p className="text-xs font-serif italic text-gold/40 text-center py-10">No records found in the telemetry logs.</p>
                            )}
                        </div>
                        
                        <div className="pt-8 border-t border-gold/10">
                            <h4 className="text-[9px] uppercase tracking-widest font-bold text-gold mb-6">New Entry</h4>
                            <AddCommentAdmin role={user.role} buildingId={id} buildingName={building.title}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}