
export function Ground() {
    return (
        <>
            <mesh receiveShadow position={[0, -3.04, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[200, 200, 1, 1]} />
                <shadowMaterial opacity={0.4} />
            </mesh>
            <mesh position={[0, -3.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[100, 100, 1, 1]} />
                <meshBasicMaterial color={'#427062'} />
            </mesh>
        </>
    )
}