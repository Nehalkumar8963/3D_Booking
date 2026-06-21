"use client";

import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function lcg(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    return (s >>> 0) / 0xffffffff;
  };
}

interface CloudProps {
  position: [number, number, number];
  scale: number;
  speed: number;
}

function CloudMesh({ position, scale, speed }: CloudProps) {
  const ref = useRef<THREE.Group>(null);
  const startX = position[0];
  const [spheres] = useState(() => {
    const random = lcg(Math.floor(position[0] * 100 + position[1]));
    const count = Math.floor(random() * 4) + 3;
    return Array.from({ length: count }, () => ({
      size: random() * 0.4 + 0.2,
      offset: [
        (random() - 0.5) * 0.8,
        (random() - 0.5) * 0.3,
        (random() - 0.5) * 0.3,
      ] as [number, number, number],
    }));
  });

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.position.x = startX + Math.sin(clock.getElapsedTime() * speed * 0.1) * 4;
      ref.current.position.y += Math.sin(clock.getElapsedTime() * speed * 0.2) * 0.003;
    }
  });

  return (
    <group ref={ref} position={position} scale={scale}>
      {spheres.map((s, i) => (
        <mesh key={i} position={s.offset as unknown as THREE.Vector3}>
          <sphereGeometry args={[s.size, 8, 8]} />
          <meshBasicMaterial color="white" transparent opacity={0.3} />
        </mesh>
      ))}
    </group>
  );
}

function CloudField() {
  const [clouds] = useState(() => {
    const random = lcg(999);
    return Array.from({ length: 12 }, () => ({
      position: [
        (random() - 0.5) * 20,
        random() * 5 + 1,
        -5 - random() * 10,
      ] as [number, number, number],
      scale: random() * 1.5 + 0.8,
      speed: random() * 0.5 + 0.2,
    }));
  });

  return (
    <group>
      {clouds.map((cloud, i) => (
        <CloudMesh key={i} {...cloud} />
      ))}
    </group>
  );
}

export default function CloudParticles() {
  return (
    <div className="w-full h-full pointer-events-none">
      <Canvas camera={{ position: [0, 2, 8], fov: 50 }}>
        <CloudField />
      </Canvas>
    </div>
  );
}
