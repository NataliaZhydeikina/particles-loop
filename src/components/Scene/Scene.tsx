import { Canvas } from "@react-three/fiber";


export default function Scene () {
    return <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <mesh position={[-1.2, 0, 0]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={'hotpink'} />
        </mesh>
        <mesh position={[1.2, 0, 0]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={'hotpink'} />
        </mesh>
    </Canvas>;
}