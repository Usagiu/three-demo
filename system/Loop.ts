import { Clock } from "three";

class Loop {
    camera: any;
    scene: any;
    renderer: any;
    updatables: any[];
  
    constructor(camera: any, scene: any, renderer: any) {
        this.camera = camera;
        this.scene = scene;
        this.renderer = renderer;
        this.updatables = [];
    }

    start() {
        this.renderer.setAnimationLoop(() => {
            this.tick()
            
            this.renderer.render(this.scene, this.camera)
        })
    }

    stop() {
        this.renderer.setAnimationLoop(null);
    }

    tick() {
        for(const obj of this.updatables) {
            obj.tick()
        }
    }
}

export { Loop };