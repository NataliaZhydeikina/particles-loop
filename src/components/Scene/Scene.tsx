import { Canvas, useFrame } from "@react-three/fiber";
import fragmentShader from "./shaders/fragment.frag";
import vertexShader from "./shaders/vertex.vert";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { OrbitControls, PerspectiveCamera, useFBO } from "@react-three/drei";
import Ring from "../Ring";


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
        <Ring multisample samples={8} stencilBuffer={false} format={THREE.RGBAFormat} />
        {/* <mesh>
            <planeGeometry args={[1.0, 1.0]} />
            <shaderMaterial attach="material" {...data}/>
        </mesh> */}
        <OrbitControls makeDefault />
    </Canvas>;
}