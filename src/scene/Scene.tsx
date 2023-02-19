import {  useRef } from "react";
import { CameraHelper, Color, OrthographicCamera } from "three";
import { Trees } from "./Trees";
import { useHelper } from '@react-three/drei'
import { Capybara } from "./Capybara";

export function Scene() {
    const ref = useRef<OrthographicCamera>(null!);
    useHelper(ref, CameraHelper)


    return (<>
        <ambientLight intensity={0.1} />
        <directionalLight
            color="white"
            position={[15, 15, 15]}
            castShadow
            shadow-mapSize={[2048,2048]}
        >
            <orthographicCamera ref={ref} attach="shadow-camera" args={[-50,50,50, -50]}/>
        </directionalLight>
        <Trees
            position={[0,0, -4]}
            colors={[
                    new Color('#427062').convertLinearToSRGB(),
                    new Color('#33594e').convertLinearToSRGB(),
                    new Color('#234549').convertLinearToSRGB(),
                    new Color('#1e363f').convertLinearToSRGB()
            ]}
        />
        <Trees
            position={[0,0, 4]}
            colors={[
                    new Color('#F7B06F').convertLinearToSRGB(),
                    new Color('#F58925').convertLinearToSRGB(),
                    new Color('#C26D1D').convertLinearToSRGB(),
                    new Color('#754212').convertLinearToSRGB()
            ]}
        />
        <Capybara position={[8 ,0, -4]}/>
        <Trees
            position={[8 ,0, 4]}
            colors={[
                    new Color('#ffe7de').convertLinearToSRGB(),
                    new Color('#fcd1d7').convertLinearToSRGB(),
                    new Color('#e9b1cd').convertLinearToSRGB(),
                    new Color('#c3829e').convertLinearToSRGB()
            ]}
        />
    </>)
}