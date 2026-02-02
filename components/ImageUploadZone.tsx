"use client";

import { useRef } from "react";

interface ImageUploadZoneProps {
  images: File[];
  onAdd: (files: File[]) => void;
  onRemove: (index: number) => void;
  maxCount?: number;
}

export default function ImageUploadZone({
  images,
  onAdd,
  onRemove,
  maxCount = 20,
}: ImageUploadZoneProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => fileInputRef.current?.click();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    const valid = files.filter((f) => f.type.startsWith("image/"));
    onAdd(valid.slice(0, maxCount - images.length));
    e.target.value = "";
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold text-gray-900">
        Images ({images.length})
      </h2>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={handleFileChange}
      />
      <div
        onClick={handleClick}
        className="flex min-h-[280px] cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 p-6 text-center transition-colors hover:border-teal-400 hover:bg-teal-50/50"
      >
        {images.length === 0 ? (
          <>
            <svg
              className="mb-3 h-12 w-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <p className="text-sm font-medium text-gray-600">
              Upload images to start.
            </p>
            <p className="mt-1 text-xs text-gray-400">
              PNG, JPG up to 10MB. Drag & drop or click.
            </p>
          </>
        ) : (
          <div className="grid w-full grid-cols-2 gap-2">
            {images.slice(0, 6).map((file, i) => (
              <div
                key={i}
                className="relative aspect-square overflow-hidden rounded-lg bg-gray-200"
              >
                <img
                  src={URL.createObjectURL(file)}
                  alt={`Preview ${i + 1}`}
                  className="h-full w-full object-cover"
                />
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemove(i);
                  }}
                  className="absolute right-1 top-1 rounded-full bg-black/50 p-1 text-white hover:bg-black/70"
                  aria-label="Quitar imagen"
                >
                  <svg
                    className="h-3 w-3"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            ))}
            {images.length > 6 && (
              <div className="flex aspect-square items-center justify-center rounded-lg bg-gray-100 text-sm text-gray-500">
                +{images.length - 6} more
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
