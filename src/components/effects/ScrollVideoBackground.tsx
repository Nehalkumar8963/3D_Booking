"use client";

import { useRef, useEffect } from "react";

const TOTAL_FRAMES = 240;
const FRAME_BASE = "/frames/ezgif-frame-";

export default function ScrollVideoBackground({ children }: { children: React.ReactNode }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);
  const rafId = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const pad = (n: number) => String(n).padStart(3, "0");
    const loadedImages: HTMLImageElement[] = [];
    let loadCount = 0;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
    };

    const drawImage = (img: HTMLImageElement) => {
      const cw = window.innerWidth;
      const ch = window.innerHeight;
      const ir = img.width / img.height;
      const cr = cw / ch;
      let sw: number, sh: number, sx: number, sy: number;
      if (ir > cr) {
        sh = img.height;
        sw = sh * cr;
        sx = (img.width - sw) / 2;
        sy = 0;
      } else {
        sw = img.width;
        sh = sw / cr;
        sx = 0;
        sy = (img.height - sh) / 2;
      }
      ctx.clearRect(0, 0, cw, ch);
      ctx.drawImage(img, sx, sy, sw, sh, 0, 0, cw, ch);
    };

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      img.onload = () => {
        loadCount++;
        if (loadCount === 1 || loadCount === TOTAL_FRAMES) {
          drawImage(img);
        }
      };
      img.src = `${FRAME_BASE}${pad(i)}.jpg`;
      loadedImages.push(img);
    }

    imagesRef.current = loadedImages;

    const lerpFrame = () => {
      const scrollTop = window.scrollY;
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      const progress = Math.min(scrollTop / maxScroll, 1);
      const exactFrame = progress * (TOTAL_FRAMES - 1);
      const frameIndex = Math.round(exactFrame);
      const clamped = Math.max(0, Math.min(frameIndex, TOTAL_FRAMES - 1));

      if (clamped !== currentFrameRef.current && loadedImages[clamped]) {
        currentFrameRef.current = clamped;
        drawImage(loadedImages[clamped]);
      }
      rafId.current = requestAnimationFrame(lerpFrame);
    };

    resize();
    window.addEventListener("resize", resize);
    rafId.current = requestAnimationFrame(lerpFrame);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full object-cover pointer-events-none"
        style={{ zIndex: 0 }}
      />
      <div className="relative" style={{ zIndex: 1 }}>
        {children}
      </div>
    </div>
  );
}
