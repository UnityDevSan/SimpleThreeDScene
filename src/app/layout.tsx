"use client";

import "@/styles/globals.css";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <body className="bg-gradient-to-br from-gray-800 to-gray-900 text-white min-h-screen">
        {/* Header */}
        <header className="w-full h-16 bg-gray-900 flex items-center px-8 shadow-lg z-10">
          <h1 className="text-2xl font-bold flex-1">Mein Projekt</h1>
          <Button variant="outline" className="ml-4">Login</Button>
        </header>
        <Separator />
        {/* Layout Grid */}
        <div className="flex flex-1 min-h-[calc(100vh-4rem)]">
          {/* Left Panel */}
          <aside className="w-64 bg-gray-800 p-6 border-r border-gray-700 hidden md:block">
            <nav>
              <ul className="space-y-4">
                <li>
                  <Button asChild variant="ghost" className="w-full justify-start">
                    <a href="/3dScene">3D Scene</a>
                  </Button>
                </li>
                {/* Weitere Links */}
              </ul>
            </nav>
          </aside>
          {/* Main Content */}
          <main className="flex-1 p-8">{children}</main>
          {/* Right Panel */}
          <aside className="w-64 bg-gray-800 p-6 border-l border-gray-700 hidden lg:block">
            <div className="text-gray-400">Right Panel</div>
          </aside>
        </div>
        <Separator />
        {/* Footer */}
        <footer className="w-full h-14 bg-gray-900 flex items-center justify-center text-gray-400">
          © {new Date().getFullYear()} Mein Projekt
        </footer>
      </body>
    </html>
  );
}