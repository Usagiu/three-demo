import { createCamera } from '../../components/camera.js';
import { createCube } from '../../components/cube.js';
import { createScene } from '../../components/scene.js';

import { createRenderer } from '../../system/render.js';
import { Resizer } from '../../system/Resizer.js';

// These variables are module-scoped: we cannot access them
// from outside the module
let camera: any;
let renderer: any;
let scene: any;

class World {
  constructor(container: any) {
    camera = createCamera();
    scene = createScene();
    renderer = createRenderer();
    container.append(renderer.domElement);

    const cube = createCube();

    scene.add(cube);

    const resizer = new Resizer(container, camera, renderer);
  }

  render() {
    renderer.render(scene, camera);
  }
}

export { World };
