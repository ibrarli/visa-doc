// app/components/photo-collage/DocumentCanvas.tsx
'use client';

import PhotoCard from './PhotoCard';

interface PhotoItem {
  id: string;
  src: string;
  caption: string;
}

interface DocumentCanvasProps {
  title: string;
  setTitle: (title: string) => void;
  photos: PhotoItem[];
  columns: number;
  pageOrientation: 'portrait' | 'landscape';
  onUpdateCaption: (id: string, text: string) => void;
  onDeletePhoto: (id: string) => void; // New delete prop line
}

export default function DocumentCanvas({
  title,
  setTitle,
  photos,
  columns,
  pageOrientation,
  onUpdateCaption,
  onDeletePhoto, // Destructure prop
}: DocumentCanvasProps) {
  const isLandscape = pageOrientation === 'landscape';

  return (
    <div 
      id="visadoc-print-canvas"
      className={`mx-auto bg-white p-6 sm:p-12 border border-gray-100 rounded-xl transition-all duration-300 text-gray-900
        ${isLandscape 
          ? 'max-w-6xl min-h-auto lg:min-h-204' 
          : 'max-w-4xl min-h-auto lg:min-h-264'
        }
      `}
    >
      {/* Dynamic Title Input */}
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full text-xl sm:text-2xl font-heading font-bold border-b border-transparent hover:border-gray-200 focus:border-gray-400 focus:outline-none pb-2 mb-6 sm:mb-8 text-gray-900 transition"
        placeholder="Document Title"
      />

      <div
        className="grid grid-cols-1 gap-6 sm:gap-8"
        style={{
          gridTemplateColumns: `repeat(var(--cols, ${columns}), minmax(0, 1fr))`,
        }}
      >
        <div className="hidden" /> 
        <style jsx global>{`
          @media (max-width: 640px) {
            #visadoc-print-canvas .grid {
              grid-template-columns: repeat(1, minmax(0, 1fr)) !important;
            }
          }
        `}</style>

        {photos.map((photo) => (
          <PhotoCard
            key={photo.id}
            photo={photo}
            onUpdateCaption={onUpdateCaption}
            onDelete={() => onDeletePhoto(photo.id)} // Pass method to card
          />
        ))}
      </div>

      {photos.length === 0 && (
        <div className="text-center py-20 sm:py-32 text-gray-400 border-2 border-dashed border-gray-100 rounded-xl font-medium text-sm">
          No relationship pictures uploaded yet. Use the upload panel to begin assembling your documents.
        </div>
      )}
    </div>
  );
}