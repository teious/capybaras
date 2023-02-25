import { useAnimations, useGLTF } from "@react-three/drei";
import { GroupProps, useFrame } from "@react-three/fiber";
import { ForwardedRef, forwardRef, useEffect, useMemo, useRef } from "react";
import { AnimationMixer, BackSide, Color, FrontSide, Group, Mesh, SkinnedMesh, Vector3 } from "three";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";
import { GhibliShader } from "../shaders/GhibliShader";
import { OutlineMaterial, OutlineShader } from "../shaders/OutlineShader";

type CapybaraGLTFResult = GLTF & {
    nodes: {
        Capybara: SkinnedMesh;
        [prop: string]: any
    }
}

export const Capybara = forwardRef((props: GroupProps, ref: ForwardedRef<Group>) => {
    const data = useGLTF("/models/cap.glb") as CapybaraGLTFResult;
    const innerRef = useRef()
    const { nodes } = data
    console.log(data)
    const { actions } = useAnimations(nodes.animations, innerRef as any)

    // const { Capybara, } = nodes
    // useEffect(() => {
    //     if (actions) {
    //         actions['Walk']?.play()
    //     }
    // }, [actions]);
    const uniforms = useMemo(() => {
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
                value: [0.9, 0.35, 0.001],
            },
            lightPosition: {
                value: new Vector3(15, 15, 15)
            }
        }
    }, [])


    return <>
        <group ref={innerRef as any} {...props} dispose={null} >
            <skinnedMesh
                castShadow
                receiveShadow
                geometry={nodes.Capybara.geometry}
                skeleton={nodes.Capybara.skeleton}

            >
                <shaderMaterial {...GhibliShader} uniforms={uniforms} side={FrontSide} />
            </skinnedMesh>
            <mesh
                geometry={nodes.Capybara.geometry}
            >
                <OutlineMaterial />
            </mesh>
        </group>
    </>
})
useGLTF.preload("/models/cap.glb");
