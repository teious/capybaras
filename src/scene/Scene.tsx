import { useRef, useState } from "react";
import { useFrame, MeshProps } from '@react-three/fiber';
import { Mesh } from "three";
import { Trees } from "./Trees";


function Box(props: MeshProps) {
    const mesh = useRef<Mesh>(null!)
    const [hovered, setHovered] = useState(false);
    const [active, setActive] = useState(false);

    useFrame((_, delta) => (mesh.current.rotateX(delta)))

    const handleClick = () => setActive(!active);
    const handlePointer = (over: boolean) => () => setHovered(over);

    return <mesh {...props} ref={mesh} scale={active ? 1.5 : 1}
        castShadow
        onClick={handleClick}
        onPointerOver={handlePointer(true)}
        onPointerOut={handlePointer(false)}
    >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
}

export function Scene() {
    return (<>
        <ambientLight intensity={0.1} />
        <directionalLight
            color="white"
            position={[15, 15, 15]}
            castShadow
            shadow-mapSize-height={2048}
            shadow-mapSize-width={2048}
        />
        <Trees />
    </>)
}