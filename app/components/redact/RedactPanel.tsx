// app/components/redact/RedactPanel.tsx
'use client';

import { RefObject } from 'react';

interface RedactPanelProps {
  fileInputRef: RefObject<HTMLInputElement | null>;
  imageLoaded: boolean;
  fileName: string;
  setFileName: (name: string) => void;
  boxCount: number;
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onUndo: () => void;
  onClearAll: () => void;
  onDownload: () => void;
}

export default function RedactPanel({
  fileInputRef,
  imageLoaded,
  fileName,
  setFileName,
  boxCount,
  onImageUpload,
  onUndo,
  onClearAll,
  onDownload,
}: RedactPanelProps) {
  return (
    <div className="w-full lg:w-72 shrink-0 bg-white border border-gray-100 p-5 rounded-xl shadow-xs flex flex-col gap-5 lg:sticky lg:top-24">
      <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Configuration</span>

      <input
        type="file"
        ref={fileInputRef}
        accept=".png, .jpg, .jpeg"
        className="hidden"
        onChange={onImageUpload}
      />

      <button
        onClick={() => fileInputRef.current?.click()}
        className="w-full px-4 py-2.5 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition font-medium text-sm cursor-pointer text-center"
      >
        {imageLoaded ? 'Change Image' : 'Upload Image'}
      </button>

      {imageLoaded && (
        <div className="flex flex-col gap-4 border-t border-gray-50 pt-4">
          <label className="text-xs font-semibold text-gray-500 flex flex-col gap-1">
            Export Filename:
            <input
              type="text"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              className="w-full border border-gray-200 rounded-md px-2.5 py-1.5 font-medium text-gray-700 text-xs focus:outline-none focus:border-gray-400"
            />
          </label>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={onUndo}
              disabled={boxCount === 0}
              className="px-3 py-2 bg-gray-50 text-gray-600 border border-gray-100 rounded-md text-xs font-semibold hover:bg-gray-100 disabled:opacity-40 transition cursor-pointer"
            >
              Undo ({boxCount})
            </button>
            <button
              onClick={onClearAll}
              disabled={boxCount === 0}
              className="px-3 py-2 bg-red-50 text-red-600 rounded-md text-xs font-semibold hover:bg-red-100 disabled:opacity-40 transition cursor-pointer"
            >
              Clear All
            </button>
          </div>

          <hr className="border-gray-100 my-1" />

          <button
            onClick={onDownload}
            className="w-full py-2.5 text-white rounded-lg transition font-semibold text-sm cursor-pointer shadow-xs hover:opacity-90 text-center"
            style={{ backgroundColor: '#E7B339' }}
          >
            Download Redacted JPG
          </button>
        </div>
      )}
    </div>
  );
}