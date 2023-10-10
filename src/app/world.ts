import { createCamera } from '../../components/camera';
import { createCube } from '../../components/cube';
import { createLights } from '../../components/light';
import { createScene } from '../../components/scene';
import { Loop } from '../../system/Loop';
import { createRenderer } from '../../system/render';
import { Resizer } from '../../system/Resizer';

let camera: any;
let renderer: any;
let scene: any;
let loop: any;

class World {
  constructor(container: any) {
    camera = createCamera();
    scene = createScene();
    renderer = createRenderer();
    loop = new Loop(camera, scene, renderer)
    container.append(renderer.domElement);

    const cube = createCube();
    const light = createLights();

    loop.updatables.push(cube)

    scene.add(cube, light);

    const resizer = new Resizer(container, camera, renderer);
  }

  render() {
    renderer.render(scene, camera);
  }

  start() {
    loop.start();
  }
  
  stop() {
    loop.stop();
  }
}

export { World };
