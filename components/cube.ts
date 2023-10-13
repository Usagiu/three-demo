import { BoxGeometry, Mesh, MeshStandardMaterial, MathUtils, SphereGeometry } from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const createCube = () => {
  // const loader = new GLTFLoader();
  // const scale = 15  //比例
  // let cube;

  // loader.load('https://warpengine-open.oss-cn-shanghai.aliyuncs.com/jinmingtest/ship_in_clouds.glb', (glb) => {
  //   cube = glb.scene;
  //   cube.scale.set(scale, scale, scale)
  //   cube.position.set(0,0,23)
  //   }, undefined, (error) => {
  //     console.error("xx",error);
  //   })

  const radius = 0.25;
  const widthSegments = 16;
  const heightSegments = 16;

  const geometry = new SphereGeometry(
    radius,
    widthSegments,
    heightSegments
  );

  const material = new MeshStandardMaterial({ color: "orchid" });

  const cube = new Mesh(geometry, material);

  cube.rotation.set(-0.5, -0.1, 0.8);

  const radiansPerSecond = MathUtils.degToRad(30);

  cube.tick = (delta: any) => {
    cube.rotation.z += radiansPerSecond * delta
    cube.rotation.x += radiansPerSecond * delta
    cube.rotation.y += radiansPerSecond * delta
  };

  return cube;
}

export { createCube };