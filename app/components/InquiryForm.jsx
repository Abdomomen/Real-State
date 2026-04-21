"use client"
import { useState, useEffect } from "react";
import { Heart, Share2 } from "lucide-react";
import { useToast } from "@/app/components/ToastProvider";
import { apiClient } from "@/app/lib/api-client";
import useUserStore from "@/app/stores/userStore";

const InquiryForm = ({ buildingId }) => {
  const { showToast } = useToast();
  const user = useUserStore((state) => state.user);
  
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  // Auto-fill if user is logged in
  useEffect(() => {
    if (user) {
        setFormData(prev => ({ 
            ...prev, 
            name: user.name || '', 
            email: user.email || '' 
        }));
    }
  }, [user]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    showToast("UI Concept: Inquiry logic removed.");
    setSent(true);
  };

  return (
    <div className="luxury-border p-10 bg-eggshell sticky top-32 space-y-10">
      <div className="flex justify-between items-center">
        <span className="text-[10px] uppercase tracking-widest text-charcoal/40 font-bold">Inquiry Status: Active</span>
        <div className="flex gap-4">
           <button className="text-charcoal/20 hover:text-red-500 transition-colors"><Heart size={18} /></button>
           <button className="text-charcoal/20 hover:text-charcoal transition-colors"><Share2 size={18} /></button>
        </div>
      </div>

      <div className="space-y-6">
         <h3 className="text-2xl font-serif text-charcoal">Express Interest</h3>
         <p className="text-[11px] font-sans leading-relaxed text-charcoal/40 uppercase tracking-widest italic">
           Private viewings are available by appointment only for qualified collectors.
         </p>
      </div>

      {sent ? (
        <div className="py-12 text-center space-y-4">
           <span className="text-luxury-gold italic font-serif text-xl block">Request Received</span>
           <p className="text-[9px] uppercase tracking-[0.2em] text-charcoal/40">Our concierge will contact you shortly.</p>
        </div>
      ) : (
        <form className="space-y-6" onSubmit={handleSubmit}>
           <input 
             type="text" 
             placeholder="FULL NAME" 
             required
             value={formData.name}
             onChange={(e) => setFormData({...formData, name: e.target.value})}
             className="w-full bg-transparent border-b border-border-light py-4 text-[10px] uppercase tracking-widest font-bold outline-none focus:border-charcoal transition-colors" 
           />
           <input 
             type="email" 
             placeholder="EMAIL ADDRESS" 
             required
             value={formData.email}
             onChange={(e) => setFormData({...formData, email: e.target.value})}
             className="w-full bg-transparent border-b border-border-light py-4 text-[10px] uppercase tracking-widest font-bold outline-none focus:border-charcoal transition-colors" 
           />
           <textarea 
             placeholder="ARCHITECTURAL QUESTIONS" 
             rows={3} 
             value={formData.message}
             onChange={(e) => setFormData({...formData, message: e.target.value})}
             className="w-full bg-transparent border-b border-border-light py-4 text-[10px] uppercase tracking-widest font-bold outline-none focus:border-charcoal transition-colors resize-none" 
           />
           <button 
             disabled={loading}
             className="w-full bg-charcoal text-eggshell py-6 font-sans text-xs uppercase tracking-[0.3em] font-bold hover:bg-luxury-gold transition-colors duration-500 disabled:opacity-50"
           >
             {loading ? "Transmitting..." : "Request Portfolio"}
           </button>
        </form>
      )}
    </div>
  );
};

export default InquiryForm;
