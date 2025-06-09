import { useEffect, useRef } from "react";
import ThreeGlobe from "three-globe";
import * as THREE from "three";
import json from "./globe.json";
import { Canvas, useFrame } from "react-three-fiber";
import { OrbitControls } from "@react-three/drei";
import  "./App.css";

const Globe = new ThreeGlobe()
  .hexPolygonsData(json.features)
  .hexPolygonResolution(3)
  .hexPolygonMargin(0.4)
  .hexPolygonColor(() => "#3d3d3d")
  .showAtmosphere(false);

const Box = () => {
  const boxRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (boxRef.current) {
      boxRef.current.rotation.x += 0.006;
      boxRef.current.rotation.y -= 0.006;
    }
    // console.log(boxRef.current.rotation.x, boxRef.current.rotation.y)
  });

  const scale_g = 0.024;

  return (
    <mesh ref={boxRef}>
      {/* <boxBufferGeometry args={[2, 2, 2]} /> */}
      <primitive
        object={Globe}
        position={[0, 0, 0]}
        scale={[scale_g, scale_g, scale_g]}
      />
    </mesh>
  );
};

const globeMaterial = Globe.globeMaterial() as THREE.MeshPhongMaterial;

globeMaterial.specular = new THREE.Color("#6d6d6d");
globeMaterial.shininess = 0;
globeMaterial.color = new THREE.Color("#FFF");

export default () => (
  <div className="flex justify-center items-center w-screen h-screen mx-auto bg-white">
    <div className="" style={{ width: "100%", height: "100%", backgroundColor: "#FFFFFF" }}>
      <Canvas>
        <ambientLight color="#FFF" intensity={11.2} />
        {/* <OrbitControls /> */}
        <Box />
      </Canvas>
    </div>
  </div>
);
