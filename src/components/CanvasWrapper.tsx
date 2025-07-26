'use client'

import { useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { useThree } from '@react-three/fiber'
import * as THREE from 'three'

// Component to handle cleanup when canvas unmounts
function CleanupOnUnmount() {
  const { gl, scene } = useThree()
  
  useEffect(() => {
    return () => {
      // Clean up all geometries, materials, and textures
      scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.geometry?.dispose()
          
          if (child.material) {
            if (Array.isArray(child.material)) {
              child.material.forEach(material => {
                material.dispose()
                // Dispose of any textures
                Object.values(material).forEach((value) => {
                  if (value instanceof THREE.Texture) {
                    value.dispose()
                  }
                })
              })
            } else {
              child.material.dispose()
              // Dispose of any textures
              Object.values(child.material).forEach((value) => {
                if (value instanceof THREE.Texture) {
                  value.dispose()
                }
              })
            }
          }
        }
      })
      
      // Dispose of the renderer
      gl.dispose()
    }
  }, [gl, scene])
  
  return null
}

interface CanvasWrapperProps extends React.ComponentProps<typeof Canvas> {
  children: React.ReactNode
}

export function CanvasWrapper({ children, ...props }: CanvasWrapperProps) {
  return (
    <Canvas {...props}>
      <CleanupOnUnmount />
      {children}
    </Canvas>
  )
} 