// app/components/ControlPanel.tsx
'use client';

import { useRef, useEffect } from 'react';

interface ControlPanelProps {
  columns: number;
  setColumns: (cols: number) => void;
  pageOrientation: 'portrait' | 'landscape';
  setPageOrientation: (orientation: 'portrait' | 'landscape') => void;
  documentTitle: string;
  setDocumentTitle: (title: string) => void;
  fileName: string;
  setFileName: (name: string) => void;
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDownloadPDF: () => void;
}

export default function ControlPanel({
  columns,
  setColumns,
  pageOrientation,
  setPageOrientation,
  documentTitle,
  setDocumentTitle,
  fileName,
  setFileName,
  onImageUpload,
  onDownloadPDF,
}: ControlPanelProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isLandscape = pageOrientation === 'landscape';

  useEffect(() => {
    if (!isLandscape && columns > 3) {
      setColumns(3);
    }
  }, [pageOrientation, columns, isLandscape, setColumns]);

  return (
    <div className="w-full p-4 sm:p-6 bg-white rounded-xl border border-gray-100 shadow-xs">
      <div className="flex flex-col gap-5 sm:gap-6">
        
        {/* Document Naming Control */}
        <div className="flex flex-col gap-3">
          <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Document Settings</span>
          
          <label className="text-sm font-medium text-gray-600 flex flex-col gap-1">
            Canvas Heading Title:
            <input
              type="text"
              value={documentTitle}
              onChange={(e) => setDocumentTitle(e.target.value)}
              placeholder="e.g., Evidence of Relationship"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 bg-white text-gray-700 font-medium focus:outline-none focus:border-gray-400 text-sm"
            />
          </label>

          <label className="text-sm font-medium text-gray-600 flex flex-col gap-1">
            Export File Name:
            <div className="relative flex items-center">
              <input
                type="text"
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
                placeholder="e.g., relationship-proof"
                className="w-full border border-gray-200 rounded-lg pl-3 pr-12 py-2 bg-white text-gray-700 font-medium focus:outline-none focus:border-gray-400 text-sm"
              />
              <span className="absolute right-3 text-xs font-semibold text-gray-400 pointer-events-none">
                .pdf
              </span>
            </div>
          </label>
        </div>

        {/* File Actions */}
        <div className="flex flex-col gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Assets</span>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-full px-4 py-2.5 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition font-medium text-sm cursor-pointer text-center"
          >
            Upload Photos
          </button>
          <input
            type="file"
            ref={fileInputRef}
            multiple
            accept=".png, .jpg, .jpeg, image/png, image/jpeg"
            className="hidden"
            onChange={onImageUpload}
          />
        </div>

        {/* Dynamic Context Custom Select Fields Grid density */}
        <div className="flex flex-col gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Grid Density</span>
          <label className="flex flex-col gap-1 text-sm font-medium text-gray-600">
            Columns:
            <select
              value={columns}
              onChange={(e) => setColumns(Number(e.target.value))}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 bg-white text-gray-700 focus:outline-none focus:border-gray-400 text-sm"
            >
              <option value={1}>1 Column</option>
              <option value={2}>2 Columns</option>
              <option value={3}>3 Columns</option>
              {isLandscape && <option value={4}>4 Columns (Landscape Only)</option>}
            </select>
          </label>
        </div>

        {/* Page Layout Format Direction Toggle */}
        <div className="flex flex-col gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Canvas Format</span>
          <div className="flex border border-gray-200 rounded-lg p-0.5 bg-gray-50 w-full">
            <button
              type="button"
              onClick={() => setPageOrientation('portrait')}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer text-center ${
                !isLandscape
                  ? 'bg-white text-gray-900 shadow-xs'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              Portrait
            </button>
            <button
              type="button"
              onClick={() => setPageOrientation('landscape')}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer text-center ${
                isLandscape
                  ? 'bg-white text-gray-900 shadow-xs'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              Landscape
            </button>
          </div>
        </div>

        <hr className="border-gray-100 my-1" />

        <button
          onClick={onDownloadPDF}
          className="w-full py-2.5 text-white rounded-lg transition font-semibold text-sm cursor-pointer shadow-xs hover:opacity-90 text-center"
          style={{ backgroundColor: '#E7B339' }}
        >
          Download PDF Document
        </button>
      </div>
    </div>
  );
}