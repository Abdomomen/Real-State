import getUser from "../lib/getUser";
import DashboardSidebar from "../components/DashboardSidebar";

export const metadata = {
  title: "Vivid | Designer Dashboard",
  description: "Administrative suite for the modern collector.",
};

export default async function AdminLayout({ children }) {
  const user = await getUser();

  if (!user || user.role !== "admin") {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black overflow-hidden w-full">
        <img 
          src="https://res.cloudinary.com/doq3eivyt/image/upload/q_auto/f_auto/v1776437405/Tom_The_Cat_In_A_Suit_ho6jeb.jpg" 
          alt="Intruder Alert" 
          className="max-h-screen object-contain"
        />
      </div>
    );
  }

  return (
    <div className="flex bg-cream selection:bg-gold/20 selection:text-forest">
      <DashboardSidebar user={user} />

      <main className="flex-1 ml-72 relative min-h-screen pb-20">
        <div className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/pinstriped-suit.png')]" />

        <header className="h-20 border-b border-gold/10 flex items-center justify-between px-10 sticky top-0 bg-cream/90 backdrop-blur-md z-20">
          <div className="text-forest/30 uppercase tracking-[0.3em] font-bold text-[10px] hidden lg:block">
            Secure Terminal
          </div>
          <div className="flex items-center gap-8 ml-auto">
            <div className="flex items-center gap-4 cursor-pointer group">
               <div className="text-right">
                 <p className="text-[10px] uppercase tracking-widest font-bold text-forest">{user?.name || "Member"}</p>
                 <p className="text-[9px] uppercase tracking-widest text-forest/40">{user?.role === 'admin' ? "Head Architect" : "Private Collector"}</p>
               </div>
               <div className="w-10 h-10 border border-gold/20 bg-forest/5 flex items-center justify-center font-serif text-forest group-hover:bg-forest group-hover:text-gold transition-all duration-500 uppercase">
                 {user?.name?.substring(0, 2) || "AV"}
               </div>
            </div>
          </div>
        </header>
        
        <div className="relative w-full min-h-full max-w-[1400px] mx-auto flex flex-col pt-4">
          {children}
        </div>
      </main>
    </div>
  );
}

