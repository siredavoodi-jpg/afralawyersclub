"use client";

import Image from "next/image";
import { useState } from "react";

export function Gallery({ images, title }: { images: { url: string }[]; title: string }) {
  const [idx, setIdx] = useState(0);
  const current = images[idx]?.url;

  return (
    <div>
      <div className="relative aspect-video overflow-hidden rounded-xl bg-neutral-100">
        {current ? (
          <Image src={current} alt={title} fill className="object-cover" />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-neutral-400">بدون تصویر</div>
        )}
      </div>
      {images.length > 1 && (
        <div className="mt-3 flex gap-2 overflow-x-auto">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              className={
                "relative h-16 w-20 shrink-0 overflow-hidden rounded-lg border-2 " +
                (i === idx ? "border-primary-600" : "border-neutral-200")
              }
              aria-label={`تصویر ${i + 1}`}
            >
              <Image src={img.url} alt="" fill className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}