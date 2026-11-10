import { useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Color, ShaderMaterial } from 'three'

/**
 * WebGL flow field for direction 22. Loaded only after a WebGL probe passes, so
 * three.js never downloads on unsupported or constrained devices.
 *
 * The field reacts to two inputs: pointer position, and which capability row is
 * currently focused (which drives the colour pair).
 */
const VERTEX = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const FRAGMENT = /* glsl */ `
  precision highp float;

  uniform float uTime;
  uniform vec2 uMouse;
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform float uActive;
  uniform float uAspect;
  varying vec2 vUv;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
      u.y
    );
  }

  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    for (int i = 0; i < 5; i++) {
      value += amplitude * noise(p);
      p *= 2.02;
      amplitude *= 0.5;
    }
    return value;
  }

  void main() {
    vec2 uv = vUv;
    vec2 aspectUv = vec2(uv.x * uAspect, uv.y);
    vec2 aspectMouse = vec2(uMouse.x * uAspect, uMouse.y);

    float t = uTime * 0.05;

    // Domain-warped fbm: the field folds into itself rather than simply scrolling.
    vec2 warp = vec2(fbm(aspectUv * 3.0 + t), fbm(aspectUv * 3.0 - t + 5.2));
    float field = fbm(aspectUv * 2.4 + warp * 1.7 + t * 0.6);

    // Pointer bloom, intensified while a capability row is focused.
    float dist = distance(aspectUv, aspectMouse);
    field += (1.0 - smoothstep(0.0, 0.6, dist)) * (0.18 + uActive * 0.3);

    vec3 color = mix(uColorA, uColorB, clamp(field * 1.3, 0.0, 1.0));
    color *= 0.28 + 0.9 * field;

    // Vignette keeps the foreground type legible at the edges.
    color *= 1.0 - 0.55 * length(uv - 0.5);

    gl_FragColor = vec4(color, 1.0);
  }
`

type FieldProps = {
  /** Target colour pair, as hex strings. */
  colors: readonly [string, string]
  /** 0 when idle, 1 when a capability row is focused. */
  active: number
  animate: boolean
}

/** Seeds the uniform block. Values are then owned and mutated by the material. */
function createUniforms(colorA: string, colorB: string) {
  return {
    uTime: { value: 0 },
    uMouse: { value: [0.5, 0.5] as [number, number] },
    uColorA: { value: new Color(colorA) },
    uColorB: { value: new Color(colorB) },
    uActive: { value: 0 },
    uAspect: { value: 1 },
  }
}

function FieldMesh({ colors, active, animate }: FieldProps) {
  const material = useRef<ShaderMaterial>(null)
  const { viewport, size } = useThree()
  const pointer = useRef({ x: 0.5, y: 0.5 })

  // Seeded once; per-frame updates go through the material, which owns these values.
  const initialUniforms = useMemo(() => createUniforms(colors[0], colors[1]), [colors])

  const targetA = useMemo(() => new Color(colors[0]), [colors])
  const targetB = useMemo(() => new Color(colors[1]), [colors])

  useFrame((state, delta) => {
    const uniforms = material.current?.uniforms
    if (!uniforms) return

    if (animate) uniforms.uTime.value += delta

    uniforms.uAspect.value = size.width / Math.max(size.height, 1)

    // react-three-fiber normalises pointer to -1..1; remap to 0..1 for the shader.
    const smoothed = pointer.current
    smoothed.x += (state.pointer.x * 0.5 + 0.5 - smoothed.x) * 0.06
    smoothed.y += (state.pointer.y * 0.5 + 0.5 - smoothed.y) * 0.06
    uniforms.uMouse.value[0] = smoothed.x
    uniforms.uMouse.value[1] = smoothed.y

    uniforms.uActive.value += (active - uniforms.uActive.value) * 0.08
    uniforms.uColorA.value.lerp(targetA, 0.05)
    uniforms.uColorB.value.lerp(targetB, 0.05)
  })

  return (
    <mesh scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        ref={material}
        uniforms={initialUniforms}
        vertexShader={VERTEX}
        fragmentShader={FRAGMENT}
      />
    </mesh>
  )
}

export default function StudioField(props: FieldProps) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 1], fov: 50 }}
      gl={{ antialias: false, powerPreference: 'low-power' }}
      frameloop={props.animate ? 'always' : 'demand'}
    >
      <FieldMesh {...props} />
    </Canvas>
  )
}
