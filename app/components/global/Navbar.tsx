// app/components/global/Navbar.tsx
'use client';

export default function Navbar() {
  return (
    <header className="h-16 flex items-center justify-between px-4 sm:px-6 bg-white sticky top-0 z-50 border-b border-gray-100 print:hidden">
      <span className="font-heading font-bold text-xl tracking-wide text-gray-900">
        VisaDoc
      </span>
      
      <a
        href="https://buymeacoffee.com/apenapps"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 px-3 py-2 sm:px-4 text-xs font-semibold uppercase tracking-wider text-gray-600 hover:text-gray-900 bg-gray-50 hover:bg-gray-100/80 rounded-lg transition-all duration-200 border border-gray-100"
      >
        <img 
          src="/icons/coffee.svg" 
          alt="Coffee Support Icon" 
          className="w-4 h-4 select-none"
        />
        <span className="hidden sm:inline">Support the cause</span>
      </a>
    </header>
  );
}