// app/redact/page.tsx
'use client';

import { useRef, useState, useEffect } from 'react';
import Navbar from '../components/global/Navbar';
import Sidebar from '../components/global/Sidebar';
import RedactCanvas from '../components/redact/RedactCanvas';
import RedactPanel from '../components/redact/RedactPanel';

interface RedactBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

export default function RedactPage() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [boxes, setBoxes] = useState<RedactBox[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [currentBox, setCurrentBox] = useState<RedactBox | null>(null);
  const [fileName, setFileName] = useState('redacted-document');

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    const file = e.target.files[0];
    setFileName(file.name.replace(/\.[^/.]+$/, "") + "-redacted");
    
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        setImage(img);
        setBoxes([]);
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !image) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = image.width;
    canvas.height = image.height;

    ctx.drawImage(image, 0, 0);

    ctx.fillStyle = '#111827';
    boxes.forEach((box) => {
      ctx.fillRect(box.x, box.y, box.width, box.height);
    });

    if (currentBox) {
      ctx.fillStyle = 'rgba(17, 24, 39, 0.75)';
      ctx.strokeStyle = '#E7B339';
      ctx.lineWidth = Math.max(2, image.width / 500);
      ctx.fillRect(currentBox.x, currentBox.y, currentBox.width, currentBox.height);
      ctx.strokeRect(currentBox.x, currentBox.y, currentBox.width, currentBox.height);
    }
  }, [image, boxes, currentBox]);

  const getCanvasCoords = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!image) return;
    const coords = getCanvasCoords(e);
    setIsDrawing(true);
    setStartPos(coords);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !image) return;
    const coords = getCanvasCoords(e);

    const x = Math.min(startPos.x, coords.x);
    const y = Math.min(startPos.y, coords.y);
    const width = Math.abs(startPos.x - coords.x);
    const height = Math.abs(startPos.y - coords.y);

    setCurrentBox({ x, y, width, height });
  };

  const handleMouseUp = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    if (currentBox && currentBox.width > 5 && currentBox.height > 5) {
      setBoxes((prev) => [...prev, currentBox]);
    }
    setCurrentBox(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900">
      <Navbar />

      <div className="flex flex-1">
        <Sidebar />

        <main className="flex-1 bg-gray-50/50 p-4 sm:p-8 flex flex-col lg:flex-row items-start gap-6 lg:gap-8 max-w-7xl mx-auto w-full">
          <RedactCanvas
            canvasRef={canvasRef}
            imageLoaded={!!image}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onTriggerUpload={() => fileInputRef.current?.click()}
          />

          <RedactPanel
            fileInputRef={fileInputRef}
            imageLoaded={!!image}
            fileName={fileName}
            setFileName={setFileName}
            boxCount={boxes.length}
            onImageUpload={handleImageUpload}
            onUndo={() => setBoxes((prev) => prev.slice(0, -1))}
            onClearAll={() => setBoxes([])}
            onDownload={() => {
              const canvas = canvasRef.current;
              if (!canvas || !image) return;
              const dataUrl = canvas.toDataURL('image/jpeg', 0.90);
              const link = document.createElement('a');
              link.download = `${fileName || 'redacted-image'}.jpg`;
              link.href = dataUrl;
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }}
          />
        </main>
      </div>
    </div>
  );
}