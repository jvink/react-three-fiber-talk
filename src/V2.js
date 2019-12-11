import React, { useRef, Suspense } from 'react';
import { Canvas, useThree, useLoader, useRender, extend } from 'react-three-fiber';
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
  return <spotLight position={[5, 5, 5]} intensity={2} penumbra={1} />;
}

function Box(props) {
  return (
    <mesh {...props}>
      <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
      <meshStandardMaterial attach="material" {...props} />
    </mesh>
  )
}

export default () => {
  const truckPosition = [0, 0, 0];
  const shipPosition = [0, 0, 5];
  return (
    <Canvas
      camera={{ position: [8, 3, 5] }}>
      <Controls />
      <Light />
      <Suspense fallback={<Box color="red" position={truckPosition} />}>{<Truck position={truckPosition} />}</Suspense>
      <Suspense fallback={<Box color="blue" position={shipPosition} />}>{<Ship position={shipPosition} />}</Suspense>
    </Canvas >
  );
}