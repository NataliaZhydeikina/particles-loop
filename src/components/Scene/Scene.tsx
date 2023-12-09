import { Canvas, useFrame } from "@react-three/fiber";
import fragmentShader from "./shaders/fragment.frag";
import vertexShader from "./shaders/vertex.vert";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { OrbitControls, PerspectiveCamera, useFBO } from "@react-three/drei";
import { createPortal } from "react-dom";

export default function Scene () {

    const data = useMemo(
        () => ({
          uniforms: {},
          side: THREE.DoubleSide,
          blending: THREE.AdditiveBlending,
          fragmentShader,
          vertexShader
        }),
        []
    );
    const target = useFBO();
    const cam = useRef();
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
    return <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        {/* <mesh position={[-1.2, 0, 0]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={'hotpink'} />
        </mesh>
        <mesh position={[1.2, 0, 0]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={'hotpink'} />
        </mesh> */}
        <PerspectiveCamera ref={cam} position={[0, 0, 3]} />
        {createPortal(<><mesh>
            <planeGeometry args={[1.0, 1.0]} />
            <shaderMaterial attach="material" {...data}/>
        </mesh></>, scene)}
        <mesh>
            <planeGeometry args={[1.0, 1.0]} />
            <shaderMaterial attach="material" {...data}/>
        </mesh>
        <OrbitControls makeDefault />
    </Canvas>;
}