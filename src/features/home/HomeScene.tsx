import { useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { ExtrudeGeometry, Shape } from 'three'
import type { Group } from 'three'
import type { RefObject } from 'react'

/**
 * Scroll-driven faceted V sculpture.
 *
 * The V sits behind the entire page and its rotation is bound to document scroll
 * progress: top of page = 0 turns, bottom = TURNS. It never animates on its own — the
 * scrollbar is the only driver, so the page is completely still when the user is.
 *
 * Built as extruded geometry rather than imported art, so there is no external asset
 * and nothing that reads as a supplied logo.
 */

/**
 * Full revolutions between the top and bottom of the page.
 * Held deliberately below a single turn so the movement reads as calm.
 */
const TURNS = 1.05

/** Builds the V outline. `inset` shrinks it for the stacked-slice treatment. */
function veeShape(inset = 0): Shape {
  const shape = new Shape()
  const s = 1 - inset
  shape.moveTo(-1.18 * s, 1.28 * s)
  shape.lineTo(-0.6 * s, 1.28 * s)
  shape.lineTo(0, -0.42 * s)
  shape.lineTo(0.6 * s, 1.28 * s)
  shape.lineTo(1.18 * s, 1.28 * s)
  shape.lineTo(0, -1.3 * s)
  shape.closePath()
  return shape
}

function extrude(shape: Shape, depth: number, bevelSize: number, segments: number) {
  const geometry = new ExtrudeGeometry(shape, {
    depth,
    bevelEnabled: bevelSize > 0,
    bevelThickness: bevelSize * 1.2,
    bevelSize,
    bevelSegments: segments,
    curveSegments: segments,
  })
  geometry.center()
  return geometry
}

function useFacetGeometry() {
  // Heavy bevel + minimal segments reads as a cut crystal.
  return useMemo(() => extrude(veeShape(), 0.6, 0.2, 1), [])
}

type HomeSceneProps = {
  color: string
  lights: readonly [string, string]
  /** Live document scroll progress, 0 at the top and 1 at the bottom. */
  progress: RefObject<number>
  /** False under reduced motion: the V holds a fixed resting angle. */
  rotateOnScroll: boolean
}

function Monolith({ color, progress, rotateOnScroll }: Omit<HomeSceneProps, 'lights'>) {
  const group = useRef<Group>(null)
  const geometry = useFacetGeometry()
  const { viewport } = useThree()

  // Fill the viewport generously — this is a background, not a hero object.
  const scale = Math.min(viewport.width, viewport.height) * 0.38

  useFrame(() => {
    const node = group.current
    if (!node) return

    if (!rotateOnScroll) {
      node.rotation.set(0, -0.42, 0)
      return
    }

    // Ease toward the scroll-derived angle so flicks of the wheel stay fluid.
    const target = progress.current * Math.PI * 2 * TURNS
    node.rotation.y += (target - node.rotation.y) * 0.09
    // A slight lean that opens up as the page advances, adding depth to the turn.
    node.rotation.x += (progress.current * 0.34 - 0.12 - node.rotation.x) * 0.09
  })

  return (
    <group ref={group} scale={scale}>
      <mesh geometry={geometry}>
        <meshStandardMaterial color={color} roughness={0.62} metalness={0.04} flatShading />
      </mesh>
    </group>
  )
}

export default function HomeScene(props: HomeSceneProps) {
  return (
    <Canvas
      dpr={[1, 1.6]}
      camera={{ position: [0, 0, 5.4], fov: 42 }}
      gl={{ antialias: true, powerPreference: 'low-power', alpha: true }}
      // Scroll drives every frame; when motion is reduced one frame is enough.
      frameloop={props.rotateOnScroll ? 'always' : 'demand'}
    >
      <ambientLight intensity={1.2} />
      <directionalLight position={[3, 4, 5]} intensity={1.5} color={props.lights[0]} />
      <directionalLight position={[-4, -1, 2]} intensity={0.9} color={props.lights[1]} />
      <directionalLight position={[0, -3, -4]} intensity={0.5} color="#ffffff" />
      <Monolith {...props} />
    </Canvas>
  )
}
