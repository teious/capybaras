import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Scene } from './scene/Scene';
import { Ground } from './scene/Ground';
export function FiberContainer() {


    return (
        <Canvas
            camera={{ position: [14.46666, 2.0365, 5.556165], fov: 40, top: 50, bottom: -50, left: -50, right: 50 }}
            shadows>
              <OrbitControls minDistance={1} maxDistance={200}/>
            <Scene />
            <Ground />
        </Canvas>
    )
}