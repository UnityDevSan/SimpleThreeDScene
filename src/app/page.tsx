"use client";

import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-800 to-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-4">Willkommen zu deinem Projekt!</h1>
      <p className="mb-8 text-lg text-gray-300">
        Wähle eine Komponente aus, um fortzufahren:
      </p>
      <nav>
        <ul className="space-y-4">
          <li>
            <Link
              href="/3dScene"
              className="px-6 py-3 rounded bg-lime-500 hover:bg-lime-400 text-gray-900 font-semibold transition"
            >
              3D Scene
            </Link>
          </li>
          {/* Weitere Komponenten-Links hier */}
        </ul>
      </nav>
    </main>
  );
}