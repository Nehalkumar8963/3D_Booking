"use client";

import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

function generateTexture(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext("2d")!;

  const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
  gradient.addColorStop(0, "#6366f1");
  gradient.addColorStop(0.25, "#8b5cf6");
  gradient.addColorStop(0.5, "#3b82f6");
  gradient.addColorStop(0.75, "#06b6d4");
  gradient.addColorStop(1, "#6366f1");

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const random = lcg(42);
  for (let i = 0; i < 80; i++) {
    const x = random() * canvas.width;
    const y = random() * canvas.height;
    const r = random() * 15 + 3;
    const alpha = random() * 0.4 + 0.1;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
    ctx.fill();
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(2, 1);
  return tex;
}

function lcg(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    return (s >>> 0) / 0xffffffff;
  };
}

function generateParticles() {
  const count = 200;
  const pos = new Float32Array(count * 3);
  const random = lcg(123);
  for (let i = 0; i < count; i++) {
    pos[i * 3] = (random() - 0.5) * 20;
    pos[i * 3 + 1] = (random() - 0.5) * 20;
    pos[i * 3 + 2] = (random() - 0.5) * 20;
  }
  return pos;
}

function GlobeMesh() {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const [texture] = useState(generateTexture);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.15) * 0.1;
      meshRef.current.rotation.y += 0.002;
    }
    if (glowRef.current) {
      glowRef.current.rotation.y += 0.001;
    }
  });

  return (
    <group>
      <Sphere ref={meshRef} args={[2.2, 64, 64]}>
        <MeshDistortMaterial
          color="#6366f1"
          map={texture}
          metalness={0.3}
          roughness={0.4}
          distort={0.15}
          speed={0.5}
          emissive="#6366f1"
          emissiveIntensity={0.15}
        />
      </Sphere>
      <Sphere ref={glowRef} args={[2.4, 32, 32]}>
        <meshBasicMaterial
          color="#6366f1"
          transparent
          opacity={0.08}
          side={THREE.BackSide}
        />
      </Sphere>
      <directionalLight position={[5, 5, 5]} intensity={1.5} />
      <ambientLight intensity={0.4} />
      <pointLight position={[-5, -3, 2]} intensity={0.5} color="#8b5cf6" />
    </group>
  );
}

function FloatingParticles() {
  const pointsRef = useRef<THREE.Points>(null);
  const [positions] = useState(generateParticles);

  useFrame(({ clock }) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += 0.0005;
      const pos = pointsRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < 200; i++) {
        pos[i * 3 + 1] += Math.sin(clock.getElapsedTime() * 0.3 + i) * 0.001;
      }
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={200}
          array={positions}
          itemSize={3}
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#6366f1"
        transparent
        opacity={0.6}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
}

export default function Globe() {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 1, 6], fov: 45 }}>
        <ambientLight intensity={0.3} />
        <GlobeMesh />
        <FloatingParticles />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 2.2}
          minPolarAngle={Math.PI / 3}
          rotateSpeed={0.3}
        />
      </Canvas>
    </div>
  );
}
