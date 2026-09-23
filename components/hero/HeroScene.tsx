'use client';

import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

function Gear({
  radius,
  teeth,
  thickness,
  position,
  rotationSpeed,
  color,
  emissive,
}: {
  radius: number;
  teeth: number;
  thickness: number;
  position: [number, number, number];
  rotationSpeed: number;
  color: string;
  emissive: string;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  const gearShape = useMemo(() => {
    const shape = new THREE.Shape();
    const toothDepth = 0.12;
    const innerRadius = radius * 0.75;
    const segments = teeth * 2;

    for (let i = 0; i <= segments; i++) {
      const angle = (i / segments) * Math.PI * 2;
      const r = i % 2 === 0 ? radius : radius - toothDepth;
      const x = Math.cos(angle) * r;
      const y = Math.sin(angle) * r;
      if (i === 0) shape.moveTo(x, y);
      else shape.lineTo(x, y);
    }

    const hole = new THREE.Path();
    hole.absarc(0, 0, innerRadius * 0.4, 0, Math.PI * 2, true);
    shape.holes.push(hole);

    return shape;
  }, [radius, teeth]);

  const extrudeSettings = useMemo(
    () => ({
      depth: thickness,
      bevelEnabled: true,
      bevelThickness: 0.03,
      bevelSize: 0.03,
      bevelSegments: 2,
      steps: 1,
    }),
    [thickness]
  );

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.z += delta * rotationSpeed;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.4}>
      <mesh ref={meshRef} position={position} castShadow>
        <extrudeGeometry args={[gearShape, extrudeSettings]} />
        <meshStandardMaterial
          color={color}
          metalness={0.9}
          roughness={0.25}
          emissive={emissive}
          emissiveIntensity={0.15}
        />
      </mesh>
    </Float>
  );
}

function EnergyRing({
  radius,
  position,
  color,
  speed,
}: {
  radius: number;
  position: [number, number, number];
  color: string;
  speed: number;
}) {
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.z += 0.01 * speed;
      const pulse = Math.sin(state.clock.elapsedTime * 2) * 0.05 + 1;
      ringRef.current.scale.setScalar(pulse);
    }
  });

  return (
    <mesh ref={ringRef} position={position} rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[radius, 0.015, 16, 100]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={2}
        toneMapped={false}
      />
    </mesh>
  );
}

function EnergyLine({
  start,
  end,
  color,
  delay,
}: {
  start: [number, number, number];
  end: [number, number, number];
  color: string;
  delay: number;
}) {
  const lineRef = useRef<THREE.Mesh>(null);
  const points = useMemo(() => {
    const s = new THREE.Vector3(...start);
    const e = new THREE.Vector3(...end);
    const mid = new THREE.Vector3(
      (s.x + e.x) / 2,
      (s.y + e.y) / 2 + 0.5,
      (s.z + e.z) / 2
    );
    const curve = new THREE.QuadraticBezierCurve3(s, mid, e);
    return curve.getPoints(50);
  }, [start, end]);

  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry().setFromPoints(points);
    return g;
  }, [points]);

  useFrame((state) => {
    if (lineRef.current) {
      const t = (state.clock.elapsedTime + delay) % 3;
      const intensity = Math.max(0, 1 - t / 1.5);
      (lineRef.current.material as THREE.MeshBasicMaterial).opacity = intensity;
    }
  });

  return (
    <line>
      <primitive object={geometry} attach="geometry" />
      <lineBasicMaterial
        color={color}
        transparent
        opacity={0.6}
        toneMapped={false}
      />
    </line>
  );
}

function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 60;

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 12;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 8;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.03;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#A83A2A"
        transparent
        opacity={0.5}
        sizeAttenuation
        toneMapped={false}
      />
    </points>
  );
}

function CoreSphere() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      const pulse = Math.sin(state.clock.elapsedTime * 1.5) * 0.05 + 1;
      ref.current.scale.setScalar(pulse);
    }
  });

  return (
    <mesh ref={ref} position={[0, 0, 0]}>
      <sphereGeometry args={[0.35, 32, 32]} />
      <meshStandardMaterial
        color="#A83A2A"
        emissive="#A83A2A"
        emissiveIntensity={3}
        toneMapped={false}
      />
    </mesh>
  );
}

export default function HeroScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { rootMargin: '160px' }
    );
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="h-full w-full">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 50 }}
        frameloop="demand"
        dpr={[1, 1.5]}
        gl={{ powerPreference: 'high-performance', antialias: false, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <SceneAnimation active={isVisible} />
      </Canvas>
    </div>
  );
}

function SceneAnimation({ active }: { active: boolean }) {
  const invalidate = useThree((state) => state.invalidate);

  useEffect(() => {
    if (!active) return;
    const interval = window.setInterval(() => invalidate(), 1000 / 30);
    invalidate();
    return () => window.clearInterval(interval);
  }, [active, invalidate]);

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} />
      <pointLight position={[-3, 2, 3]} intensity={1.5} color="#A83A2A" distance={15} />
      <pointLight position={[3, -2, -2]} intensity={1} color="#5B7A92" distance={12} />

      <group rotation={[0.3, 0, 0]}>
        <Gear
          radius={1.1}
          teeth={12}
          thickness={0.25}
          position={[0, 0, 0]}
          rotationSpeed={0.3}
          color="#7A95B0"
          emissive="#A83A2A"
        />
        <Gear
          radius={0.7}
          teeth={10}
          thickness={0.2}
          position={[1.8, 0.5, 0.5]}
          rotationSpeed={-0.5}
          color="#8BA5BE"
          emissive="#A83A2A"
        />
        <Gear
          radius={0.5}
          teeth={8}
          thickness={0.15}
          position={[-1.6, -0.8, 0.3]}
          rotationSpeed={0.7}
          color="#7A95B0"
          emissive="#A83A2A"
        />
        <CoreSphere />
        <EnergyRing radius={2.2} position={[0, 0, 0]} color="#A83A2A" speed={1} />
        <EnergyRing radius={2.8} position={[0, 0, -0.3]} color="#C4543F" speed={-0.7} />
        <EnergyRing radius={1.6} position={[0, 0, 0.2]} color="#A83A2A" speed={1.5} />
        <ParticleField />
      </group>

      </>
  );
}
