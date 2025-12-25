import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

function EarthSphere({ scrollProgress }) {
  const meshRef = useRef()
  const particlesRef = useRef()

  // 지구 주변 입자들 생성
  const particles = useMemo(() => {
    const temp = []
    for (let i = 0; i < 1000; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.random() * Math.PI
      const radius = 3 + Math.random() * 2

      temp.push({
        position: [
          radius * Math.sin(phi) * Math.cos(theta),
          radius * Math.sin(phi) * Math.sin(theta),
          radius * Math.cos(phi),
        ],
        scale: Math.random() * 0.5 + 0.2,
      })
    }
    return temp
  }, [])

  useFrame((state) => {
    const time = state.clock.getElapsedTime()

    if (meshRef.current) {
      // 지구 회전
      meshRef.current.rotation.y = time * 0.1
      meshRef.current.rotation.x = Math.sin(time * 0.1) * 0.1

      // 스크롤에 따른 Y축 이동
      meshRef.current.position.y = scrollProgress * -5
    }

    if (particlesRef.current) {
      particlesRef.current.rotation.y = time * 0.05
      particlesRef.current.rotation.x = time * 0.02
    }
  })

  return (
    <group>
      {/* 메인 지구 */}
      <Sphere ref={meshRef} args={[2.5, 64, 64]} position={[0, 0, 0]}>
        <MeshDistortMaterial
          color="#1a1a1a"
          attach="material"
          distort={0.3}
          speed={1.5}
          roughness={0.4}
          metalness={0.8}
        />
      </Sphere>

      {/* 외부 링 효과 */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[3.5, 0.02, 16, 100]} />
        <meshBasicMaterial color="#404040" transparent opacity={0.3} />
      </mesh>

      <mesh rotation={[Math.PI / 2, 0, Math.PI / 4]}>
        <torusGeometry args={[3.8, 0.015, 16, 100]} />
        <meshBasicMaterial color="#303030" transparent opacity={0.2} />
      </mesh>

      {/* 주변 입자들 */}
      <group ref={particlesRef}>
        {particles.map((particle, i) => (
          <mesh key={i} position={particle.position} scale={particle.scale}>
            <sphereGeometry args={[0.02, 8, 8]} />
            <meshBasicMaterial color="#ffffff" transparent opacity={0.6} />
          </mesh>
        ))}
      </group>

      {/* 주변 빛나는 구체들 */}
      <mesh position={[4, 1, -2]}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>

      <mesh position={[-3.5, -1, 1]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshBasicMaterial color="#cccccc" />
      </mesh>

      <mesh position={[2, -2, 3]}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshBasicMaterial color="#999999" />
      </mesh>
    </group>
  )
}

export default function Earth3D({ scrollProgress = 0 }) {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#404040" />
        <EarthSphere scrollProgress={scrollProgress} />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </div>
  )
}
