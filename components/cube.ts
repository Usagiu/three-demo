import { BoxGeometry, Mesh, MeshStandardMaterial } from 'three';
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

  const geometry = new BoxGeometry(2, 2, 2);

  const material = new MeshStandardMaterial({ color: "orchid" });

  const cube = new Mesh(geometry, material);

  cube.rotation.set(-0.5, -0.1, 0.8);

  return cube;
}

export { createCube };