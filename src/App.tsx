// import Scene from "./components/Scene"

// function App() {
//   return (
//     <Scene></Scene>
//   )
// }

// export default App

import * as THREE from 'three'
import { useRef, useState, useMemo } from 'react'
import { Canvas, useFrame, createPortal, extend } from '@react-three/fiber'
import { useFBO, PerspectiveCamera, OrbitControls } from '@react-three/drei'

function TextureScene() {
  const mesh = useRef()
  useFrame(() => {
    mesh.current.rotation.x = mesh.current.rotation.y = mesh.current.rotation.z += 0.01
  })
  return (
    <mesh ref={mesh}>
      <boxGeometry />
      <meshNormalMaterial />
    </mesh>
  )
}
const FBOScene = ({ props }) => {
  const target = useFBO(props)
  const cam = useRef()
  const scene = useMemo(() => {
    const scene = new THREE.Scene()
    scene.background = new THREE.Color()
    return scene
  }, [])

  useFrame((state) => {
    cam.current.position.z = 5 + Math.sin(state.clock.getElapsedTime() * 1.5) * 2
    state.gl.setRenderTarget(target)
    state.gl.render(scene, cam.current)
    state.gl.setRenderTarget(null)
  })

  return (
    <>
      <PerspectiveCamera ref={cam} position={[0, 0, 3]} />
      {createPortal(<TextureScene />, scene)}
      <mesh>
        <planeGeometry args={[2, 2]} />
        <meshBasicMaterial map={target.texture} />
      </mesh>
    </>
  )
}

export default function App() {
  return (
    <Canvas>
      <OrbitControls />
      <FBOScene multisample samples={8} stencilBuffer={false} format={THREE.RGBFormat} />
    </Canvas>
  )
}
