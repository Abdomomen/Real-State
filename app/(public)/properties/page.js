import getUser from "@/app/lib/getUser";
import { redirect } from "next/navigation";
import { categoriesServices } from "@/app/services/categoriesServices";
import Link from "next/link";
import { motion } from "framer-motion";

export default async function Properties() {
  const user = await getUser();
  if(!user){
    return redirect("/login");
  }
  const categories = [
    { _id: '1', name: 'apartment', displayName: 'Apartments', description: 'Modern living spaces in the heart of the city.', image: 'https://res.cloudinary.com/doq3eivyt/image/upload/v1780529746/vivid-estates/apartment_category.jpg' },
    { _id: '2', name: 'house', displayName: 'Houses & Villas', description: 'Spacious properties with private amenities.', image: 'https://res.cloudinary.com/doq3eivyt/image/upload/v1780529748/vivid-estates/house_category.jpg' },
    { _id: '3', name: 'office', displayName: 'Private Offices', description: 'Premium corporate spaces for your business.', image: 'https://res.cloudinary.com/doq3eivyt/image/upload/v1780529749/vivid-estates/office_category.jpg' },
    { _id: '4', name: 'shop', displayName: 'Retail Spaces', description: 'Prime commercial properties for retail.', image: 'https://res.cloudinary.com/doq3eivyt/image/upload/v1780529751/vivid-estates/shop_category.jpg' },
    { _id: '5', name: 'land', displayName: 'Exclusive Lands', description: 'Build your dream on our exclusive plots.', image: 'https://res.cloudinary.com/doq3eivyt/image/upload/v1780529752/vivid-estates/land_category.jpg' }
  ];
  
  return (
    <main className="min-h-screen pt-20 pb-20">
      {/* Hero Section */}
      <section className="px-8 py-20 text-center bg-forest text-cream mb-16">
        <h1 className="text-5xl md:text-7xl font-serif mb-6 italic">Exquisite Collections</h1>
        <p className="max-w-2xl mx-auto text-lg opacity-80 font-sans tracking-wide">
          Explore our curated selections of the world's most prestigious properties, 
          categorized to match your architectural preferences and lifestyle.
        </p>
      </section>

      <div className="container mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {categories.map((category, index) => (
            <Link 
              key={category._id} 
              href={`/properties/${category.name}`}
              className="group block relative overflow-hidden luxury-border aspect-[4/5]"
            >
              <img 
                src={category.image} 
                alt={category.name} 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest/90 via-forest/20 to-transparent" />
              
              <div className="absolute bottom-0 left-0 p-8 w-full translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <h2 className="text-3xl font-serif text-cream mb-2 italic">
                  {category.displayName}
                </h2>
                <div className="h-0.5 w-12 bg-gold mb-4 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
                <p className="text-cream/70 text-sm line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                  {category.description}
                </p>
                <span className="inline-block mt-4 text-gold text-xs uppercase tracking-[0.3em] font-bold">
                  Explore Selection
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}

