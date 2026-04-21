"use client";

import React, { useState, useCallback } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useRouter } from "next/navigation";
import { UploadCloud, GripVertical, Trash2, Save, Loader2 } from "lucide-react";

// --- Sortable Item Component (Vanilla JS) ---
const SortableImageCard = ({ img, onDelete }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: img.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`relative group aspect-video overflow-hidden border ${
        isDragging ? "border-gold shadow-xl scale-[1.02]" : "border-gold/30"
      } bg-forest-dark`}
    >
      <img src={img.url} alt="property thumbnail" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />

      {/* Drag Handle Overlay */}
      <div className="absolute inset-0 bg-forest/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
        <button
          type="button"
          {...attributes}
          {...listeners}
          className="p-3 text-gold hover:text-white cursor-grab active:cursor-grabbing hover:bg-forest transition-colors rounded-sm"
        >
          <GripVertical size={24} />
        </button>
      </div>

      {/* Delete Button */}
      <button
        type="button"
        onClick={() => onDelete(img.id)}
        className="absolute top-2 right-2 p-2 bg-red-900/90 hover:bg-red-700 text-cream transition-colors z-20 border border-gold/50"
      >
        <Trash2 size={16} />
      </button>

      {/* Badge for New Images */}
      {img.file && (
        <span className="absolute top-2 left-2 px-2 py-1 bg-gold text-forest text-[10px] font-bold uppercase tracking-widest border border-forest">
          New
        </span>
      )}
    </div>
  );
};

// --- Main Form Component ---
export default function EditBuildingForm({ initialData }) {
  const router = useRouter();
  // Form State
  
  // Image State (Sort by initial order)
  const [images, setImages] = useState(
    [...(initialData.images || [])]
      .sort((a, b) => (a.order || 0) - (b.order || 0))
      .map(img => ({ ...img }))
  );
  const [formData, setFormData] = useState({
    title: initialData.title || "",
    description: initialData.description || "",
    price: initialData.price || "",
    address: initialData.address || "",
    city: initialData.city || "",
    state: initialData.state || "",
    type: initialData.type || "house",
    isActive: initialData.isActive ?? true,
    bedrooms: initialData.bedrooms || "",
    bathrooms: initialData.bathrooms || "",
    area: initialData.area || "",
    imagesFiles:images
  });
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  // DnD Sensors
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  // Handlers
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setImages((items) => {
        const oldIndex = items.findIndex((i) => i.id === active.id);
        const newIndex = items.findIndex((i) => i.id === over.id);
        const newItems = arrayMove(items, oldIndex, newIndex);
        return newItems.map((item, index) => ({ ...item, order: index }));
      });
    }
  };

  const handleFileUpload = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files);
      const newImages = files.map((file, index) => {
        const tempId = `tmp_${crypto.randomUUID()}`;
        return {
          id: tempId,
          tempId: tempId,
          url: URL.createObjectURL(file), // Preview URL
          file: file,
          order: images.length + index,
        };
      });
      setImages((prev) => [...prev, ...newImages]);
    }
    e.target.value = '';
  };

  const handleDeleteImage = useCallback((idToDelete) => {
    setImages((prev) => {
      const img = prev.find((i) => i.id === idToDelete);
      if (img?.file) URL.revokeObjectURL(img.url);
      
      const filtered = prev.filter((i) => i.id !== idToDelete);
      return filtered.map((item, idx) => ({ ...item, order: idx }));
    });
  }, []);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? e.target.checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    
    try {
      const fd = new FormData();
      // Append basic fields
      Object.keys(formData).forEach(key => {
        if (key !== 'imagesFiles') {
          fd.append(key, formData[key]);
        }
      });

      // Append Image Metadata and Files
      const metadata = images.map(img => ({
        id: img.id,
        tempId: img.tempId,
        order: img.order
      }));
      fd.append("imagesFiles", JSON.stringify(metadata));

      // Append new files separately
      images.forEach(img => {
        if (img.file) {
          fd.append(`file_${img.tempId}`, img.file);
        }
      });

      const res = await fetch("/api/dashboard/buildings/" + initialData._id, {
        method: "PUT",
        body: fd
        // Note: browser sets Content-Type with boundary for FormData
      });
      
      const data = await res.json();
      if (data.success) {
        setMessage({ type: "success", text: "Building updated successfully" });
        setTimeout(() => router.push("/dashboard/buildings"), 1500);
      } else {
        setMessage({ type: "error", text: data.message });
      }
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: "A critical failure occurred during ratification." });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="w-full min-h-full bg-cream text-forest p-6 lg:p-12 font-sans selection:bg-gold/30 selection:text-forest">
      <div className="max-w-5xl mx-auto space-y-12">
        <header className="space-y-4 border-b border-gold pb-8">
          <h1 className="text-4xl md:text-5xl font-serif text-forest tracking-tight">
            Edit <span className="italic text-gold">Brief</span>
          </h1>
          <p className="text-forest/70 text-sm uppercase tracking-[0.2em]">Asset Management & Curation</p>
        </header>

        {message.text && (
          <div className={`p-4 border ${message.type === 'success' ? 'border-forest bg-forest/5 text-forest' : 'border-red-900 bg-red-900/5 text-red-900'} uppercase tracking-widest text-[10px] font-bold`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-16">
          {/* Classic Structured Form */}
          <div className="space-y-8">
            <h2 className="text-2xl font-serif text-gold">1. Property Particulars</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase tracking-widest text-forest/70 font-bold">Title</label>
                <input required name="title" value={formData.title} onChange={handleChange} className="w-full bg-transparent border border-forest/20 p-4 text-forest focus:border-gold outline-none transition-colors rounded-none placeholder:text-forest/30" placeholder="e.g. The Glass Pavilion" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase tracking-widest text-forest/70 font-bold">Price (USD)</label>
                <input required type="number" name="price" value={formData.price} onChange={handleChange} className="w-full bg-transparent border border-forest/20 p-4 text-forest focus:border-gold outline-none transition-colors rounded-none placeholder:text-forest/30" />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] uppercase tracking-widest text-forest/70 font-bold">Architectural Description</label>
              <textarea required rows={5} name="description" value={formData.description} onChange={handleChange} className="w-full bg-transparent border border-forest/20 p-4 text-forest focus:border-gold outline-none transition-colors rounded-none placeholder:text-forest/30 resize-none leading-relaxed" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase tracking-widest text-forest/70 font-bold">Address</label>
                <input required name="address" value={formData.address} onChange={handleChange} className="w-full bg-transparent border border-forest/20 p-4 text-forest focus:border-gold outline-none transition-colors rounded-none" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase tracking-widest text-forest/70 font-bold">City</label>
                <input required name="city" value={formData.city} onChange={handleChange} className="w-full bg-transparent border border-forest/20 p-4 text-forest focus:border-gold outline-none transition-colors rounded-none" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase tracking-widest text-forest/70 font-bold">State</label>
                <input required name="state" value={formData.state} onChange={handleChange} className="w-full bg-transparent border border-forest/20 p-4 text-forest focus:border-gold outline-none transition-colors rounded-none" />
              </div>
            </div>

            {/* Conditional Specification Row */}
            {formData.type !== "land" && formData.type !== "office" && formData.type !== "shop" ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase tracking-widest text-forest/70 font-bold">Bedrooms</label>
                  <input required type="number" name="bedrooms" value={formData.bedrooms} onChange={handleChange} className="w-full bg-transparent border border-forest/20 p-4 text-forest focus:border-gold outline-none transition-colors rounded-none" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase tracking-widest text-forest/70 font-bold">Bathrooms</label>
                  <input required type="number" step="0.5" name="bathrooms" value={formData.bathrooms} onChange={handleChange} className="w-full bg-transparent border border-forest/20 p-4 text-forest focus:border-gold outline-none transition-colors rounded-none" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase tracking-widest text-forest/70 font-bold">Area (SQ.FT)</label>
                  <input required type="number" name="area" value={formData.area} onChange={handleChange} className="w-full bg-transparent border border-forest/20 p-4 text-forest focus:border-gold outline-none transition-colors rounded-none" />
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-1 pt-4">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase tracking-widest text-forest/70 font-bold">Total Area (SQ.FT)</label>
                  <input required type="number" name="area" value={formData.area} onChange={handleChange} className="w-full bg-transparent border border-forest/20 p-4 text-forest focus:border-gold outline-none transition-colors rounded-none" />
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
              <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase tracking-widest text-forest/70 font-bold">Classification</label>
                <div className="relative">
                  <select name="type" value={formData.type} onChange={handleChange} className="w-full bg-transparent border border-forest/20 p-4 text-forest focus:border-gold outline-none transition-colors rounded-none appearance-none">
                    <option value="house">House</option>
                    <option value="apartment">Apartment</option>
                    <option value="office">Office</option>
                    <option value="shop">Shop</option>
                    <option value="land">Land</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gold">▼</div>
                </div>
              </div>
              <div className="flex items-center gap-4 h-full pt-6">
                <input type="checkbox" id="isActive" name="isActive" checked={formData.isActive} onChange={handleChange} className="w-6 h-6 accent-forest rounded-none border border-forest/20 bg-transparent cursor-pointer" />
                <label htmlFor="isActive" className="text-sm font-serif text-forest select-none cursor-pointer">Maintain public listing active</label>
              </div>
            </div>
          </div>

          <hr className="border-forest/10" />

          {/* Visual Gallery Management */}
          <div className="space-y-8">
            <div className="flex justify-between items-end">
              <h2 className="text-2xl font-serif text-gold">2. Visual Documentation</h2>
              <span className="text-[10px] text-forest/50 font-bold uppercase tracking-[0.2em]">{images.length} Media Objects</span>
            </div>

            <div className="p-8 border border-forest/20 bg-forest/[0.02]">
              <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext items={images.map(i => i.id)} strategy={rectSortingStrategy}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {images.map((img) => (
                      <SortableImageCard key={img.id} img={img} onDelete={handleDeleteImage} />
                    ))}
                    
                    {/* Dark Styled Dropzone */}
                    <label className="relative flex flex-col items-center justify-center p-8 border border-dashed border-gold/50 hover:border-gold aspect-video cursor-pointer bg-forest text-cream transition-all group overflow-hidden">
                      <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <UploadCloud size={32} className="mb-4 text-gold group-hover:scale-110 transition-transform duration-500" />
                      <span className="text-[10px] uppercase tracking-[0.2em] font-bold z-10 text-center">Append Media</span>
                      <input type="file" multiple accept="image/*" onChange={handleFileUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                    </label>
                  </div>
                </SortableContext>
              </DndContext>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex justify-between items-center pt-8 border-t border-forest/10">
            <p className="text-xs font-serif italic text-forest/50">All changes are recorded immutably.</p>
            <button
              type="submit"
              disabled={isSaving}
              className="px-10 py-5 bg-forest text-gold font-bold uppercase tracking-[0.2em] text-[10px] hover:bg-forest-dark transition-all flex items-center gap-4 disabled:opacity-50 border border-gold"
            >
              {isSaving ? <Loader2 size={16} className="animate-spin text-gold" /> : <Save size={16} />}
              {isSaving ? "Executing Protocol" : "Ratify Amendments"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
