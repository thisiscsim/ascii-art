'use client'

import { useRef } from 'react'
import { Canvas, useLoader, useFrame } from '@react-three/fiber'
import { AsciiRenderer } from '@react-three/drei'
import * as THREE from 'three'

function AnimatedShaderImage() {
  const meshRef = useRef<THREE.Mesh>(null)
  const materialRef = useRef<THREE.MeshBasicMaterial>(null)
  
  // Load the shader.png texture
  const texture = useLoader(THREE.TextureLoader, '/shader.png')
  
  // Animate the mesh and texture
  useFrame((state) => {
    if (!meshRef.current) return
    
    const time = state.clock.elapsedTime
    
    // Gentle rotation only
    meshRef.current.rotation.z = Math.sin(time * 0.1) * 0.05
    
    // Very subtle scale effect
    const scale = 1 + Math.sin(time * 0.5) * 0.02
    meshRef.current.scale.set(scale, scale, 1)
  })
  
  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[30, 30, 32, 32]} />
      <meshBasicMaterial 
        ref={materialRef}
        map={texture} 
        transparent={true}
        opacity={1}
      />
    </mesh>
  )
}

// Add floating particles for extra visual effect
function FloatingParticles() {
  const particlesRef = useRef<THREE.Points>(null)
  
  const particlesGeometry = new THREE.BufferGeometry()
  const particlesCount = 100
  const positions = new Float32Array(particlesCount * 3)
  
  for (let i = 0; i < particlesCount * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 40
    positions[i + 1] = (Math.random() - 0.5) * 40
    positions[i + 2] = (Math.random() - 0.5) * 20
  }
  
  particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  
  useFrame((state) => {
    if (!particlesRef.current) return
    
    const time = state.clock.elapsedTime
    particlesRef.current.rotation.y = time * 0.05
    particlesRef.current.rotation.x = time * 0.03
  })
  
  return (
    <points ref={particlesRef} geometry={particlesGeometry}>
      <pointsMaterial size={0.1} color="#ffffff" opacity={0.6} transparent />
    </points>
  )
}

export default function AsciiWaterPuddles() {
  return (
    <div className="w-full bg-black flex items-center justify-center" style={{ height: 'calc(100vh - 5rem)' }}>
      <div style={{ width: '900px', height: '600px' }}>
        <Canvas
          camera={{
            position: [0, 0, 20],
            fov: 50
          }}
          dpr={[1, 2]}
          gl={{ antialias: false }}
        >
          {/* ASCII Renderer with white characters */}
          <AsciiRenderer
            bgColor="black"
            fgColor="white"
            characters=" .:-=+*#%@&CX"
            resolution={0.2}
          />
          
          {/* Animated shader image */}
          <AnimatedShaderImage />
          
          {/* Floating particles for extra effect */}
          <FloatingParticles />
        </Canvas>
      </div>
    </div>
  )
} 