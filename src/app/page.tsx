'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { AsciiRenderer } from '@react-three/drei'
import * as THREE from 'three'

export default function Home() {
  return (
    <div style={{ width: '100vw', height: 'calc(100vh - 5rem)', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#000' }}>
      <div style={{ width: '900px', height: '600px', backgroundColor: 'black' }}>
        <Canvas 
          className="canvas"
          dpr={[1, 2]}
          gl={{ antialias: false }}
        >
        <color attach="background" args={['black']} />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />
        <TorusKnot />
        <AsciiRenderer 
          fgColor="white" 
          bgColor="transparent"
          characters=" .:-=+*#%@"
          resolution={0.2}
        />
      </Canvas>
      </div>
    </div>
  )
}

function TorusKnot() {
  const ref = useRef<THREE.Mesh>(null!)
  const viewport = useThree((state) => state.viewport)
  
  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x = ref.current.rotation.y += delta / 2
    }
  })
  
  return (
    <mesh 
      scale={Math.min(viewport.width, viewport.height) / 5} 
      ref={ref}
    >
      <torusKnotGeometry args={[1, 0.2, 128, 32]} />
      <meshStandardMaterial 
        color="red" 
        metalness={0.3}
        roughness={0.7}
      />
    </mesh>
  )
}
