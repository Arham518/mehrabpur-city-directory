import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";

function Pin() {
  const g = useRef();
  const ring = useRef();
  useFrame((s, d) => {
    g.current.rotation.y += d * 0.9;
    g.current.position.y = Math.sin(s.clock.elapsedTime * 1.6) * 0.12;
    ring.current.rotation.z += d * 0.6;
  });
  return (
    <>
      <group ref={g}>
        <mesh position={[0, 0.35, 0]}>
          <sphereGeometry args={[0.62, 48, 48]} />
          <meshStandardMaterial color="#e8590c" roughness={0.3} metalness={0.15} />
        </mesh>
        <mesh position={[0, -0.38, 0]} rotation={[Math.PI, 0, 0]}>
          <coneGeometry args={[0.5, 1.15, 40]} />
          <meshStandardMaterial color="#e8590c" roughness={0.3} metalness={0.15} />
        </mesh>
        <mesh position={[0, 0.35, 0.5]}>
          <sphereGeometry args={[0.24, 32, 32]} />
          <meshStandardMaterial color="#fff7ed" roughness={0.4} />
        </mesh>
      </group>
      <mesh ref={ring} position={[0, -1.05, 0]} rotation={[Math.PI / 2.4, 0, 0]}>
        <torusGeometry args={[0.85, 0.04, 16, 64]} />
        <meshStandardMaterial color="#ff8a3d" emissive="#ff8a3d" emissiveIntensity={0.6} />
      </mesh>
    </>
  );
}

/** Small WebGL hero element: a floating, rotating 3D map pin. Lazy-loaded; hidden if WebGL is unavailable. */
export default function Hero3D({ className }) {
  return (
    <div className={className} aria-hidden>
      <Canvas camera={{ position: [0, 0.2, 4.2], fov: 38 }} dpr={[1, 1.6]} gl={{ alpha: true, antialias: true }}>
        <ambientLight intensity={1.1} />
        <directionalLight position={[3, 4, 5]} intensity={2.2} />
        <pointLight position={[-3, -1, 2]} intensity={14} color="#ffb27a" />
        <Pin />
      </Canvas>
    </div>
  );
}
