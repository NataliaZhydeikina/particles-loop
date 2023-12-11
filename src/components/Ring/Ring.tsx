import { useFrame, useThree } from "@react-three/fiber";
import fragmentShader from "./shaders/fragment.frag";
import vertexShader from "./shaders/vertex.vert";
import { useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { MeshTransmissionMaterial, PerspectiveCamera, TorusKnot, useAspect, useFBO } from "@react-three/drei";
import { createPortal } from "react-dom";

// function InnerScene(){
//     // const data = useMemo(
//     //     () => ({
//     //       uniforms: {},
//     //       side: THREE.DoubleSide,
//     //       blending: THREE.AdditiveBlending,
//     //       fragmentShader,
//     //       vertexShader
//     //     }),
//     //     []
//     // );
//     // return <mesh>
//     //     <planeGeometry args={[1.0, 1.0]} />
//     //     <shaderMaterial attach="material" {...data}/>
//     // </mesh>;
//     const mesh = useRef<THREE.Mesh>(null!)
//     useFrame(() => {
//       mesh.current.rotation.x = mesh.current.rotation.y = mesh.current.rotation.z += 0.01
//     })
//     return (
//       <TorusKnot ref={mesh} args={[1, 0.4, 100, 64]}>
//         <meshNormalMaterial />
//       </TorusKnot>
//     )
// }

// export default function Ring () {

//     const target = useFBO({
//         stencilBuffer: false,
//         samples:8,
//         format: THREE.RGBAFormat
//     });
//     const cam = useRef();
//     // const scene = useMemo(() => {
//     //     const scene = new THREE.Scene()
//     //     scene.background = new THREE.Color('orange')
//     //     return scene
//     // }, []);
//     const [scene] = useState(() => new THREE.Scene());

//     useFrame((state) => {
//         cam.current.position.z = 5 + Math.sin(state.clock.getElapsedTime() * 1.5) * 2
//         state.gl.setRenderTarget(target)
//         state.gl.render(scene, cam.current)
//         state.gl.setRenderTarget(null)
//       })
//     return <>
//         <PerspectiveCamera makeDefault ref={cam} position={[0, 0, 3]} />
//         {createPortal(<InnerScene/>, scene)}
//         <Box args={[3, 3, 3]}>
//             <meshStandardMaterial map={target.texture} />
//         </Box>
//     </>;
// }

function Boxx(props) {
    const mesh = useRef();
    const [hovered, setHover] = useState(false);
    const [active, setActive] = useState(false);
    useFrame((state, delta) => {
      mesh.current.rotation.x += delta;
    });
  
    return (
      <group>
        <mesh
          {...props}
          ref={mesh}
          scale={active ? 1.5 : 1}
          onClick={(event) => {
            setActive(!active);
          }}
          onPointerOver={(event) => {
            setHover(true);
          }}
          onPointerOut={(event) => setHover(false)}
        >
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
        </mesh>
      </group>
    );
  }
  function Scene2() {
    return (
      <>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <group>
          <Boxx position={[-1.2, 0, 0]} />
          <Boxx position={[1.2, 0, 0]} />
        </group>
      </>
    );
  }
export default function Ring() {
    const fboTexture = useFBO();
    const size = useThree((state) => state.size);
    const scale = useAspect(size.width, size.height, 1);
    const [offScreenScene] = useState(() => new THREE.Scene());
    const cameraRef = useRef(null);
  
    useFrame((state) => {
      state.gl.setRenderTarget(fboTexture);
      state.gl.render(state.scene, state.camera);
      state.gl.setRenderTarget(null);
    });
  
    return (
      <>
    <mesh>
        <torusGeometry args={[10, 3, 32, 256]}/>
      <MeshTransmissionMaterial buffer={fboTexture.texture} distortionScale={0} temporalDistortion={0} />
    </mesh>
    <mesh>
        <sphereGeometry args={[1, 16, 16]} />
      <MeshTransmissionMaterial buffer={fboTexture.texture} distortionScale={0} temporalDistortion={0} />
    </mesh>
      </>
    );
  }