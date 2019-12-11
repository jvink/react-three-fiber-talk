import React, { useRef, Suspense, useState } from 'react';
import { Canvas, useThree, useLoader, useRender, extend, useFrame } from 'react-three-fiber';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

extend({ OrbitControls })
const Controls = props => {
    const { gl, camera } = useThree();
    const ref = useRef();
    useRender(() => ref.current.update());
    return <orbitControls ref={ref} args={[camera, gl.domElement]} {...props} />;
};

function Truck(props) {
    const gltf = useLoader(GLTFLoader, "/cyber/scene.gltf");
    return <primitive object={gltf.scene} {...props} />;
}

function Ship(props) {
    const gltf = useLoader(GLTFLoader, "/ship/scene.glb");
    return <primitive object={gltf.scene} {...props} />;
}

function Light() {
    return <spotLight position={[5, 5, 5]} intensity={3} />;
}

function Box(props) {
    return (
        <mesh {...props}>
            <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
            <meshStandardMaterial attach="material" {...props} />
        </mesh>
    )
}

function MetalBall({ position, setHit }) {
    const [touched, setTouched] = useState(false);
    const ref = useRef();
    useFrame(() => {
        if (touched) {
            if (Math.round(ref.current.position.z) !== 0) {
                ref.current.position.z -= 0.1;
            } else {
                setHit(true);
            }
        }
    });
    return (
        <mesh ref={ref} castShadow receiveShadow position={position} onClick={() => setTouched(true)}>
            <sphereBufferGeometry attach="geometry" args={[0.1, 8, 8]} />
            <meshStandardMaterial attach="material" />
        </mesh>
    );
}

export default () => {
    const truckPosition = [0, 0, 0];
    const shipPosition = [0, 0, 5];

    return (
        <Canvas
            camera={{ position: [8, 3, 5] }}>
            <Controls />
            <Light />
            <MetalBall position={[0.4, 0.3, 8]} />
            <Suspense fallback={<Box color="red" position={truckPosition} />}>{<Truck position={truckPosition} />}</Suspense>
            <Suspense fallback={<Box color="blue" position={shipPosition} />}>{<Ship position={shipPosition} />}</Suspense>
        </Canvas >
    );
}