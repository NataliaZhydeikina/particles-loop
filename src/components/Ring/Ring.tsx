import { useFrame, useThree, createPortal } from "@react-three/fiber";
import fragmentShader from "./shaders/fragment.frag";
import vertexShader from "./shaders/vertex.vert";
import { useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { MeshTransmissionMaterial, PerspectiveCamera, TorusKnot, useAspect, useFBO, useHelper } from "@react-three/drei";

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
interface Props {
  multisample: true;
  samples: number; 
  stencilBuffer: boolean;
   format: typeof THREE.RGBAFormat
}

const Ring = ({props}: any) => {
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

  const light = useRef()
  useHelper(light, THREE.SpotLightHelper, 'cyan')

  return (
    <>
      <PerspectiveCamera ref={cam} position={[0, 0, 3]} />
      {/* {createPortal(<TextureScene />, scene)}
      <mesh>
        <planeGeometry args={[2, 2]} />
        <meshBasicMaterial map={target.texture} />
      </mesh> */}
      <mesh>
        <boxGeometry />
        <meshStandardMaterial color={0x00ff00} />
      </mesh>
      <spotLight position={[ 5,5,0]} visible angle={0.6} intensity={150} penumbra={0.5} color={[1,.24,.7]} ref={light} />
     
    </>
  )
}
export default Ring;