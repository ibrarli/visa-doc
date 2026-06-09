// app/components/redact/RedactCanvas.tsx
'use client';

import { RefObject } from 'react';

interface RedactCanvasProps {
  canvasRef: RefObject<HTMLCanvasElement | null>;
  imageLoaded: boolean;
  onMouseDown: (e: React.MouseEvent<HTMLCanvasElement>) => void;
  onMouseMove: (e: React.MouseEvent<HTMLCanvasElement>) => void;
  onMouseUp: () => void;
  onTriggerUpload: () => void;
}

export default function RedactCanvas({
  canvasRef,
  imageLoaded,
  onMouseDown,
  onMouseMove,
  onMouseUp,
  onTriggerUpload,
}: RedactCanvasProps) {
  return (
    <div className="flex-1 w-full flex flex-col gap-4 min-w-0">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-heading font-bold text-gray-900 tracking-tight">
          Secure Document Redactor
        </h1>
        <p className="text-xs text-gray-400">
          {imageLoaded
            ? 'Click and drag directly over the image workspace below to permanently mask sensitive info.'
            : 'Upload an asset to begin hiding financial accounts, signatures, or private text fields.'}
        </p>
      </div>

      {imageLoaded ? (
        /* The container isolates scroll behaviors */
        <div className="w-full bg-white p-4 border border-gray-100 rounded-xl shadow-xs flex justify-center items-center overflow-auto max-h-[70vh]">
          <canvas
            ref={canvasRef}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseUp}
            /* h-auto + max-w-full lets the native aspect ratio map perfectly without stretching */
            className="max-w-full h-auto cursor-crosshair border border-gray-200 shadow-inner rounded-md block object-contain"
          />
        </div>
      ) : (
        <div
          onClick={onTriggerUpload}
          className="w-full py-40 bg-white border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center gap-3 cursor-pointer hover:border-gray-400 transition"
        >
          <span className="text-sm font-semibold text-gray-500">Click to Select Document Image</span>
          <span className="text-xs text-gray-400">Supports PNG, JPG, JPEG</span>
        </div>
      )}
    </div>
  );
}