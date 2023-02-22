import { useMemo } from "react";
import {  BackSide, Color, Shader } from "three";
const vertexShader = `
uniform float outline;
void main() {
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position + normal * outline, 1.0);
}
`;

const fragmentShader = `
uniform vec3 color;
uniform float opacity;
void main() {
  gl_FragColor = vec4(color, opacity);
}
`;


export const OutlineShader: Shader = {
    uniforms: {
        color: { value: new Color("#000000") },
        opacity: { value: 1.0 },
        outline: { value: 0.05 }
      },
      vertexShader,
      fragmentShader,
}


export const OutlineMaterial = ()=> {

    const onBeforeCompile = useMemo(()=>{
      return (shader: Shader) => {
        const token = '#include <begin_vertex>'
        const customTransform = `
            vec3 transformed = position + objectNormal*0.02;
        `
        shader.vertexShader = 
            shader.vertexShader.replace(token,customTransform)
    }
    },[])

    return <shaderMaterial {...OutlineShader} onBeforeCompile={onBeforeCompile} side={BackSide}>

    </shaderMaterial>
}