import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600"],
});

export const metadata = {
  title: "Vivid Estates | Editorial Real Estate",
  description: "Sophisticated brokerage for the modern collector.",
};

import { ToastProvider } from "./components/ToastProvider";
import { UserStoreProvider } from "./stores/userStore";

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} h-full antialiased selection:bg-luxury-gold/20 selection:text-charcoal`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-eggshell text-charcoal">
        <UserStoreProvider>
          <ToastProvider>{children}</ToastProvider>
        </UserStoreProvider>
      </body>
    </html>
  );
}
