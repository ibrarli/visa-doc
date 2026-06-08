// app/components/global/Navbar.tsx
'use client';

export default function Navbar() {
  return (
    <header className="h-auto min-h-16 py-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 px-4 sm:px-6 bg-white sticky top-0 z-50 border-b border-gray-100 print:hidden">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
        <span className="font-heading font-bold text-xl tracking-wide text-gray-900">
          VisaDoc
        </span>
        
        {/* Development Attribution (Visible on all viewports) */}
        <div className="flex items-center gap-2  border-none md:border-l border-gray-200 lg:pl-4 text-xs font-medium text-gray-400">
          <span>
            Developed by{' '}
            <a 
              href="https://apenapps.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-gray-600 transition underline decoration-gray-200 underline-offset-2"
            >
              apenapps.com
            </a>
          </span>
          <a 
            href="mailto:ibrar@apenapps.com" 
            className="text-gray-400 hover:text-gray-600 transition p-1 rounded-md hover:bg-gray-50 flex items-center justify-center"
            title="Contact Developer"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth={2} 
              stroke="currentColor" 
              className="w-3.5 h-3.5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
            </svg>
          </a>
        </div>
      </div>
      
      <a
        href="https://buymeacoffee.com/apenapps"
        target="_blank"
        rel="noopener noreferrer"
        className="w-full sm:w-auto flex items-center justify-center gap-2 px-3 py-2 sm:px-4 text-xs font-semibold uppercase tracking-wider text-gray-600 hover:text-gray-900 bg-gray-50 hover:bg-gray-100/80 rounded-lg transition-all duration-200 border border-gray-100 self-stretch sm:self-auto"
      >
        <img 
          src="/icons/coffee.svg" 
          alt="Coffee Support Icon" 
          className="w-4 h-4 select-none"
        />
        <span>Support the cause</span>
      </a>
    </header>
  );
}