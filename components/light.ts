import { DirectionalLight, PointLight, Vector3 } from 'three';

const createLights = () => {
    const light = new DirectionalLight('white', 8);

    light.position.set(10, 10, 30);

    return light;
}

export { createLights };