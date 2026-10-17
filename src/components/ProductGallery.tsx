"use client";

import Image from "next/image";
import { useState } from "react";
import type { Media } from "@/content/media";

/** Main image with thumbnail switcher for the product page. */
export default function ProductGallery({ images, name }: { images: Media[]; name: string }) {
  const [active, setActive] = useState(0);
  const current = images[active];

  return (
    <div>
      <div className="relative aspect-[4/3.6] overflow-hidden bg-stone">
        <Image key={current.src} src={current.src} alt={current.alt} fill priority sizes="(min-width:1024px) 55vw, 100vw" className="object-cover" />
        <div className="light-sweep" />
      </div>
      {images.length > 1 && (
        <ul className="mt-3 flex gap-3" aria-label={`${name} images`}>
          {images.map((img, i) => (
            <li key={img.src}>
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Show image ${i + 1} of ${images.length}`}
                aria-pressed={i === active}
                className={`relative block size-20 overflow-hidden border-2 transition-colors md:size-24 ${
                  i === active ? "border-brass" : "border-transparent opacity-70 hover:opacity-100"
                }`}
              >
                <Image src={img.src} alt="" fill sizes="96px" className="object-cover" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
