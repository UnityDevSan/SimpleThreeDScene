'use client';

{/* Footer TODO: Footer is hidden because overflow-hidden*/}
export function Footer() {
  return (
        <footer className="w-full h-14  flex items-center justify-center text-gray-400">
          © {new Date().getFullYear()} Mein Projekt
        </footer>
  );
}