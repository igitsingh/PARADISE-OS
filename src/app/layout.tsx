import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Sidebar from '@/components/Sidebar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Paradise OS',
  description: 'Operating System for Paradise Organics',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#050505] text-[#FAFAFA] flex h-screen overflow-hidden relative`}>
        {/* Global Ambient Glow */}
        <div className="fixed inset-0 z-0 pointer-events-none flex justify-center items-center">
          <div className="w-[800px] h-[800px] bg-amber-500/5 rounded-full blur-[150px] absolute top-[-20%] right-[-10%]" />
          <div className="w-[600px] h-[600px] bg-fuchsia-500/5 rounded-full blur-[150px] absolute bottom-[-20%] left-[-10%]" />
        </div>

        <Sidebar />
        <main className="flex-1 overflow-y-auto relative z-10 bg-transparent">
          <div className="mx-auto h-full px-6 py-6 lg:px-8 max-w-[1200px]">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
