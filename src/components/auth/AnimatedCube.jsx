import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stage } from '@react-three/drei';

function AnimatedPerson({ hover }) {
  const group = useRef();
  useFrame(() => {
    if (group.current) {
      // Salto animado y brazos arriba si hover
      group.current.position.y = hover ? Math.abs(Math.sin(Date.now() * 0.004)) * 0.7 + 1.2 : 1.2;
      group.current.rotation.z = 0;
      // Animación de brazos (celebración)
      group.current.children.forEach((child, idx) => {
        // Left Arm idx=6, Right Arm idx=8
        if (idx === 6) child.rotation.z = hover ? Math.PI / 2.2 : 0.3;
        if (idx === 8) child.rotation.z = hover ? -Math.PI / 2.2 : -0.3;
      });
    }
  });
  return (
    <group ref={group} position={[0, 1.2, 0]}>
      {/* Head */}
      <mesh position={[0, 0.45, 0]}>
    <sphereGeometry args={[0.22, 12, 12]} />
        <meshStandardMaterial color="#ffe0b2" />
      </mesh>
      {/* Face (eyes and mouth) */}
      {/* Left Eye (big) */}
      <mesh position={[-0.07, 0.56, 0.19]}>
    <sphereGeometry args={[0.04, 8, 8]} />
        <meshStandardMaterial color="#222" />
      </mesh>
      {/* Right Eye (big) */}
      <mesh position={[0.07, 0.56, 0.19]}>
    <sphereGeometry args={[0.04, 8, 8]} />
        <meshStandardMaterial color="#222" />
      </mesh>
      {/* Left Eyebrow (very raised) */}
      <mesh position={[-0.07, 0.62, 0.21]} rotation={[0,0,0.7]}>
        <cylinderGeometry args={[0.012, 0.012, 0.09, 8]} />
        <meshStandardMaterial color="#222" />
      </mesh>
      {/* Right Eyebrow (very raised) */}
      <mesh position={[0.07, 0.62, 0.21]} rotation={[0,0,-0.7]}>
        <cylinderGeometry args={[0.012, 0.012, 0.09, 8]} />
        <meshStandardMaterial color="#222" />
      </mesh>
      {/* Mouth (big smile) */}
      <mesh position={[0, 0.50, 0.21]} rotation={[0,0,0]}>
        <torusGeometry args={[0.065, 0.018, 10, 32, Math.PI]} />
        <meshStandardMaterial color="#d84315" />
      </mesh>
      {/* Body */}
      <mesh position={[0, 0.05, 0]}>
    <cylinderGeometry args={[0.13, 0.13, 0.45, 12]} />
        <meshStandardMaterial color="#2196f3" />
      </mesh>
      {/* Left Arm */}
      <mesh position={[-0.22, 0.18, 0]} rotation={[0,0,0]}>
    <cylinderGeometry args={[0.04, 0.04, 0.32, 8]} />
        <meshStandardMaterial color="#ffe0b2" />
      </mesh>
      {/* Left Hand */}
      <mesh position={[-0.22, 0.34, 0]}>
    <sphereGeometry args={[0.05, 8, 8]} />
        <meshStandardMaterial color="#ffe0b2" />
      </mesh>
      {/* Right Arm */}
      <mesh position={[0.22, 0.18, 0]} rotation={[0,0,0]}>
    <cylinderGeometry args={[0.04, 0.04, 0.32, 8]} />
        <meshStandardMaterial color="#ffe0b2" />
      </mesh>
      {/* Right Hand */}
      <mesh position={[0.22, 0.34, 0]}>
    <sphereGeometry args={[0.05, 8, 8]} />
        <meshStandardMaterial color="#ffe0b2" />
      </mesh>
      {/* Left Leg */}
      <mesh position={[-0.09, -0.35, 0]} rotation={[0,0,0]}>
    <cylinderGeometry args={[0.05, 0.05, 0.32, 8]} />
        <meshStandardMaterial color="#424242" />
      </mesh>
      {/* Right Leg */}
      <mesh position={[0.09, -0.35, 0]} rotation={[0,0,0]}>
    <cylinderGeometry args={[0.05, 0.05, 0.32, 8]} />
        <meshStandardMaterial color="#424242" />
      </mesh>
    </group>
  );
}


function Cube({ color, setColor, hover, setHover, rotation, setRotation }) {
  const mesh = useRef();
  useFrame(() => {
    if (mesh.current) {
      mesh.current.material.color.set(color);
      mesh.current.rotation.y += 0.01;
      mesh.current.rotation.x = rotation[0];
      mesh.current.rotation.z = rotation[2];
    }
  });
  // Cambia el color al hacer clic
  const handleClick = () => {
    const colors = ['#e040fb', '#ff4081', '#7c4dff', '#00e676', '#ffd600'];
    setColor(colors[Math.floor(Math.random() * colors.length)]);
  };
  // Rotar el cubo al mover el mouse
  const handlePointerMove = (e) => {
    setRotation([e.pointer.y * 0.01, mesh.current.rotation.y, e.pointer.x * 0.01]);
  };
  return (
    <mesh
      ref={mesh}
      position={[0, 0.5, 0]}
      castShadow
      receiveShadow
      onClick={handleClick}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
      onPointerMove={handlePointerMove}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

function AnimatedCube() {
  const [color, setColor] = useState('#e040fb');
  const [hover, setHover] = useState(false);
  const [rotation, setRotation] = useState([0, 0, 0]);
  // Vuelve a la cámara original y grupo centrado
  return (
    <Canvas shadows camera={{ position: [3, 3, 3], fov: 50 }}>
      <ambientLight intensity={0.7} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} castShadow />
  <group position={[0, -1.1, 0]}>
        <Cube color={color} setColor={setColor} hover={hover} setHover={setHover} rotation={rotation} setRotation={setRotation} />
        <AnimatedPerson hover={hover} />
      </group>
    </Canvas>
  );
}

export default AnimatedCube;
