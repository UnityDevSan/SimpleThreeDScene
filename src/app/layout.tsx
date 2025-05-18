'use client';

import '@/app/globals.css';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/ui/app-sidebar';
import { DarkModeSwitch } from '@/components/ui/DarkModeSwitch';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { AppProviders } from './AppProviders';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de" className="">
      <body className="h-full overflow-hidden">
        {/* Header */}
        <Header />
        <Separator />
        {/* Layout Grid */}
        <AppProviders>
          <div className="flex flex-1 min-h-[calc(100vh-4rem)]">
            {/* Sidebar */}
            <AppSidebar />
            {/* Main Content */}
            <main className="flex-1 flex items-center justify-center h-full p-8">
              {children}
            </main>
            {/* Right Panel */}
            <aside className="w-64 p-6 border-l border-gray-700 hidden lg:block">
              <div className="text-gray-400">Right Panel</div>
            </aside>
          </div>
        </AppProviders>
        <Separator />
        <Footer />
      </body>
    </html>
  );
}
