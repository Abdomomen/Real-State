import getUser from "@/app/lib/getUser";
import { redirect } from "next/navigation";
import { userService } from "@/app/services/userService";
import { User, Mail, Shield, Calendar, Heart, MessageSquare, ArrowLeft } from "lucide-react";
import Link from "next/link";
import DeleteUser from "@/app/components/DeleteUser";
export default async function UserDetail({ params }){
    const { id } = await params;
    const admin = await getUser();
    if(!admin || admin.role !== "admin"){
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


    const userDetail = await userService.getUserById(id);

    return (
        <div className="w-full min-h-full p-6 lg:p-12 space-y-12">
            <header className="flex items-center justify-between border-b border-gold pb-8">
                <div className="space-y-4">
                    <Link href="/dashboard/users" className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-forest/40 hover:text-charcoal transition-colors font-bold mb-4 font-sans">
                        <ArrowLeft size={14} /> Back to Directory
                    </Link>
                    <h2 className="text-4xl font-serif text-charcoal">Member <span className="italic">Portfolio.</span></h2>
                </div>
                <div className="flex gap-4">
                    {/* Fix: replaced broken /dashboard/users/${id}/delete link with the actual DeleteUser component */}
                    <DeleteUser id={id.toString()} name={userDetail.name} />
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-1 space-y-8">
                    <div className="border-gold/10 p-10 text-center space-y-6">
                        <div className="w-24 h-24 bg-forest text-gold mx-auto flex items-center justify-center font-serif text-3xl border-gold/10">
                            {userDetail.name?.substring(0, 2).toUpperCase()}
                        </div>
                        <div>
                            <h3 className="text-2xl font-serif text-charcoal">{userDetail.name}</h3>
                            <p className="text-[10px] uppercase tracking-widest text-forest/40 font-bold">{userDetail.role === 'admin' ? "Architect" : "Verified Collector"}</p>
                        </div>
                        <div className="pt-6 border-t border-gold/10 flex justify-center gap-6">
                             <div className="text-center">
                                <p className="text-[9px] uppercase tracking-widest text-forest/30 font-bold">Status</p>
                                <p className="text-xs font-serif italic text-green-600">Active</p>
                             </div>
                             <div className="text-center">
                                <p className="text-[9px] uppercase tracking-widest text-forest/30 font-bold">Tier</p>
                                <p className="text-xs font-serif italic text-gold">Prestige</p>
                             </div>
                        </div>
                    </div>

                    <div className="border-gold/10 p-10 space-y-6 bg-forest text-cream">
                        <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-gold mb-6">Contact Dossier</h4>
                        <div className="space-y-4">
                            <div className="flex items-center gap-4 text-xs font-sans tracking-widest">
                                <Mail size={14} className="text-gold" />
                                {userDetail.email}
                            </div>
                            <div className="flex items-center gap-4 text-xs font-sans tracking-widest">
                                <Shield size={14} className="text-gold" />
                                {userDetail.role.toUpperCase()} PRIVILEGES
                            </div>
                            <div className="flex items-center gap-4 text-xs font-sans tracking-widest">
                                <Calendar size={14} className="text-gold" />
                                JOINED {new Date(userDetail.createdAt).toLocaleDateString().toUpperCase()}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-2 space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <Link href={`/dashboard/users/${id}/likes`} className="border-gold/10 p-10 hover:bg-forest hover:text-cream group transition-all duration-700 space-y-6">
                            <div className="flex justify-between items-start">
                                <div className="w-10 h-10 bg-gold/10 flex items-center justify-center text-gold group-hover:bg-cream/10 transition-colors">
                                    <Heart size={18} />
                                </div>
                            </div>
                            <div>
                                <h3 className="text-2xl font-serif">Aesthetic Interests</h3>
                                <p className="text-[10px] uppercase tracking-widest opacity-40 font-bold mt-2">View Saved Curations</p>
                            </div>
                        </Link>

                        <Link href={`/dashboard/users/${id}/comments`} className="border-gold/10 p-10 hover:bg-forest hover:text-cream group transition-all duration-700 space-y-6">
                            <div className="flex justify-between items-start">
                                <div className="w-10 h-10 bg-gold/10 flex items-center justify-center text-gold group-hover:bg-cream/10 transition-colors">
                                    <MessageSquare size={18} />
                                </div>
                            </div>
                            <div>
                                <h3 className="text-2xl font-serif">Historical Logs</h3>
                                <p className="text-[10px] uppercase tracking-widest opacity-40 font-bold mt-2">View Social Interactions</p>
                            </div>
                        </Link>
                    </div>

                    <div className="border-gold/10 p-10 bg-forest/[0.02]">
                        <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-forest/30 mb-8 font-sans">Activity Overview</h4>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center py-4 border-b border-gold/10">
                                <p className="text-[11px] font-sans tracking-widest text-charcoal uppercase font-bold">Member Since</p>
                                <p className="text-[10px] font-serif italic text-forest/40">{new Date(userDetail.createdAt).toLocaleDateString('en-US', { dateStyle: 'long' })}</p>
                            </div>
                            <div className="flex justify-between items-center py-4 border-b border-gold/10">
                                <p className="text-[11px] font-sans tracking-widest text-charcoal uppercase font-bold">Account Role</p>
                                <p className="text-[10px] font-serif italic text-forest/40">{userDetail.role === 'admin' ? 'Administrator' : 'Standard User'}</p>
                            </div>
                            <div className="flex justify-between items-center py-4">
                                <p className="text-[11px] font-sans tracking-widest text-charcoal uppercase font-bold">Account Status</p>
                                <p className="text-[10px] font-sans font-bold text-green-700 uppercase tracking-widest">Active</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
