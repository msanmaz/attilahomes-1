"use client";

import { useState, useRef, type DragEvent, type ChangeEvent } from "react";
import Image from "next/image";

export type ExistingImage = {
  kind: "existing";
  id: string;
  url: string;
  storagePath: string;
  isCover: boolean;
};

export type NewImage = {
  kind: "new";
  id: string;
  previewUrl: string;
  file: File;
  compressedBlob?: Blob;
  isCover: boolean;
};

export type ManagedImage = ExistingImage | NewImage;

type Props = {
  images: ManagedImage[];
  onChange: (images: ManagedImage[]) => void;
};

export function ImageUploader({ images, onChange }: Props) {
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    const fileArray = Array.from(files);

    Promise.all(
      fileArray.map(
        (file) =>
          new Promise<NewImage>((resolve) => {
            const reader = new FileReader();
            reader.onload = (e) => {
              resolve({
                kind: "new",
                id: crypto.randomUUID(),
                previewUrl: e.target?.result as string,
                file,
                isCover: false,
              });
            };
            reader.readAsDataURL(file);
          }),
      ),
    ).then((newImages) => {
      const merged = [...images, ...newImages];
      if (!merged.some((i) => i.isCover) && merged.length > 0) {
        merged[0] = { ...merged[0], isCover: true };
      }
      onChange(merged);
    });
  }

  function handleDrop(e: DragEvent) {
    e.preventDefault();
    setDragOver(false);
    const files = Array.from(e.dataTransfer.files).filter((f) =>
      f.type.startsWith("image/"),
    );
    if (files.length > 0) {
      const dt = new DataTransfer();
      files.forEach((f) => dt.items.add(f));
      handleFiles(dt.files);
    }
  }

  function handleInput(e: ChangeEvent<HTMLInputElement>) {
    handleFiles(e.target.files);
    if (inputRef.current) inputRef.current.value = "";
  }

  function removeImage(id: string) {
    const updated = images.filter((i) => i.id !== id);
    if (updated.length > 0 && !updated.some((i) => i.isCover)) {
      updated[0] = { ...updated[0], isCover: true };
    }
    onChange(updated);
  }

  function setCover(id: string) {
    const updated = images.map((i) => ({ ...i, isCover: i.id === id }));
    onChange(updated);
  }

  function getThumbUrl(img: ManagedImage): string {
    return img.kind === "existing" ? img.url : img.previewUrl;
  }

  function getName(img: ManagedImage): string {
    return img.kind === "existing" ? `Image ${img.id.slice(0, 6)}` : img.file.name;
  }

  return (
    <div>
      <div
        className={`border-2 border-dashed p-10 text-center cursor-pointer transition-all duration-350 relative bg-bg-input ${
          dragOver
            ? "border-accent bg-accent-dim"
            : "border-accent/25 hover:border-accent hover:bg-accent-dim"
        }`}
        style={{ transitionTimingFunction: "var(--ease-smooth)" }}
        onDragEnter={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
      >
        <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center bg-accent-muted rounded-full">
          <svg viewBox="0 0 24 24" className="w-[22px] h-[22px] stroke-accent fill-none stroke-[1.5]">
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" y1="3" x2="12" y2="15" />
          </svg>
        </div>
        <div className="text-[0.85rem] text-text-secondary mb-1">
          Görselleri sürükleyin veya <span className="text-accent font-medium">seçin</span>
        </div>
        <div className="text-[0.68rem] text-text-muted">
          PNG, JPG — maks. 10MB. Kapak görseli olarak ayarlamak için tıklayın.
        </div>
        <input
          ref={inputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={handleInput}
          className="hidden"
        />
      </div>

      {images.length > 0 && (
        <div className="grid grid-cols-3 gap-2.5 mt-4">
          {images.map((img) => (
            <div
              key={img.id}
              className="relative aspect-[4/3] overflow-hidden border border-border transition-[border-color] duration-300 hover:border-accent group"
            >
              <Image
                src={getThumbUrl(img)}
                alt={getName(img)}
                fill
                className="object-cover"
                sizes="200px"
                unoptimized={img.kind === "new"}
              />
              {img.isCover && (
                <div className="absolute top-1.5 left-1.5 px-1.5 py-0.5 text-[0.5rem] tracking-[0.1em] uppercase font-semibold bg-accent text-bg-primary">
                  Kapak
                </div>
              )}
              <div className="absolute top-1.5 right-1.5 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-250">
                {!img.isCover && (
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); setCover(img.id); }}
                    title="Kapak olarak ayarla"
                    className="w-[22px] h-[22px] flex items-center justify-center bg-bg-primary/70 backdrop-blur-[4px] border border-border-hover cursor-pointer hover:bg-accent hover:border-accent"
                  >
                    <svg viewBox="0 0 24 24" className="w-3 h-3 stroke-text-primary fill-none stroke-2">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  </button>
                )}
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); removeImage(img.id); }}
                  className="w-[22px] h-[22px] flex items-center justify-center bg-bg-primary/70 backdrop-blur-[4px] border border-border-hover cursor-pointer hover:bg-rose hover:border-rose"
                >
                  <svg viewBox="0 0 24 24" className="w-3 h-3 stroke-text-primary fill-none stroke-2">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>
              {img.kind === "existing" && (
                <div className="absolute bottom-1.5 left-1.5 px-1.5 py-0.5 text-[0.45rem] tracking-[0.08em] uppercase bg-bg-primary/60 text-text-muted backdrop-blur-[4px]">
                  Kaydedildi
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
