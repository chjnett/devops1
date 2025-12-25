import { useRef, useMemo, useEffect, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

// Constellation Particles Component
function ConstellationParticles({ mousePosition, isDragging, dragVelocity }) {
  const pointsRef = useRef()
  const linesRef = useRef()
  const particleCount = 500
  const connectionDistance = 0.15
  const mouseInfluenceRadius = isDragging ? 0.4 : 0.25
  const particleSizes = useRef(new Float32Array(particleCount).fill(1.0))

  // Initialize particles with random positions and velocities
  const particles = useMemo(() => {
    const positions = new Float32Array(particleCount * 3)
    const velocities = new Float32Array(particleCount * 3)
    const originalPositions = new Float32Array(particleCount * 3)
    const bounceVelocities = new Float32Array(particleCount * 3) // For bounce effect
    const bouncePhases = new Float32Array(particleCount) // Individual bounce timing

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3
      // Spread particles across the view
      positions[i3] = (Math.random() - 0.5) * 10
      positions[i3 + 1] = (Math.random() - 0.5) * 6
      positions[i3 + 2] = (Math.random() - 0.5) * 3

      // Store original positions
      originalPositions[i3] = positions[i3]
      originalPositions[i3 + 1] = positions[i3 + 1]
      originalPositions[i3 + 2] = positions[i3 + 2]

      // Random velocity for subtle drift
      velocities[i3] = (Math.random() - 0.5) * 0.001
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.001
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.0005

      // Initialize bounce velocities to zero
      bounceVelocities[i3] = 0
      bounceVelocities[i3 + 1] = 0
      bounceVelocities[i3 + 2] = 0

      // Random bounce phase for staggered effect
      bouncePhases[i] = Math.random() * Math.PI * 2
    }

    return { positions, velocities, originalPositions, bounceVelocities, bouncePhases }
  }, [])

  // Animation loop
  useFrame((state) => {
    if (!pointsRef.current) return

    const positions = pointsRef.current.geometry.attributes.position.array
    const time = state.clock.getElapsedTime()

    // Update particle positions
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3

      // Subtle drift animation
      positions[i3] += particles.velocities[i3]
      positions[i3 + 1] += particles.velocities[i3 + 1]
      positions[i3 + 2] += particles.velocities[i3 + 2]

      // Mouse interaction - BOUNCE EFFECT
      const dx = mousePosition.x * 5 - positions[i3]
      const dy = mousePosition.y * 3 - positions[i3 + 1]
      const distance = Math.sqrt(dx * dx + dy * dy)

      if (isDragging && distance < mouseInfluenceRadius) {
        // Calculate repulsion force (particles bounce away from cursor)
        const repulsionStrength = (1 - distance / mouseInfluenceRadius)
        const dragSpeed = Math.sqrt(dragVelocity.x ** 2 + dragVelocity.y ** 2)

        // Stronger bounce when dragging faster
        const bounceForce = repulsionStrength * (0.15 + dragSpeed * 2.0)

        // Direction away from cursor
        const angle = Math.atan2(-dy, -dx)

        // Apply bounce velocity with spring physics
        particles.bounceVelocities[i3] += Math.cos(angle) * bounceForce
        particles.bounceVelocities[i3 + 1] += Math.sin(angle) * bounceForce

        // Add some randomness for natural bounce
        particles.bounceVelocities[i3] += (Math.random() - 0.5) * 0.02
        particles.bounceVelocities[i3 + 1] += (Math.random() - 0.5) * 0.02

        // BOUNCE SIZE EFFECT - particles grow when hit
        particleSizes.current[i] = Math.min(particleSizes.current[i] + repulsionStrength * 0.5, 2.5)
      }

      // Gradually return particle size to normal
      particleSizes.current[i] += (1.0 - particleSizes.current[i]) * 0.1

      // Apply bounce velocities with spring damping
      positions[i3] += particles.bounceVelocities[i3]
      positions[i3 + 1] += particles.bounceVelocities[i3 + 1]

      // Spring damping - creates bouncy effect
      const springDamping = 0.92 // Lower = more bouncy
      particles.bounceVelocities[i3] *= springDamping
      particles.bounceVelocities[i3 + 1] *= springDamping

      // Gentle pull back to original position with overshoot
      const returnForce = 0.008 // Stronger return for bouncier effect
      const toOriginalX = particles.originalPositions[i3] - positions[i3]
      const toOriginalY = particles.originalPositions[i3 + 1] - positions[i3 + 1]

      positions[i3] += toOriginalX * returnForce
      positions[i3 + 1] += toOriginalY * returnForce
      positions[i3 + 2] += (particles.originalPositions[i3 + 2] - positions[i3 + 2]) * returnForce

      // Boundary wrapping
      if (Math.abs(positions[i3] - particles.originalPositions[i3]) > 5) {
        positions[i3] = particles.originalPositions[i3]
      }
      if (Math.abs(positions[i3 + 1] - particles.originalPositions[i3 + 1]) > 3) {
        positions[i3 + 1] = particles.originalPositions[i3 + 1]
      }
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true

    // Update particle sizes for bounce effect
    if (pointsRef.current.geometry.attributes.size) {
      const sizes = pointsRef.current.geometry.attributes.size.array
      for (let i = 0; i < particleCount; i++) {
        sizes[i] = particleSizes.current[i]
      }
      pointsRef.current.geometry.attributes.size.needsUpdate = true
    }

    // Draw connection lines between nearby particles
    const linePositions = []
    const lineColors = []

    for (let i = 0; i < particleCount; i++) {
      for (let j = i + 1; j < particleCount; j++) {
        const i3 = i * 3
        const j3 = j * 3

        const dx = positions[i3] - positions[j3]
        const dy = positions[i3 + 1] - positions[j3 + 1]
        const dz = positions[i3 + 2] - positions[j3 + 2]
        const distance = Math.sqrt(dx * dx + dy * dy + dz * dz)

        if (distance < connectionDistance) {
          // Add line between particles
          linePositions.push(
            positions[i3], positions[i3 + 1], positions[i3 + 2],
            positions[j3], positions[j3 + 1], positions[j3 + 2]
          )

          // Fade opacity based on distance
          const opacity = 1 - distance / connectionDistance

          // Cyan accent color (fixed)
          const r = 0.5
          const g = 0.8
          const b = 1.0

          lineColors.push(r, g, b, opacity * 0.3)
          lineColors.push(r, g, b, opacity * 0.3)
        }
      }
    }

    // Update lines geometry
    if (linesRef.current) {
      linesRef.current.geometry.setAttribute(
        'position',
        new THREE.Float32BufferAttribute(linePositions, 3)
      )
      linesRef.current.geometry.setAttribute(
        'color',
        new THREE.Float32BufferAttribute(lineColors, 4)
      )
    }
  })

  return (
    <group>
      {/* Particles */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particleCount}
            array={particles.positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-size"
            count={particleCount}
            array={particleSizes.current}
            itemSize={1}
          />
        </bufferGeometry>
        <shaderMaterial
          vertexShader={`
            attribute float size;
            varying vec3 vColor;

            void main() {
              vColor = vec3(1.0);
              vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
              gl_PointSize = size * 15.0 * (300.0 / -mvPosition.z);
              gl_Position = projectionMatrix * mvPosition;
            }
          `}
          fragmentShader={`
            varying vec3 vColor;

            void main() {
              float dist = length(gl_PointCoord - vec2(0.5));
              if (dist > 0.5) discard;

              float alpha = 1.0 - (dist * 2.0);
              alpha = pow(alpha, 2.0);

              gl_FragColor = vec4(vColor, alpha * 0.8);
            }
          `}
          transparent={true}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {/* Connection Lines */}
      <lineSegments ref={linesRef}>
        <bufferGeometry />
        <lineBasicMaterial
          vertexColors
          transparent
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>
    </group>
  )
}

// Camera setup
function CameraController() {
  const { camera } = useThree()

  useEffect(() => {
    camera.position.set(0, 0, 5)
  }, [camera])

  return null
}

// Main Background Component
export default function Background3D() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragVelocity, setDragVelocity] = useState({ x: 0, y: 0 })
  const lastMousePos = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseDown = () => {
      setIsDragging(true)
    }

    const handleMouseUp = () => {
      setIsDragging(false)
      setDragVelocity({ x: 0, y: 0 })
    }

    const handleMouseMove = (event) => {
      // Normalize mouse position to -1 to 1 range
      const newX = (event.clientX / window.innerWidth) * 2 - 1
      const newY = -(event.clientY / window.innerHeight) * 2 + 1

      setMousePosition({ x: newX, y: newY })

      // Calculate drag velocity
      if (isDragging) {
        const dx = newX - lastMousePos.current.x
        const dy = newY - lastMousePos.current.y
        setDragVelocity({ x: dx, y: dy })
      }

      lastMousePos.current = { x: newX, y: newY }
    }

    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)
    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [isDragging])

  return (
    <div className="fixed inset-0 z-0" style={{ background: '#000000' }}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: 'high-performance',
        }}
      >
        {/* Pure black background */}
        <color attach="background" args={['#000000']} />

        {/* Ambient light for subtle illumination */}
        <ambientLight intensity={0.1} />

        {/* Main constellation particles with bounce effect */}
        <ConstellationParticles
          mousePosition={mousePosition}
          isDragging={isDragging}
          dragVelocity={dragVelocity}
        />

        {/* Camera controller */}
        <CameraController />
      </Canvas>
    </div>
  )
}
