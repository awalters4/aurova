// app/layout.tsx
import '@/styles/globals.css';
import { Outfit } from 'next/font/google';

const outfit = Outfit({ subsets: ['latin'] });

export const metadata = {
  title: 'Aurova',
  description: 'Personalized habit + mood tracker that adapts to you.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    
    <html lang="en">
      <body className={`${outfit.className} bg-gray-50 min-h-screen`}>
        {children}
      </body>
    </html>
  );
}
