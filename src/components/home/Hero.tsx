"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const HERO_SLIDES = ["/1.jpg", "/2.jpg", "/3.jpg", "/4.jpg"] as const;
const SLIDE_INTERVAL = 5000;

interface HeroProps {
  isActive?: boolean;
  onNext?: () => void;
}

export default function Hero({ isActive = true, onNext }: HeroProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (!isActive) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, SLIDE_INTERVAL);

    return () => clearInterval(timer);
  }, [isActive]);

  const handleScrollClick = () => {
    if (onNext) {
      onNext();
    } else {
      window.dispatchEvent(new CustomEvent("mtc-goto-panel", { detail: { index: 1 } }));
    }
  };

  return (
    <div
      className="relative flex h-full min-h-[100dvh] w-full items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0">
        {HERO_SLIDES.map((src, index) => (
          <div
            key={src}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={src}
              alt=""
              fill
              priority={index === 0}
              className="object-cover"
              sizes="100vw"
            />
          </div>
        ))}
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />

      <button
        type="button"
        onClick={handleScrollClick}
        aria-label="Faire défiler vers la section suivante"
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 animate-bounce cursor-pointer p-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange rounded-full"
      >
        <div className="h-10 w-6 rounded-full border-2 border-white/50 p-1 hover:border-brand-orange transition-colors">
          <div className="mx-auto h-2 w-1 rounded-full bg-white/80" />
        </div>
      </button>
    </div>
  );
}

