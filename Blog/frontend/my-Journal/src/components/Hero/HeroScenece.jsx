import { Canvas, useFrame } from "@react-three/fiber";
import { Text, Edges } from "@react-three/drei";
import { useRef } from "react";

function Cube() {
  const cubeRef = useRef();

  const faces = [
    {
      text: "THOUGHTS",
      position: [0, 0, 1.55],
      rotation: [0, 0, 0],
    },
    {
      text: "TECH",
      position: [0, 0, -1.55],
      rotation: [0, Math.PI, 0],
    },
    {
      text: "CONCEPTS",
      position: [-1.55, 0, 0],
      rotation: [0, -Math.PI / 2, 0],
    },
    {
      text: "PHILOSOPHY",
      position: [1.55, 0, 0],
      rotation: [0, Math.PI / 2, 0],
    },
    {
      text: "RESEARCH",
      position: [0, 1.55, 0],
      rotation: [-Math.PI / 2, 0, 0],
    },
    {
      text: "SIMULATIONS",
      position: [0, -1.55, 0],
      rotation: [Math.PI / 2, 0, 0],
    },
  ];

  useFrame(() => {
    if (!cubeRef.current) return;

    cubeRef.current.rotation.y += 0.01;
    cubeRef.current.rotation.x += 0.003;
  });

  return (
    <group ref={cubeRef}>
      <mesh>
        <boxGeometry args={[3, 3, 3]} />

        <meshStandardMaterial
          color="#0f0f0f"
          metalness={0.5}
          roughness={0.5}
        />

        <Edges
          color="white"
          lineWidth={4}
        />
      </mesh>

      {faces.map((face) => (
        <Text
          key={face.text}
          position={face.position}
          rotation={face.rotation}
          fontSize={0.18}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          {face.text}
        </Text>
      ))}
    </group>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{
        position: [0, 0, 8],
        fov: 50,
      }}
    >
      <ambientLight intensity={2} />

      <directionalLight
        position={[5, 5, 5]}
        intensity={3}
      />

      <Cube />
    </Canvas>
  );
}