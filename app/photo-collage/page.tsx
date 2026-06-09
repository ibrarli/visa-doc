// app/photo-collage/page.tsx
"use client";

import { useState } from "react";
import Navbar from "../components/global/Navbar";
import Sidebar from "../components/global/Sidebar";
import ControlPanel from "../components/photo-collage/ControlPanel";
import DocumentCanvas from "../components/photo-collage/DocumentCanvas";
import VisaDocPDF from "../components/photo-collage/VisaDocPDF";

interface PhotoItem {
  id: string;
  src: string;
  caption: string;
}

export default function Home() {
  const [photos, setPhotos] = useState<PhotoItem[]>([]);
  const [title, setTitle] = useState(
    "Evidence of Relationship - Photo Library",
  );
  const [columns, setColumns] = useState(2);
  const [pageOrientation, setPageOrientation] = useState<
    "portrait" | "landscape"
  >("portrait");
  const [isGenerating, setIsGenerating] = useState(false);
  const [fileName, setFileName] = useState("evidence-of-relationship");

  // Inside app/page.tsx
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const filesArray = Array.from(e.target.files);

    // 1. Filter out invalid file formats
    const validFiles = filesArray.filter((file) =>
      /\.(jpe?g|png)$/i.test(file.name),
    );

    if (validFiles.length === 0) return;

    // 2. Process and conditionally compress files asynchronously
    const processedPhotos = await Promise.all(
      validFiles.map(async (file, index) => {
        // Threshold: If the image is under 1MB, don't touch it to preserve pristine original pixels
        if (file.size <= 1024 * 1024) {
          return {
            id: `${Date.now()}-${index}-${Math.random().toString(36).substr(2, 4)}`,
            src: URL.createObjectURL(file),
            caption: "Add context, date, location, or attendee details here...",
          };
        }

        // If image is high-res (> 1MB), scale it using an offscreen canvas down to a max resolution boundary
        return new Promise<PhotoItem>((resolve) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = (event) => {
            const img = new Image();
            img.src = event.target?.result as string;
            img.onload = () => {
              const canvas = document.createElement("canvas");
              let width = img.width;
              let height = img.height;

              // Cap the maximum width or height to 1600px (Excellent crisp quality for A4 printing)
              const MAX_WIDTH_HEIGHT = 1600;
              if (width > MAX_WIDTH_HEIGHT || height > MAX_WIDTH_HEIGHT) {
                if (width > height) {
                  height = Math.round((height * MAX_WIDTH_HEIGHT) / width);
                  width = MAX_WIDTH_HEIGHT;
                } else {
                  width = Math.round((width * MAX_WIDTH_HEIGHT) / height);
                  height = MAX_WIDTH_HEIGHT;
                }
              }

              canvas.width = width;
              canvas.height = height;

              const ctx = canvas.getContext("2d");
              if (ctx) {
                // Draw the image onto the smaller canvas constraint boundaries
                ctx.drawImage(img, 0, 0, width, height);

                // Export to blob as a highly-efficient JPEG at 82% target compression quality
                canvas.toBlob(
                  (blob) => {
                    if (blob) {
                      resolve({
                        id: `${Date.now()}-${index}-${Math.random().toString(36).substr(2, 4)}`,
                        // Create an object URL from the optimized canvas blob instead of raw uncompressed bytes
                        src: URL.createObjectURL(blob),
                        caption:
                          "Add context, date, location, or attendee details here...",
                      });
                    } else {
                      // Fallback to original file if blob compilation fails
                      resolve({
                        id: `${Date.now()}-${index}`,
                        src: URL.createObjectURL(file),
                        caption:
                          "Add context, date, location, or attendee details here...",
                      });
                    }
                  },
                  "image/jpeg",
                  0.82, // Perfect sweet spot balancing micro file footprints with crisp textual review readability
                );
              }
            };
          };
        });
      }),
    );

    setPhotos((prev) => [...prev, ...processedPhotos]);
  };
  
  const handleUpdateCaption = (id: string, newCaption: string) => {
    setPhotos((prev) =>
      prev.map((p) => (p.id === id ? { ...p, caption: newCaption } : p)),
    );
  };

  const handleDeletePhoto = (id: string) => {
    setPhotos((prev) => prev.filter((p) => p.id !== id));
  };

  const handleDownloadPDF = async () => {
    if (photos.length === 0) return;
    setIsGenerating(true);

    try {
      const { pdf } = await import("@react-pdf/renderer");

      const blob = await pdf(
        <VisaDocPDF
          title={title}
          photos={photos}
          columns={columns}
          pageOrientation={pageOrientation}
        />,
      ).toBlob();

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");

      const cleanFileName = fileName
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "");

      link.href = url;
      link.download = `${cleanFileName || "visa-document"}.pdf`;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("PDF generation failed", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <div className="flex flex-1">
        <Sidebar />

        {/* WORKSPACE AREA LAYOUT CONTAINER */}
        <main className="flex-1 bg-gray-50/50 p-4 sm:p-8 flex flex-col-reverse lg:flex-row items-start gap-6 lg:gap-8">
          {/* VISUAL DOCUMENT WORKSPACE */}
          <div className="flex-1 w-full overflow-x-auto min-w-0">
            <DocumentCanvas
              title={title}
              setTitle={setTitle}
              photos={photos}
              columns={columns}
              pageOrientation={pageOrientation}
              onUpdateCaption={handleUpdateCaption}
              onDeletePhoto={handleDeletePhoto}
            />
          </div>

          {/* APP UTILITY SIDEBAR */}
          <div className="w-full lg:w-80 shrink-0 lg:sticky lg:top-24">
            <ControlPanel
              columns={columns}
              setColumns={setColumns}
              pageOrientation={pageOrientation}
              setPageOrientation={setPageOrientation}
              documentTitle={title}
              setDocumentTitle={setTitle}
              fileName={fileName}
              setFileName={setFileName}
              onImageUpload={handleImageUpload}
              onDownloadPDF={handleDownloadPDF}
            />
          </div>
        </main>
      </div>
    </div>
  );
}
