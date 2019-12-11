import React from 'react';
import { Canvas } from 'react-three-fiber';

export default () => {
    return (
        <Canvas>
            <mesh>
                <meshBasicMaterial attach="material" color="#bc002d" />
                <sphereBufferGeometry attach="geometry" args={[2, 32, 32]} />
            </mesh>
        </Canvas>
    );
};