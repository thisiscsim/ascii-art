'use client'

import { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { AsciiRenderer } from '@react-three/drei'
import * as THREE from 'three'

// Declare the type for Gradient to avoid TypeScript errors
declare global {
  interface Window {
    GradientInstance?: unknown
  }
}

// Component that renders the gradient as ASCII
function GradientPlane() {
  const meshRef = useRef<THREE.Mesh>(null)
  const [texture, setTexture] = useState<THREE.CanvasTexture | null>(null)
  
  useEffect(() => {
    // Wait a bit for the gradient to initialize
    const timer = setTimeout(() => {
      const gradientCanvas = document.getElementById('gradient-canvas') as HTMLCanvasElement
      if (gradientCanvas) {
        // Create a texture from the gradient canvas
        const canvasTexture = new THREE.CanvasTexture(gradientCanvas)
        canvasTexture.needsUpdate = true
        setTexture(canvasTexture)
      }
    }, 1000)
    
    return () => clearTimeout(timer)
  }, [])
  
  useFrame(() => {
    // Update the texture every frame to capture the animated gradient
    if (texture) {
      texture.needsUpdate = true
    }
  })
  
  if (!texture) return null
  
  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[20, 13.33, 1, 1]} />
      <meshBasicMaterial map={texture} />
    </mesh>
  )
}

export default function ShaderPage() {
  const [gradientReady, setGradientReady] = useState(false)
  
  useEffect(() => {
    // Create a script that will load and initialize the gradient
    const initScript = document.createElement('script')
    initScript.type = 'module'
    initScript.innerHTML = `
      import { Gradient } from '/Gradient.js';
      
      // Initialize the gradient
      const gradient = new Gradient();
      gradient.initGradient('#gradient-canvas');
      
      // Store instance on window for debugging
      window.GradientInstance = gradient;
      console.log('Gradient initialized successfully');
      
      // Dispatch event when ready
      window.dispatchEvent(new Event('gradientReady'));
    `
    
    // Listen for gradient ready event
    const handleGradientReady = () => {
      setGradientReady(true)
    }
    
    window.addEventListener('gradientReady', handleGradientReady)
    document.body.appendChild(initScript)
    
    return () => {
      window.removeEventListener('gradientReady', handleGradientReady)
      if (initScript.parentNode) {
        initScript.parentNode.removeChild(initScript)
      }
    }
  }, [])

  return (
    <div className="shader-container">
      {/* Hidden gradient canvas */}
      <canvas 
        id="gradient-canvas" 
        data-transition-in 
        style={{ 
          position: 'absolute',
          width: '1000px',
          height: '700px',
          visibility: 'hidden',
          pointerEvents: 'none'
        }}
      />
      
      {/* ASCII renderer */}
      {gradientReady && (
        <div className="ascii-display">
          <Canvas
            camera={{
              position: [0, 0, 10],
              fov: 75
            }}
            gl={{ preserveDrawingBuffer: true }}
          >
            {/* ASCII Renderer */}
            <AsciiRenderer
              bgColor="black"
              fgColor="white"
              characters=" .::"
              resolution={0.15}
              invert={false}
            />
            
            {/* Render the gradient as a plane */}
            <GradientPlane />
          </Canvas>
        </div>
      )}
      
      <style jsx>{`
        .shader-container {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          height: calc(100vh - 5rem);
          background: #000;
        }

        #gradient-canvas {
          --gradient-color-1: #2D3E50; 
          --gradient-color-2: #01C26E; 
          --gradient-color-3: #E24C3F;  
          --gradient-color-4: #F3C40F;
        }
        
        .ascii-display {
          width: 1000px;
          height: 700px;
          background: black;
        }
      `}</style>
    </div>
  )
} 