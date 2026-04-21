import getUser from "@/app/lib/getUser";
import { buildingService } from "@/app/services/buildingService";
import { userService } from "@/app/services/userService";
import { commentService } from "@/app/services/commentService";
import Link from "next/link";
import { TrendingUp, Home, Users, MessageSquare, ArrowUpRight } from "lucide-react";

export default async function DashboardPage() {
  const user = await getUser();

  if (!user || user.role !== "admin") {
    return (
      <div className="flex items-center justify-center min-vh-screen bg-black overflow-hidden w-full h-full">
        <img
          src="https://res.cloudinary.com/doq3eivyt/image/upload/q_auto/f_auto/v1776437405/Tom_The_Cat_In_A_Suit_ho6jeb.jpg"
          alt="Intruder Alert"
          className="max-h-screen object-contain"
        />
      </div>
    );
  }

  // Pure SSR data fetching
  const [recentBuildings, allBuildings, users, allComments] = await Promise.all([
    buildingService.getRecentBuildings(5),
    buildingService.getDashboardBuildings(100),
    userService.getAllUsers().catch(() => []),
    // Fix: fetch real comment count instead of hardcoding 0
    commentService.getAllComments().catch(() => []),
  ]);

  const activeAssets = allBuildings.filter(b => b.isActive).length;
  const privateArchives = allBuildings.filter(b => !b.isActive).length;
  const totalComments = allComments.length;

  const stats = [
    { name: "Total Valuation", value: "$" + allBuildings.reduce((acc, curr) => acc + (curr.price || 0), 0).toLocaleString(), icon: TrendingUp },
    { name: "Active Portfolio", value: activeAssets.toLocaleString(), icon: Home },
    { name: "Exclusive Clients", value: users.length.toLocaleString(), icon: Users },
    { name: "Client Inquiries", value: totalComments.toLocaleString(), icon: MessageSquare },
  ];

  return (
    <div className="w-full min-h-full p-6 lg:p-12 space-y-12">
      <header className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 border-b border-gold/20 pb-12">
        <div className="space-y-4">
          <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-forest/30 font-sans">Executive Overview</h4>
          <h2 className="text-5xl md:text-6xl font-serif text-forest leading-tight">
            Good Morning, <br /><span className="italic text-gold">{user.name || "Architect"}.</span>
          </h2>
        </div>
        <div className="flex flex-wrap gap-4 w-full lg:w-auto">
           <button className="flex-1 lg:flex-none border border-gold/30 px-8 py-4 text-forest text-[10px] uppercase tracking-widest font-bold hover:bg-forest hover:text-gold transition-all shadow-sm">
             Generate Report
           </button>
           <Link href="/dashboard/buildings/add" className="flex-1 lg:flex-none flex items-center justify-center px-8 py-4 bg-forest text-gold text-[10px] uppercase tracking-widest font-bold hover:bg-forest-dark border border-gold shadow-lg transition-all">
             Publish Listing
           </Link>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.name}
              className="group border border-gold/20 bg-cream/30 hover:bg-white p-8 space-y-6 transition-all duration-700 shadow-sm hover:shadow-xl cursor-default relative overflow-hidden"
            >
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-forest/5 rounded-full group-hover:scale-150 transition-transform duration-700 pointer-events-none" />
              <div className="flex justify-between items-start relative z-10">
                <div className="w-12 h-12 border border-gold/30 bg-gold/5 flex items-center justify-center text-forest group-hover:text-gold group-hover:bg-forest transition-colors">
                  <Icon size={20} strokeWidth={1.5} />
                </div>
              </div>
              <div className="relative z-10">
                <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-forest/40 group-hover:text-forest/60 transition-colors mb-2">{stat.name}</p>
                <h3 className="text-3xl font-serif text-forest">{stat.value}</h3>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Performance Chart (Visual Representation) */}
        <div className="lg:col-span-2 border border-gold/20 bg-cream/30 hover:bg-white p-10 space-y-8 transition-all duration-700 shadow-sm">
           <div className="flex justify-between items-center border-b border-gold/20 pb-6">
             <h3 className="text-2xl font-serif text-forest">Global Interest Analytics</h3>
             <select className="bg-transparent border-none outline-none text-[10px] uppercase tracking-[0.3em] font-bold text-forest/40 appearance-none cursor-pointer hover:text-gold transition-colors">
               <option>Last 30 Days</option>
               <option>Last Quarter</option>
             </select>
           </div>
           
           <div className="h-64 w-full flex items-end gap-3 px-4 pt-10">
              {[40, 70, 45, 90, 65, 80, 50, 85, 95, 60, 75, 55].map((h, i) => (
                <div key={i} className="flex-1 space-y-2 group cursor-pointer h-full flex items-end">
                   <div className="w-full bg-forest/10 group-hover:bg-gold transition-all duration-500 overflow-hidden relative" style={{ height: `${h}%` }}>
                     <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/20" />
                   </div>
                </div>
              ))}
           </div>
           <div className="flex justify-between px-2 text-[9px] uppercase tracking-widest text-forest/30 font-bold border-t border-gold/10 pt-4">
             <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span>
           </div>
        </div>

        {/* Recent Activity */}
        <div className="border border-gold/20 bg-cream/30 hover:bg-white p-10 flex flex-col transition-all duration-700 shadow-sm">
          <h3 className="text-2xl font-serif text-forest border-b border-gold/20 pb-6 mb-8">Recent Additions</h3>
          <div className="space-y-6 flex-1">
            {recentBuildings.map((building) => (
              <Link key={building._id} href={`/dashboard/buildings/${building._id}`} className="flex items-center gap-5 group cursor-pointer p-2 -mx-2 hover:bg-forest/5 transition-colors">
                <div className="w-16 h-16 overflow-hidden border border-gold/20 bg-forest-dark flex-shrink-0">
                  <img src={building.images?.[0]?.url || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=200"} className="w-full h-full object-cover grayscale group-hover:grayscale-0 scale-110 group-hover:scale-100 transition-all duration-500" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-[11px] uppercase tracking-widest font-bold text-forest truncate pr-4">{building.title}</p>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-forest/40 italic flex items-center gap-2">
                    <span className="w-1 h-1 bg-gold rounded-full" />
                    {building.city || "Unknown"}
                  </p>
                </div>
                <div className="w-8 h-8 rounded-full border border-gold/20 flex items-center justify-center text-forest/20 group-hover:text-gold group-hover:border-gold transition-colors">
                    <ArrowUpRight size={14} />
                </div>
              </Link>
            ))}
          </div>
          <Link href="/dashboard/buildings" className="inline-block w-full text-center py-6 mt-8 border-t border-gold/20 text-[10px] uppercase tracking-[0.3em] font-bold text-forest/40 hover:text-gold transition-colors">
            View Full Inventory
          </Link>
        </div>
      </div>
    </div>
  );
}
