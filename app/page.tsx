// app/page.tsx
'use client';

import Link from 'next/link';
import Navbar from './components/global/Navbar';
import Sidebar from './components/global/Sidebar';

const APPLICATION_TOOLS = [
  {
    id: 'photo-collage',
    title: 'Photo Collage Creator',
    description: 'Assemble your relationship and travel images into crisp, print-ready document layouts. Features instant image compression under 5MB ceilings.',
    icon: '📸',
    href: '/photo-collage',
    badge: 'Popular',
  },
  {
    id: 'visa-checklists',
    title: 'Community Checklists',
    description: 'Explore crowd-sourced legal documents and framework requirements verified by success stories for subclasses like the 309 Partner Visa.',
    icon: '📋',
    href: '/visa-checklists',
    badge: 'New',
  },
  {
  id: 'redact',
  title: 'Document Redactor Stream',
  description: 'Sanitize private data points. Draw custom blackout bounds directly onto sensitive bank lines or records natively in your client browser context.',
  icon: '🛡️',
  href: '/redact',
  badge: 'New',
}
];

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900">
      <Navbar />

      <div className="flex flex-1">
        <Sidebar />

        {/* FEATURE SELECTION LANDING WORKSPACE */}
        <main className="flex-1 bg-gray-50/50 p-6 sm:p-12 flex flex-col justify-center items-center max-w-5xl mx-auto w-full">
          
          {/* Header Block Section */}
          <div className="text-center max-w-xl mx-auto mb-10 sm:mb-12 flex flex-col gap-2">
            <h1 className="text-3xl sm:text-4xl font-heading font-bold tracking-tight text-gray-900">
              Simplify Your Immigration Evidence
            </h1>
            <p className="text-sm sm:text-base text-gray-500 font-medium">
              Free, automated, and community-driven utilities engineered to help format, compress, and check your documentation packages.
            </p>
          </div>

          {/* Core Interactive Selection Block Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            {APPLICATION_TOOLS.map((tool) => (
              <div
                key={tool.id}
                className="group relative bg-white border border-gray-100 rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:border-gray-200 hover:shadow-md"
              >
                {/* Upper Card Info Context */}
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition duration-200 select-none">
                      {tool.icon}
                    </div>
                    
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md
                      ${tool.badge === 'New' ? 'bg-blue-50 text-blue-600' : 'bg-amber-50 text-amber-600'}
                    `}>
                      {tool.badge}
                    </span>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <h2 className="text-lg sm:text-xl font-bold text-gray-900 group-hover:text-amber-500 transition-colors">
                      {tool.title}
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-400 font-medium leading-relaxed">
                      {tool.description}
                    </p>
                  </div>
                </div>

                {/* Navigation Button Action Trigger */}
                <Link
                  href={tool.href}
                  className="mt-6 w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-900 group-hover:bg-gray-800 text-white rounded-xl transition font-semibold text-xs sm:text-sm cursor-pointer"
                >
                  <span>Open Tool Workspace</span>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    strokeWidth={2.5} 
                    stroke="currentColor" 
                    className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
              </div>
            ))}
          </div>

        </main>
      </div>
    </div>
  );
}