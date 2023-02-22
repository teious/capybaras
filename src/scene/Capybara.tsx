import { useGLTF } from "@react-three/drei";
import { GroupProps } from "@react-three/fiber";
import { ForwardedRef, forwardRef, useMemo } from "react";
import { BackSide, Color, FrontSide, Group, Mesh, Vector3 } from "three";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";
import { GhibliShader } from "../shaders/GhibliShader";
import { OutlineMaterial, OutlineShader } from "../shaders/OutlineShader";

type CapybaraGLTFResult = GLTF & {
    nodes: {
        Capybara: Mesh
    }
}

export const Capybara= forwardRef((props: GroupProps,  ref: ForwardedRef<Group>)=>{
    const { nodes }= useGLTF("/models/cap.glb")  as CapybaraGLTFResult;
    const uniforms = useMemo(()=>{
        return {
            colorMap: {
                value: [
                    new Color('#D39E85').convertLinearToSRGB(),
                    new Color('#9E7258').convertLinearToSRGB(),
                    new Color('#7E5C45').convertLinearToSRGB(),
                    new Color('#2D1900').convertLinearToSRGB()
                ]
            },
            brightnessThresholds: {
                value: [ 0.9, 0.35, 0.001],
            },
            lightPosition: {
                value: new Vector3(15,15,15)
            }
    }},[])
    

    return   <group ref={ref} {...props} dispose={null}>
    <mesh
        castShadow
        receiveShadow
        geometry={nodes.Capybara.geometry}
        scale={0.5}
        position={[0.33, -1.5, -0.68]}
        >
            <shaderMaterial {...GhibliShader} uniforms={uniforms} side={FrontSide}/>
    </mesh>
    <mesh 
        geometry={nodes.Capybara.geometry}
        scale={0.5}
        position={[0.33, -1.5, -0.68]}
        >
        <OutlineMaterial/>
    </mesh>
</group>
})
useGLTF.preload("/models/cap.glb");
