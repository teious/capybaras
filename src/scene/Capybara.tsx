import { useGLTF } from "@react-three/drei";
import { GroupProps } from "@react-three/fiber";
import { useMemo } from "react";
import { Color, Mesh, Vector3 } from "three";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";
import { GhibliShader } from "../shaders/GhibliShader";

type CapybaraGLTFResult = GLTF & {
    nodes: {
        Capybara: Mesh
    }
}
export function Capybara(props: GroupProps){
    const { nodes }= useGLTF("/models/capybara.glb")  as CapybaraGLTFResult;
    const uniforms = useMemo(()=>{
        return {
            colorMap: {
                value: [
                    new Color('#F0B960').convertLinearToSRGB(),
                    new Color('#BA7A13').convertLinearToSRGB(),
                    new Color('#734C0D').convertLinearToSRGB(),
                    new Color('#734C0D').convertLinearToSRGB()
                ]
            },
            brightnessThresholds: {
                value: [ 0.9, 0.35, 0.001],
            },
            lightPosition: {
                value: new Vector3(15,15,15)
            }
    }},[])

    return   <group {...props} dispose={null}>
    <mesh
        castShadow
        receiveShadow
        geometry={nodes.Capybara.geometry}
        scale={0.5}
        position={[0.33, -1.5, -0.68]}
        >
            <shaderMaterial {...GhibliShader} uniforms={uniforms}/>
    </mesh>
</group>
}

useGLTF.preload("/models/capybara.glb");
