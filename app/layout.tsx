import "./styles/globals.css";
import { Inter } from "next/font/google";
import Navbar from "components/Navbar";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata = {
  title: "Aurova",
  description: "Personalized habit + mood tracker.",
  icons: { icon: '/icon.svg' }, 
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans">
        <Navbar />
        {children}
        <Toaster />

        <footer className="text-center text-xs text-[var(--color-muted)] py-6">
  Aurova • © {new Date().getFullYear()}
</footer>

      </body>
    </html>
  );
}
