'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, AsciiRenderer } from '@react-three/drei';
import * as THREE from 'three';
import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';

function MobiusStrip() {
  const meshRef = useRef<THREE.Mesh>(null);

  const geometry = useMemo(() => {
    const segments = 100;
    const radius = 1.5; // Reduced radius to fit in canvas
    const halfWidth = 0.4; // Slightly reduced width
    const radialSegments = 20;

    const vertices = [];
    const normals = [];
    const uvs = [];
    const indices = [];

    // Generate vertices
    for (let i = 0; i <= segments; i++) {
      const u = (i / segments) * Math.PI * 2;
      
      for (let j = 0; j <= radialSegments; j++) {
        const v = (j / radialSegments) * 2 - 1;
        
        // Mobius strip parametric equations
        const x = (radius + halfWidth * v * Math.cos(u / 2)) * Math.cos(u);
        const y = (radius + halfWidth * v * Math.cos(u / 2)) * Math.sin(u);
        const z = halfWidth * v * Math.sin(u / 2);
        
        vertices.push(x, y, z);
        
        // Simple normal calculation (could be improved)
        const normal = new THREE.Vector3(x, y, z).normalize();
        normals.push(normal.x, normal.y, normal.z);
        
        // UV coordinates
        uvs.push(i / segments, j / radialSegments);
      }
    }

    // Generate indices
    for (let i = 0; i < segments; i++) {
      for (let j = 0; j < radialSegments; j++) {
        const a = i * (radialSegments + 1) + j;
        const b = a + 1;
        const c = a + radialSegments + 1;
        const d = c + 1;
        
        indices.push(a, b, c);
        indices.push(b, d, c);
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    geometry.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));
    geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
    geometry.setIndex(indices);
    geometry.computeVertexNormals();

    return geometry;
  }, []);

  // Animate rotation
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.2;
      meshRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <mesh ref={meshRef} geometry={geometry}>
      <meshNormalMaterial side={THREE.DoubleSide} />
    </mesh>
  );
}

export default function MobiusPage() {
  return (
    <main className="flex flex-col items-center justify-center bg-black" style={{ height: 'calc(100vh - 5rem)' }}>
      <div className="w-[1000px] h-[700px] rounded-lg shadow-lg bg-black">
        <Canvas 
          camera={{ position: [3, 3, 3], fov: 50 }}
          dpr={[1, 2]}
          gl={{ alpha: true, antialias: false }}
        >
          <color attach="background" args={['black']} />
          
          {/* ASCII Renderer with transparent background */}
          <AsciiRenderer
            bgColor="transparent"
            fgColor="white"
            characters=" .:-=+*#%@"
            resolution={0.2}
          />
          
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <MobiusStrip />
          <OrbitControls 
            enableDamping 
            dampingFactor={0.05} 
            enableZoom={false}
            enablePan={false}
          />
        </Canvas>
      </div>
    </main>
  );
} 