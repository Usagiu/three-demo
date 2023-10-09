import { createCamera } from '../../components/camera';
import { createCube } from '../../components/cube';
import { createLights } from '../../components/light';
import { createScene } from '../../components/scene';

import { createRenderer } from '../../system/render';
import { Resizer } from '../../system/Resizer';

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
    const light = createLights();

    scene.add(cube, light);

    const resizer = new Resizer(container, camera, renderer);

    // resizer.onResize = () => {
    //   this.render();
    // };
  }

  render() {
    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();
    // renderer.render(scene, camera);
  }
}

export { World };
