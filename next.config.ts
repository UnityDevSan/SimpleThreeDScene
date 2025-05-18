import type { NextConfig } from 'next'; // Typisierung für Next.js Config

// import { version } from './package.json'; // Hole die aktuelle Projektversion

// Next.js Konfiguration
const nextConfig: NextConfig = {
  // output: 'standalone', // Erzeuge ein eigenständiges Build (z.B. für Docker) //TODO: fix
  env: {
    // version, // Projektversion als Umgebungsvariable verfügbar machen
  },
  eslint: {
    ignoreDuringBuilds: true, // Ignoriere ESLint-Fehler beim Build (Build schlägt nicht wegen Lint-Fehlern fehl)
  },
  typescript: { ignoreBuildErrors: true }, // Ignoriere TypeScript-Fehler beim Build (Build schlägt nicht wegen TS-Fehlern fehl)
};

export default nextConfig; // Exportiere die Konfiguration für Next.js