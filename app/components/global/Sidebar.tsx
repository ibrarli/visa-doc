// app/components/global/Sidebar.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface SidebarItem {
  id: string;
  title: string;
  iconSrc: string; 
  link: string;
}

const SIDEBAR_ITEMS: SidebarItem[] = [
  {
    id: 'photos',
    title: 'Photo Collage',
    iconSrc: '/icons/photo-collage.svg',
    link: '/photo-collage',
  },
  {
    id: 'checklists',
    title: 'Visa Checklists',
    iconSrc: '/icons/checklist.svg',
    link: '/visa-checklists',
  },
  {
    id: 'redact',
    title: 'Secure Redactor',
    iconSrc: '/icons/lock.svg',
    link: '/redact',
  }
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden sm:flex w-16 border-r border-gray-100 flex-col items-center gap-4 py-6 bg-white sticky top-16 h-[calc(100vh-4rem)] print:hidden">
      {SIDEBAR_ITEMS.map((item) => {
        const isActive = pathname === item.link;

        return (
          <Link
            key={item.id}
            href={item.link}
            className="p-3 rounded-xl transition-all cursor-pointer group relative flex items-center justify-center"
            style={{
              backgroundColor: isActive ? '#E7B339' : 'transparent',
            }}
          >
            <img
              src={item.iconSrc}
              alt={item.title}
              className="w-6 h-6 select-none transition-opacity duration-200"
              style={{
                filter: isActive 
                  ? 'brightness(0)' 
                  : 'invert(69%) sepia(8%) saturate(271%) hue-rotate(182deg) brightness(89%) contrast(85%)',
              }}
            />

            <div className="absolute left-16 scale-0 group-hover:scale-100 transition-all duration-150 origin-left bg-gray-900 text-white text-xs font-medium px-3 py-1.5 rounded-md shadow-md whitespace-nowrap z-50 pointer-events-none">
              {item.title}
              <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-2 bg-gray-900 rotate-45" />
            </div>
          </Link>
        );
      })}

      {/* Version Tag Indicator at Bottom */}
      <div className="mt-auto text-[10px] font-bold tracking-wider text-gray-400 select-none">
        v0.3
      </div>
    </aside>
  );
}