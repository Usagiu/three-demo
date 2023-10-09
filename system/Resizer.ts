const setSize = (container: any, camera: any, renderer: any) => {
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
};


class Resizer {
    constructor(container: any, camera: any, renderer: any) {
      setSize(container, camera, renderer);

      window.addEventListener("resize", () => {
        setSize(container, camera, renderer);
      });
    }

    onResize() {}
  }
  
  export { Resizer };
  