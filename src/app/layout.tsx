'use client';

import '@/app/globals.css';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/ui/app-sidebar';
import { DarkModeSwitch } from '@/components/ui/DarkModeSwitch';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de" className="">
      <body className="h-full overflow-hidden">
        {/* Header */}
        <header className="w-full h-16  flex items-center px-8 shadow-lg z-10">
          <h1 className="text-2xl font-bold flex-1">Mein Projekt</h1>
          <DarkModeSwitch />
            <Button variant="outline" className="ml-4" title="In Arbeit">
            Login
            </Button>
        </header>
        <Separator />
        {/* Layout Grid */}
        <SidebarProvider>
          <div className="flex flex-1 min-h-[calc(100vh-4rem)]">
            {/* Sidebar */}
            <AppSidebar />
            {/* Main Content */}
            <main className="flex-1 flex items-center justify-center h-full p-8">
              {children}
            </main>{' '}
            {/* Right Panel */}
            <aside className="w-64 p-6 border-l border-gray-700 hidden lg:block">
              <div className="text-gray-400">Right Panel</div>
            </aside>
          </div>
        </SidebarProvider>
        <Separator />
        {/* Footer TODO: Footer is hidden because overflow-hidden*/}
        <footer className="w-full h-14  flex items-center justify-center text-gray-400">
          © {new Date().getFullYear()} Mein Projekt
        </footer>
      </body>
    </html>
  );
}
