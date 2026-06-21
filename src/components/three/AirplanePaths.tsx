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

interface AirplaneProps {
  startPos: [number, number, number];
  endPos: [number, number, number];
  delay: number;
  duration: number;
}

function AirplaneMesh({ startPos, endPos, delay, duration }: AirplaneProps) {
  const ref = useRef<THREE.Group>(null);
  const progress = useRef(0);
  const isActive = useRef(false);
  const timerRef = useRef(0);

  useFrame(() => {
    if (!ref.current) return;
    timerRef.current += 0.01;

    if (!isActive.current && timerRef.current > delay) {
      isActive.current = true;
      progress.current = 0;
    }

    if (isActive.current) {
      progress.current += 0.005 / duration;
      if (progress.current > 1) {
        progress.current = 0;
        timerRef.current = 0;
        isActive.current = false;
      }

      const t = progress.current;
      const eased = t * t * (3 - 2 * t);
      const x = startPos[0] + (endPos[0] - startPos[0]) * eased;
      const y = startPos[1] + (endPos[1] - startPos[1]) * eased + Math.sin(t * Math.PI) * 0.5;
      const z = startPos[2] + (endPos[2] - startPos[2]) * eased;

      ref.current.position.set(x, y, z);
      ref.current.rotation.z = Math.atan2(endPos[1] - startPos[1], endPos[0] - startPos[0]);
      ref.current.rotation.z += Math.cos(t * Math.PI) * 0.15;
    }
  });

  return (
    <group ref={ref} position={startPos}>
      <mesh>
        <coneGeometry args={[0.12, 0.3, 4]} />
        <meshBasicMaterial color="white" transparent opacity={0.8} />
      </mesh>
      <mesh position={[0.2, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <planeGeometry args={[0.04, 0.2]} />
        <meshBasicMaterial color="white" transparent opacity={0.4} />
      </mesh>
      <pointLight distance={0.5} intensity={0.3} color="#6366f1" />
    </group>
  );
}

function AirplaneRoutes() {
  const [paths] = useState(() => {
    const random = lcg(555);
    return Array.from({ length: 6 }, (_, i) => ({
      start: [(random() - 0.5) * 10, random() * 3, -3 - random() * 5] as [number, number, number],
      end: [(random() - 0.5) * 10, random() * 3, 3 + random() * 5] as [number, number, number],
      delay: i * 2 + random() * 3,
      duration: random() * 2 + 2,
    }));
  });

  return (
    <group>
      {paths.map((path, i) => (
        <AirplaneMesh key={i} startPos={path.start} endPos={path.end} delay={path.delay} duration={path.duration} />
      ))}
    </group>
  );
}

export default function AirplanePaths() {
  return (
    <div className="w-full h-full pointer-events-none absolute inset-0">
      <Canvas camera={{ position: [0, 2, 8], fov: 50 }}>
        <AirplaneRoutes />
      </Canvas>
    </div>
  );
}
