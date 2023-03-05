import { extend, Object3DNode } from '@react-three/fiber'
import { MeshBVH, MeshBVHVisualizer } from 'three-mesh-bvh'
// Create our custom element

// Extend so the reconciler will learn about it
extend({ MeshBVH, MeshBVHVisualizer })

// Add types to ThreeElements elements so primitives pick up on it
declare module '@react-three/fiber' {
  interface ThreeElements {
    meshBVH: Object3DNode<MeshBVH, typeof MeshBVH>,
    meshBVHVisualizer: Object3DNode<MeshBVHVisualizer, typeof MeshBVHVisualizer>
  }
}
