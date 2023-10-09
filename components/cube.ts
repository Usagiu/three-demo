import { BufferGeometry, Mesh, MeshBasicMaterial } from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

function createCube() {
  const loader = new GLTFLoader();
  const scale = 15  //比例
  let cube;

  loader.load('https://warpengine-open.oss-cn-shanghai.aliyuncs.com/jinmingtest/ship_in_clouds.glb', (glb) => {
    cube = glb.scene;
    cube.scale.set(scale, scale, scale)
    cube.position.set(0,0,23)
    }, undefined, (error) => {
      console.error(error);
    })

  return cube;
}

export { createCube };