# Vivid Estates | Editorial Real Estate Platform

![Vivid Estates Banner](https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=1200)

**Vivid Estates** is a sophisticated, editorial-style real estate platform designed for the modern collector of architectural masterpieces. Moving away from generic property listings, this platform offers a curated experience inspired by high-end heritage and classic luxury aesthetics.

---

## ✨ Features

### 🏛️ Immersive Luxury Design
- **Classic Heritage Aesthetic**: A curated color palette of Deep Forest Green, Antique Brass (Gold), and Soft Cream.
- **Micro-interactions**: Smooth transitions and animations powered by Framer Motion for a premium editorial feel.
- **Typography-first Layout**: High-end serif and sans-serif pairings (Playfair Display & Inter) for maximum readability.

### 🔐 Secure Infrastructure
- **JWT Authentication**: Secure user login and registration using JSON Web Tokens.
- **HTTP-Only Cookies**: Enhanced security against XSS attacks by storing tokens in secure, server-side cookies.
- **Zustand Context System**: Advanced state management for Wishlists and User sessions with 100% Next.js Hydration safety.

### 🛠️ Administrative Excellence
- **Full Asset Dashboard**: A specialized interface for administrators to curate the collection.
- **Image Smart-Diffing**: Advanced logic for managing high-resolution property visual portfolios.
- **Interaction Monitoring**: Real-time management of collector feedback (Comments) and interests (Likes).

### 🏠 Collector Experience
- **Singular Collection Search**: Advanced filtering by category, price, and architectural specifications.
- **Personal Wishlist**: Collectors can save estates to their private authenticated collection.
- **Engagement Loop**: Interactive liking system and verified collector feedback on properties.

---

## 🚀 Tech Stack

- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **State Management**: [Zustand](https://zustand.js.org/) (+ React Context for Hydration)
- **Database**: [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/)
- **Visuals Handling**: [Cloudinary](https://cloudinary.com/) (Integrated API)
- **Styling**: Vanilla CSS & TailwindCSS (Custom configuration)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)

---

## 🛠️ Getting Started

### Prerequisites

- Node.js 18.0 or higher
- MongoDB Atlas account or local installation
- Cloudinary account for media assets

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Abdomomen/Real-State.git
   cd real-state
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env.local` file in the root directory and add:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   CLOUDINARY_CLOUD_NAME=your_name
   CLOUDINARY_API_KEY=your_key
   CLOUDINARY_API_SECRET=your_secret
   ```

4. **Launch the platform:**
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) to view the collection.

---

## 📝 License

Designed and developed by the Vivid Estates Architectural Custodians. This project is for editorial and brokerage demonstration purposes.
