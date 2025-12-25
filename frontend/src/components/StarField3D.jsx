import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// Star Constellation Component
function StarConstellation() {
  const starsRef = useRef()
  const linesRef = useRef()
  const starCount = 300
  const connectionDistance = 1.2

  // Boundary settings
  const boundaryX = 10  // Half width
  const boundaryY = 6   // Half height
  const boundaryZ = 5   // Half depth

  // Initialize stars
  const stars = useMemo(() => {
    const positions = new Float32Array(starCount * 3)
    const velocities = new Float32Array(starCount * 3)
    const originalPositions = new Float32Array(starCount * 3)
    const randomSeeds = new Float32Array(starCount * 3)

    for (let i = 0; i < starCount; i++) {
      const i3 = i * 3

      // Spread stars across the view
      positions[i3] = (Math.random() - 0.5) * 20
      positions[i3 + 1] = (Math.random() - 0.5) * 12
      positions[i3 + 2] = (Math.random() - 0.5) * 10

      // Store original positions
      originalPositions[i3] = positions[i3]
      originalPositions[i3 + 1] = positions[i3 + 1]
      originalPositions[i3 + 2] = positions[i3 + 2]

      // Random velocity for irregular movement
      velocities[i3] = (Math.random() - 0.5) * 0.01
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.01
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.006

      // Random seeds for perlin-like noise
      randomSeeds[i3] = Math.random() * 1000
      randomSeeds[i3 + 1] = Math.random() * 1000
      randomSeeds[i3 + 2] = Math.random() * 1000
    }

    return { positions, velocities, originalPositions, randomSeeds }
  }, [])

  // Animation loop
  useFrame((state) => {
    if (!starsRef.current) return

    const positions = starsRef.current.geometry.attributes.position.array
    const time = state.clock.getElapsedTime()

    // Update star positions
    for (let i = 0; i < starCount; i++) {
      const i3 = i * 3

      // IRREGULAR MOVEMENT - Perlin-like noise
      const noiseX = Math.sin(time * 0.3 + stars.randomSeeds[i3]) * 0.003
      const noiseY = Math.sin(time * 0.4 + stars.randomSeeds[i3 + 1]) * 0.003
      const noiseZ = Math.sin(time * 0.2 + stars.randomSeeds[i3 + 2]) * 0.002

      // Apply movement with noise and velocity
      positions[i3] += noiseX + stars.velocities[i3]
      positions[i3 + 1] += noiseY + stars.velocities[i3 + 1]
      positions[i3 + 2] += noiseZ + stars.velocities[i3 + 2]

      // Occasionally change velocity for more chaotic movement
      if (Math.random() < 0.01) {
        stars.velocities[i3] = (Math.random() - 0.5) * 0.01
        stars.velocities[i3 + 1] = (Math.random() - 0.5) * 0.01
        stars.velocities[i3 + 2] = (Math.random() - 0.5) * 0.006
      }

      // BOUNDARY BOUNCE - 경계에 닿았을 때만 튕김
      const bounceStrength = 0.8 // 튕김 강도

      // X 축 경계 체크
      if (positions[i3] > boundaryX) {
        positions[i3] = boundaryX
        stars.velocities[i3] = -Math.abs(stars.velocities[i3]) * bounceStrength
        // 랜덤 추가 속도로 튕김 효과
        stars.velocities[i3] -= Math.random() * 0.02
      } else if (positions[i3] < -boundaryX) {
        positions[i3] = -boundaryX
        stars.velocities[i3] = Math.abs(stars.velocities[i3]) * bounceStrength
        stars.velocities[i3] += Math.random() * 0.02
      }

      // Y 축 경계 체크
      if (positions[i3 + 1] > boundaryY) {
        positions[i3 + 1] = boundaryY
        stars.velocities[i3 + 1] = -Math.abs(stars.velocities[i3 + 1]) * bounceStrength
        stars.velocities[i3 + 1] -= Math.random() * 0.02
      } else if (positions[i3 + 1] < -boundaryY) {
        positions[i3 + 1] = -boundaryY
        stars.velocities[i3 + 1] = Math.abs(stars.velocities[i3 + 1]) * bounceStrength
        stars.velocities[i3 + 1] += Math.random() * 0.02
      }

      // Z 축 경계 체크
      if (positions[i3 + 2] > boundaryZ) {
        positions[i3 + 2] = boundaryZ
        stars.velocities[i3 + 2] = -Math.abs(stars.velocities[i3 + 2]) * bounceStrength
        stars.velocities[i3 + 2] -= Math.random() * 0.01
      } else if (positions[i3 + 2] < -boundaryZ) {
        positions[i3 + 2] = -boundaryZ
        stars.velocities[i3 + 2] = Math.abs(stars.velocities[i3 + 2]) * bounceStrength
        stars.velocities[i3 + 2] += Math.random() * 0.01
      }

      // 속도 감쇠 (공기 저항처럼)
      stars.velocities[i3] *= 0.99
      stars.velocities[i3 + 1] *= 0.99
      stars.velocities[i3 + 2] *= 0.99
    }

    starsRef.current.geometry.attributes.position.needsUpdate = true

    // Draw constellation lines
    const linePositions = []
    const lineOpacities = []

    for (let i = 0; i < starCount; i++) {
      for (let j = i + 1; j < starCount; j++) {
        const i3 = i * 3
        const j3 = j * 3

        const dx = positions[i3] - positions[j3]
        const dy = positions[i3 + 1] - positions[j3 + 1]
        const dz = positions[i3 + 2] - positions[j3 + 2]
        const distance = Math.sqrt(dx * dx + dy * dy + dz * dz)

        if (distance < connectionDistance) {
          linePositions.push(
            positions[i3], positions[i3 + 1], positions[i3 + 2],
            positions[j3], positions[j3 + 1], positions[j3 + 2]
          )

          const opacity = (1 - distance / connectionDistance) * 0.4
          lineOpacities.push(opacity, opacity)
        }
      }
    }

    // Update lines
    if (linesRef.current && linePositions.length > 0) {
      linesRef.current.geometry.setAttribute(
        'position',
        new THREE.Float32BufferAttribute(linePositions, 3)
      )
      linesRef.current.geometry.setAttribute(
        'opacity',
        new THREE.Float32BufferAttribute(lineOpacities, 1)
      )
    }
  })

  return (
    <group>
      {/* Stars */}
      <points ref={starsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={starCount}
            array={stars.positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.05}
          color="#ffffff"
          transparent
          opacity={0.9}
          sizeAttenuation={true}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {/* Constellation Lines */}
      <lineSegments ref={linesRef}>
        <bufferGeometry />
        <shaderMaterial
          vertexShader={`
            attribute float opacity;
            varying float vOpacity;

            void main() {
              vOpacity = opacity;
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
          `}
          fragmentShader={`
            varying float vOpacity;

            void main() {
              gl_FragColor = vec4(0.5, 0.8, 1.0, vOpacity);
            }
          `}
          transparent={true}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>
    </group>
  )
}

// Main StarField Component
export default function StarField3D() {
  return (
    <div className="fixed inset-0 z-0" style={{ background: '#000000' }}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 75 }}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: 'high-performance',
        }}
      >
        <color attach="background" args={['#000000']} />
        <StarConstellation />
      </Canvas>
    </div>
  )
}
