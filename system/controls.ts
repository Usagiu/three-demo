import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

function createControls(camera: any, canvas: any) {
    const controls = new OrbitControls(camera, canvas);

    controls.enableDamping = true;  //阻尼效果 阻尼配合tick 不然没有效果
    controls.autoRotate = true;  //围绕自动旋转
    controls.autoRotateSpeed = 1;      //旋转速度

    controls.tick = () => controls.update();

    return controls;
}

export { createControls };