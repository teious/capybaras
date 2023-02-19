// Set the precision for data types used in this GhibliShader
precision highp float;
precision highp int;

varying vec3 vNormal;
varying vec3 vPosition;


void main(){
    vNormal = normal;
    vPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}