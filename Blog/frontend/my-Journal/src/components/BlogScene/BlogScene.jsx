import { Canvas, useFrame } from "@react-three/fiber";
import { Edges } from "@react-three/drei";
import { useRef } from "react";

function Octahedron() {
  const ref = useRef();

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y += 0.004;
    ref.current.rotation.x += 0.0015;
    // gentle floating bob
    ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.12;
  });

  return (
    <group ref={ref}>
      <mesh>
        <octahedronGeometry args={[1.8, 0]} />
        <meshStandardMaterial
          color="#0a0a0a"
          metalness={0.9}
          roughness={0.15}
          transparent
          opacity={0.88}
        />
        <Edges color="white" lineWidth={1.5} />
      </mesh>
    </group>
  );
}

export default function BlogScene() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
      <ambientLight intensity={1.5} />
      <pointLight position={[4, 4, 4]} intensity={2} />
      <pointLight position={[-3, -2, -3]} intensity={0.4} color="#ffffff" />
      <Octahedron />
    </Canvas>
  );
}
