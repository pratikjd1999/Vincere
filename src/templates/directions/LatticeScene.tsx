import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import type { Group } from 'three'
import { services } from '../../content/company'

/**
 * WebGL scene for direction 17. Loaded only after a WebGL support check passes,
 * so this module (and three.js with it) never downloads on unsupported devices.
 */
function Lattice({ spin }: { spin: boolean }) {
  const group = useRef<Group>(null)

  // One node per service area, distributed on a sphere with the golden angle.
  const nodes = useMemo(() => {
    const count = services.length
    const golden = Math.PI * (3 - Math.sqrt(5))
    return Array.from({ length: count }, (_, i) => {
      const y = 1 - (i / (count - 1)) * 2
      const radius = Math.sqrt(Math.max(0, 1 - y * y))
      const theta = golden * i
      return [Math.cos(theta) * radius * 2.2, y * 2.2, Math.sin(theta) * radius * 2.2] as const
    })
  }, [])

  useFrame((_, delta) => {
    if (spin && group.current) {
      group.current.rotation.y += delta * 0.16
      group.current.rotation.x += delta * 0.05
    }
  })

  return (
    <group ref={group}>
      <mesh>
        <icosahedronGeometry args={[2.2, 1]} />
        <meshBasicMaterial color="#38bdf8" wireframe transparent opacity={0.28} />
      </mesh>
      {nodes.map((position, index) => (
        <mesh key={index} position={[position[0], position[1], position[2]]}>
          <sphereGeometry args={[0.085, 16, 16]} />
          <meshStandardMaterial
            color={index % 3 === 0 ? '#a78bfa' : '#38bdf8'}
            emissive={index % 3 === 0 ? '#7c3aed' : '#0ea5e9'}
            emissiveIntensity={0.7}
          />
        </mesh>
      ))}
    </group>
  )
}

export default function LatticeScene({ spin }: { spin: boolean }) {
  return (
    <Canvas
      // Cap DPR so the scene stays cheap on high-density mobile screens.
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 6.4], fov: 45 }}
      gl={{ antialias: true, powerPreference: 'low-power' }}
      // Render on demand when motion is off: one frame, then idle.
      frameloop={spin ? 'always' : 'demand'}
    >
      <ambientLight intensity={0.65} />
      <pointLight position={[6, 6, 6]} intensity={90} color="#a78bfa" />
      <pointLight position={[-6, -4, 2]} intensity={60} color="#38bdf8" />
      <Lattice spin={spin} />
    </Canvas>
  )
}
