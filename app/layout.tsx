import "app/styles/globals.css";
import { Inter } from "next/font/google";
import Navbar from "components/Navbar";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata = {
  title: "Aurova",
  description: "Personalized habit + mood tracker.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans bg-[var(--color-background)] text-[var(--color-foreground)]">
        <Navbar />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
