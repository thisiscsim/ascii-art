'use client'

import { useRef, useEffect, useState, useMemo } from 'react'

function AsciiVortex() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [rotation, setRotation] = useState(0)
  
  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => prev + 0.1)
    }, 50)
    
    return () => clearInterval(interval)
  }, [])
  
  // Generate the base spiral pattern once
  const basePoints = useMemo(() => {
    const points = []
    const maxRadius = 40
    const totalPoints = 2000
    
    for (let i = 0; i < totalPoints; i++) {
      const t = i / totalPoints
      
      // Create a spiral that gets tighter toward the center
      const angle = t * Math.PI * 2 * 8 // 8 full rotations
      const radius = maxRadius * (1 - t * 0.95) // Radius decreases to center
      
      // Create the swirl shape - two intertwined spirals
      const spiral1 = i % 2 === 0
      const offsetAngle = spiral1 ? 0 : Math.PI
      
      const baseAngle = angle + offsetAngle
      
      // Character density based on radius - less dense toward center
      const density = (radius / maxRadius) * 0.8 + 0.2
      if (Math.random() > density) continue
      
      // Character selection based on position in spiral
      let char
      if (radius < 5) {
        char = '@'
      } else if (radius < 10) {
        char = '#'
      } else if (radius < 15) {
        char = '%'
      } else if (radius < 20) {
        char = '*'
      } else if (radius < 25) {
        char = '+'
      } else if (radius < 30) {
        char = '='
      } else {
        char = '-'
      }
      
      points.push({
        baseAngle,
        radius,
        char,
        opacity: spiral1 ? 0.9 : 0.6,
        size: 12 + (1 - t) * 4,
        fontWeight: radius < 10 ? 'bold' : 'normal'
      })
    }
    
    // Add outer circle
    const circlePoints = 100
    for (let i = 0; i < circlePoints; i++) {
      if (Math.random() > 0.3) continue // Make it sparse
      
      const angle = (i / circlePoints) * Math.PI * 2
      
      points.push({
        baseAngle: angle,
        radius: maxRadius,
        char: '·',
        opacity: 0.4,
        size: 14,
        fontWeight: 'normal'
      })
    }
    
    return points
  }, [])
  
  // Render points with current rotation
  const renderVortex = () => {
    const centerX = 50
    const centerY = 50
    const rotationRad = rotation * Math.PI / 180
    
    return basePoints.map((point, index) => {
      // Apply rotation to the angle
      const rotatedAngle = point.baseAngle + rotationRad
      
      // Calculate position
      const x = centerX + Math.cos(rotatedAngle) * point.radius
      const y = centerY + Math.sin(rotatedAngle) * point.radius
      
      // Skip if outside bounds
      if (x < 5 || x > 95 || y < 5 || y > 95) return null
      
      return (
        <span
          key={index}
          className="absolute font-mono select-none"
          style={{
            left: `${x}%`,
            top: `${y}%`,
            fontSize: `${point.size}px`,
            opacity: point.opacity,
            transform: 'translate(-50%, -50%)',
            color: 'white',
            fontWeight: point.fontWeight
          }}
        >
          {point.char}
        </span>
      )
    })
  }
  
  return (
    <div 
      ref={containerRef}
      className="relative w-full h-full bg-black overflow-hidden flex items-center justify-center"
    >
      <div className="relative w-full h-full max-w-[700px] max-h-[700px]">
        {renderVortex()}
      </div>
    </div>
  )
}

export default function MotifPage() {
  return (
    <main className="flex flex-col items-center justify-center bg-black" style={{ height: 'calc(100vh - 5rem)' }}>
      <div className="w-[1000px] h-[700px] rounded-lg shadow-lg bg-black overflow-hidden border border-gray-900">
        <AsciiVortex />
      </div>
    </main>
  );
} 