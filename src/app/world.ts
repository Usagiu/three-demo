import { createCamera } from '../../components/camera';
import { createCube } from '../../components/cube';
import { createLights } from '../../components/light';
import { createScene } from '../../components/scene';
import { Loop } from '../../system/Loop';
import { createRenderer } from '../../system/render';
import { Resizer } from '../../system/Resizer';
import { createControls } from '../../system/controls';
import { createMeshGroup } from '../../components/meshGroup';

let camera: any;
let renderer: any;
let scene: any;
let loop: any;

class World {
  constructor(container: any) {
    camera = createCamera();
    scene = createScene();
    renderer = createRenderer();

    loop = new Loop(camera, scene, renderer);
    container.append(renderer.domElement);

    const controls = createControls(camera, renderer.domElement);
    
    const cube = createCube();
    const { ambientLight, mainLight } = createLights();
    const meshGroup = createMeshGroup();

    loop.updatables.push(controls, meshGroup);
    // loop.updatables.push(cube)
    // loop.updatables.push(light)

    scene.add(ambientLight, mainLight, meshGroup);

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
