import { useGLTF } from "@react-three/drei";
import { GroupProps,} from '@react-three/fiber'
import { ForwardedRef, forwardRef, useMemo } from "react";
import { Color, Group, Mesh, MeshStandardMaterial, Vector3 } from "three";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";
import { GhibliShader } from "../shaders/GhibliShader";

type TreeGLTFResult = GLTF & {
    nodes: {
        Foliage: Mesh
    };
    materials: {
        ["Stylized Foliage"]: MeshStandardMaterial
    }
}

type TreesPalette = [Color, Color, Color, Color]
type TreesProps = GroupProps & { colors: TreesPalette};

export const Trees = forwardRef((props:TreesProps, ref: ForwardedRef<Group>) => {
    const { nodes } = useGLTF("/models/trees.glb") as TreeGLTFResult;

    const uniforms = useMemo(()=>{
        return {
            colorMap: {
                value: props.colors
            },
            brightnessThresholds: {
                value: [ 0.9, 0.35, 0.001],
            },
            lightPosition: {
                value: new Vector3(15,15,15)
            }
    }},[props.colors])
    return (
        <group ref={ref} {...props} dispose={null}>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Foliage.geometry}
                position={[0.33, -0.05, -0.68]}
            >
                <shaderMaterial attach={'material'} {...GhibliShader} uniforms={uniforms} />
            </mesh>
        </group>
    );
}
)
useGLTF.preload("/models/trees.glb");
