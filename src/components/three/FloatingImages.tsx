"use client";

import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { travelImages } from "@/lib/travel-images";

function lcg(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    return (s >>> 0) / 0xffffffff;
  };
}

function ImageSprite({ url, position, scale }: { url: string; position: [number, number, number]; scale: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [texture] = useState(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 256;
    canvas.height = 192;
    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = "#6366f1";
    ctx.fillRect(0, 0, 256, 192);
    ctx.strokeStyle = "rgba(255,255,255,0.3)";
    ctx.strokeRect(2, 2, 252, 188);
    const tex = new THREE.CanvasTexture(canvas);
    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.src = url;
    img.onload = () => {
      ctx.drawImage(img, 0, 0, 256, 192);
      tex.needsUpdate = true;
    };
    return tex;
  });

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.position.y += Math.sin(clock.getElapsedTime() * 0.5 + position[0]) * 0.003;
      meshRef.current.rotation.z = Math.sin(clock.getElapsedTime() * 0.3 + position[0]) * 0.05;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <planeGeometry args={[1.8 * scale, 1.35 * scale]} />
      <meshBasicMaterial map={texture} transparent opacity={0.9} />
    </mesh>
  );
}

function ImageField() {
  const images = travelImages.hero;
  const [positions] = useState(() => {
    const random = lcg(456);
    const pos: [number, number, number][] = [];
    const cols = Math.ceil(images.length / 2);
    for (let i = 0; i < images.length; i++) {
      const row = Math.floor(i / cols);
      const col = i % cols;
      pos.push([(col - cols / 2) * 2.5, (row - 0.5) * 2, -3 - random() * 2]);
    }
    return pos;
  });

  const [scales] = useState(() => {
    const random = lcg(789);
    return images.slice(0, 5).map(() => 0.8 + random() * 0.4);
  });

  return (
    <group>
      {images.slice(0, 5).map((url, i) => (
        <ImageSprite key={i} url={url} position={positions[i]} scale={scales[i]} />
      ))}
    </group>
  );
}

export default function FloatingImages() {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <ImageField />
      </Canvas>
    </div>
  );
}
