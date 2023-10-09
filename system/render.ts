import { WebGLRenderer } from 'three';

function createRenderer() {
  const renderer = new WebGLRenderer({ antialias: true });  //antialias：抗锯齿

  // renderer.useLegacyLights = true;

  return renderer;
}

export { createRenderer };
