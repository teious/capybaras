import { useGLTF } from "@react-three/drei";
import { GroupProps } from '@react-three/fiber'
import { Color, Mesh, MeshStandardMaterial } from "three";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";


type GLTFResult = GLTF & {
    nodes: {
        Foliage: Mesh
    };
    materials: {
        ["Stylized Foliage"]: MeshStandardMaterial
    }
}
export function Trees(props: GroupProps) {
    const { nodes, materials } = useGLTF("/models/trees.glb") as GLTFResult;
    return (
        <group {...props} dispose={null}>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Foliage.geometry}
                material={materials["Stylized Foliage"]}
                position={[0.33, -0.05, -0.68]}
            >
                <meshToonMaterial color={new Color('#33594e').convertLinearToSRGB()} />
            </mesh>
        </group>
    );
}

useGLTF.preload("/trees.glb");
