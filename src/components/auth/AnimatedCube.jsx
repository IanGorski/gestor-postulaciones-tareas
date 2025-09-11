import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';


function SpinningCube(props) {
  const { position, color, animationType, moveType } = props;
  const mesh = useRef();
  const material = useRef();
  useFrame((state) => {
    if (!mesh.current || !material.current) return;
    const t = state.clock.getElapsedTime();
    let dynamicColor = color;
    // Movimiento libre por el área 3D
    if (moveType === 'orbit1') {
      mesh.current.position.x = Math.sin(t) * 2.5;
      mesh.current.position.y = Math.cos(t * 1.2) * 2.2;
    } else if (moveType === 'orbit2') {
      mesh.current.position.x = Math.cos(t * 0.7) * 2.7;
      mesh.current.position.y = Math.sin(t * 1.5) * 2.1;
    } else if (moveType === 'orbit3') {
      mesh.current.position.x = Math.sin(t * 1.3) * 2.3;
      mesh.current.position.y = Math.cos(t * 0.9) * 2.4;
    }
    // Animaciones de color y rotación
    if (animationType === 'color') {
      const hue = (t * 40) % 360;
      dynamicColor = `hsl(${hue}, 80%, 60%)`;
      material.current.color.setStyle(dynamicColor);
    }
    if (animationType === 'rotate') {
      mesh.current.rotation.y += 0.02;
      mesh.current.rotation.x += 0.01;
    } else if (animationType === 'pulse') {
      const scale = 1.7 + Math.sin(t * 2) * 0.3;
      mesh.current.scale.set(scale, scale, scale);
    } else if (animationType === 'bounce') {
      mesh.current.rotation.z += 0.01;
    }
  });
  return (
    <mesh ref={mesh} position={position} scale={[2.0, 2.0, 2.0]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial ref={material} color={color} />
    </mesh>
  );
}

function AnimatedCube() {
  const [webglOk, setWebglOk] = useState(true);

  useEffect(() => {
    // Detección de características para WebGL
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) setWebglOk(false);
    } catch {
      setWebglOk(false);
    }
  }, []);

  return (
    <div className="animated-3d-section" style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
      {webglOk ? (
        <div className="animated-3d-canvas" style={{ width: '100%', height: '100%' }}>
          <Canvas camera={{ position: [0, 0, 7], fov: 55 }} style={{ width: '100%', height: '100%' }} onCreated={({ gl }) => {
            // Si el contexto se pierde en runtime, mostrar fallback
            gl.domElement.addEventListener('webglcontextlost', () => setWebglOk(false), { once: true });
          }}>
            <ambientLight intensity={1.2} />
            <directionalLight position={[2, 3, 4]} intensity={0.6} />
            <SpinningCube position={[-2, 0, 0]} color="#e040fb" animationType="color" moveType="orbit1" />
            <SpinningCube position={[0, 0, 0]} color="#a259b6" animationType="pulse" moveType="orbit2" />
            <SpinningCube position={[2, 0, 0]} color="#7c3aed" animationType="bounce" moveType="orbit3" />
          </Canvas>
        </div>
      ) : (
        <div className="no-webgl-fallback" style={{
          width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          background: 'radial-gradient(circle at 40% 40%, #e040fb 0%, #a259b6 70%, #7c3aed 100%)',
          color: '#fff', padding: '1.25rem', textAlign: 'center'
        }}>
          <div style={{ fontSize: '2.5rem', lineHeight: 1, opacity: 0.9 }}>⬡</div>
          <p style={{ fontSize: '0.95rem', maxWidth: 320, marginTop: '0.85rem' }}>Experiencia 3D no disponible en este dispositivo. Mostrando versión estática.</p>
        </div>
      )}
      <style>{`
        .animated-3d-section { isolation: isolate; }
        @media (max-width: 1024px) {
          .animated-3d-section {
            width: 100% !important;
            height: 100% !important;
            min-width: 300px;
            max-width: 100%;
            min-height: 240px;
            max-height: 60vh;
          }
          .animated-3d-canvas, .no-webgl-fallback {
            width: 100% !important;
            height: 100% !important;
            min-width: 300px;
            max-width: 100%;
            min-height: 220px;
            max-height: 60vh;
          }
        }
        @media (max-width: 500px) {
          .animated-3d-section {
            max-height: 48vh !important;
            min-height: 210px;
          }
          .animated-3d-canvas, .no-webgl-fallback {
            max-height: 48vh !important;
            min-height: 210px;
          }
        }
        @media (max-width: 340px) {
          .no-webgl-fallback p { font-size: 0.8rem; }
        }
      `}</style>
    </div>
  );
}

export default AnimatedCube;
