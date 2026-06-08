// app/components/photo-collage/PhotoCard.tsx
'use client';

interface PhotoItem {
  id: string;
  src: string;
  caption: string;
}

interface PhotoCardProps {
  photo: PhotoItem;
  onUpdateCaption: (id: string, text: string) => void;
  onDelete: () => void; // New handler
}

export default function PhotoCard({ photo, onUpdateCaption, onDelete }: PhotoCardProps) {
  return (
    <div className="flex flex-col items-center p-3 border border-gray-100 rounded-lg bg-white shadow-xs group relative">
      {/* Photo Frame Container Wrapper */}
      <div className="w-full h-48 sm:h-64 relative bg-gray-50 rounded-lg overflow-hidden flex items-center justify-center border border-gray-50">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={photo.src}
          alt="Visa relationship proof asset"
          className="w-full h-full object-contain select-none"
        />

        {/* Floating Delete Button Context Overlay */}
        <button
          type="button"
          onClick={onDelete}
          className="absolute top-2 right-2 p-2 bg-white/90 hover:bg-red-50 text-gray-500 hover:text-red-600 rounded-full shadow-xs border border-gray-100 transition-all duration-200 opacity-0 group-hover:opacity-100 cursor-pointer focus:opacity-100"
          title="Remove photo"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            strokeWidth={2} 
            stroke="currentColor" 
            className="w-4 h-4"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
          </svg>
        </button>
      </div>
      
      {/* Caption Content Textarea Input Box */}
      <textarea
        value={photo.caption}
        onChange={(e) => onUpdateCaption(photo.id, e.target.value)}
        rows={2}
        className="w-full mt-3 text-xs sm:text-sm text-center text-gray-700 resize-none border border-transparent hover:border-gray-200 focus:border-gray-400 focus:outline-none p-1.5 rounded transition"
        placeholder="Enter date, location, and context..."
      />
    </div>
  );
}