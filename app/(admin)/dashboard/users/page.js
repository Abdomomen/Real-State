import { userService } from "@/app/services/userService";
import getUser from "@/app/lib/getUser";
import DeleteUser from "@/app/components/DeleteUser";
import Link from "next/link";
export const metadata = {
  title: "Member Directory | Guild Management",
};

export default async function UsersPage() {
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

  const users = await userService.getAllUsers();

  return (
    <div className="w-full min-h-full p-6 lg:p-12 space-y-12">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-gold/20 pb-12">
        <div className="space-y-4">
          <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-forest/30 font-sans">Human Capital</h4>
          <h2 className="text-5xl md:text-6xl font-serif text-forest leading-tight">Elite <span className="italic text-gold">Circle.</span></h2>
        </div>
      </header>

      {/* Table */}
      <div className="w-full overflow-hidden">
        <table className="w-full text-center border-collapse">
          <thead>
            <tr className="border-b border-gold/20">
              <th className="pb-6 text-[10px] uppercase tracking-[0.3em] font-bold text-forest/30 font-sans">Member Profile</th>
              <th className="pb-6 text-[10px] uppercase tracking-[0.3em] font-bold text-forest/30 font-sans">Role / Title</th>
              <th className="pb-6 text-[10px] uppercase tracking-[0.3em] font-bold text-forest/30 font-sans">Tenure</th>
              <th className="pb-6 text-[10px] uppercase tracking-[0.3em] font-bold text-forest/30 font-sans">Credential</th>
              <th className="pb-6 text-[10px] uppercase tracking-[0.3em] font-bold text-forest/30 font-sans">Moderation</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gold/10">
            {users.length > 0 ? (
              users.map((u) => (
                <tr 
                  key={u._id} 
                  className="group hover:bg-forest/5 transition-colors"
                >
                  <td className="py-8">
                    <div className="flex items-center justify-center gap-6">
                      <div className="w-12 h-12 bg-gold/5 flex-shrink-0 flex items-center justify-center font-serif text-xl text-gold border border-gold/20 group-hover:bg-forest group-hover:text-gold group-hover:border-forest transition-all duration-700 uppercase">
                         {u.name?.split(' ').map(n => n[0]).join('') || "U"}
                      </div>
                      <div className="text-left">
                        <p className="text-base font-serif text-forest">{u.name}</p>
                        <p className="text-[10px] tracking-widest text-forest/40 font-sans uppercase">{u.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-8">
                     <div className="flex items-center justify-center gap-3 text-[10px] uppercase tracking-widest text-forest/60 font-bold font-sans">
                       {u.role === 'admin' ? 'Founding Architect' : 'Legacy Collector'}
                     </div>
                  </td>
                  <td className="py-8 text-sm font-serif italic text-forest/50">
                    Est. {new Date(u.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                  </td>
                  <td className="py-8">
                    <span className="text-[9px] uppercase tracking-widest font-bold flex items-center justify-center gap-3 text-gold">
                      <div className="w-2 h-2 rounded-full bg-gold shadow-[0_0_8px_rgba(197,160,101,0.5)]" />
                      Verified Portfolio
                    </span>
                  </td>
                  <td className="py-8">
                     <div className="flex justify-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <Link href={`/dashboard/users/${u._id}`} className="p-3 bg-white border border-gold/20 text-forest/40 hover:text-forest transition-all shadow-sm">View</Link>
                        <DeleteUser id={u._id.toString()} name={u.name} />
                     </div>
                  </td>
                </tr>
              ))
            ) : (
                <tr>
                    <td colSpan="5" className="py-32 text-center text-[10px] uppercase tracking-[0.4em] text-forest/10 font-bold italic">
                        The registry is currently under secure access protocol.
                    </td>
                </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
