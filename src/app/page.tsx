'use client'
import styles from './page.module.css'
import * as THREE from 'three';
import { use, useEffect, useRef, useState } from 'react';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { useThree, extend } from 'react-three-fiber';
import { useGesture } from 'react-use-gesture';
import { World } from './world';
import { Button } from 'antd';

export default function Home() {
  const sceneRef = useRef(null);
  const glbModel = useRef(null)
  const camera = useRef(null)
  const [text, setText] = useState('')

  // useEffect(() => {
  //   let mockText = "Hello BestReact!Hello BestReact!Hello BestReact!Hello BestReact!Hello BestReact!Hello BestReact!Hello BestReact!Hello BestReact!Hello BestReact!Hello BestReact!Hello BestReact!Hello BestReact!Hello BestReact!Hello BestReact!Hello BestReact!Hello BestReact!Hello BestReact!Hello BestReact!Hello BestReact!Hello BestReact!Hello BestReact!Hello BestReact!Hello BestReact!Hello BestReact!Hello BestReact!Hello BestReact!Hello BestReact!Hello BestReact!Hello BestReact!Hello BestReact!Hello BestReact!Hello BestReact!Hello BestReact!Hello BestReact!Hello BestReact!Hello BestReact!Hello BestReact!Hello BestReact!Hello BestReact!Hello BestReact!Hello BestReact!Hello BestReact!Hello BestReact!Hello BestReact!Hello BestReact!Hello BestReact!Hello BestReact!Hello BestReact!Hello BestReact!Hello BestReact!Hello BestReact!Hello BestReact!Hello BestReact!Hello BestReact!Hello BestReact!Hello BestReact!Hello BestReact!Hello BestReact!Hello BestReact!";
  //   let list = mockText.split('')
  //   let currentIndex = 0

  //   const timer = setInterval(() => {
  //     if (currentIndex <= mockText.length) {
  //       let newList = list.map((value, index) => index === currentIndex ? getRandomLowercaseLetter() : value);
  //       setText(newList.join('')); // 替换文本
  //       currentIndex++;
  //       return;
  //     }
  //     clearInterval(timer); // 停止定时器
  //   }, 100);

  //   console.log(list.join(''))
  // }, [])

  // const getRandomLowercaseLetter = () => {
  //   const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  //   const randomIndex = Math.floor(Math.random() * alphabet.length);
  //   return alphabet[randomIndex];
  // }

  useEffect(() => {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('skyblue');

    camera.current = new THREE.PerspectiveCamera(70, document.documentElement.clientWidth / document.documentElement.clientHeight, 0.1, 1000);  //相机
    camera.current.position.z = 1;
    // camera.current.position.set(0,0,0)

    const renderer = new THREE.WebGLRenderer(); //画布
    renderer.setSize(document.documentElement.clientWidth, document.documentElement.clientHeight);  //size
    renderer.setPixelRatio(window.devicePixelRatio);  //设置设备像素比（DPR)  不能忘记设置它，否则你的场景在你测试它的笔记本电脑上可能看起来很棒，但在带有视网膜显示器的移动设备上会模糊
    sceneRef.current.appendChild(renderer.domElement);

    const pointLight = new THREE.PointLight("white", 10); // 第一个参数是光的颜色，第二个参数是光的强度
    pointLight.position.set(200, 200, 200); // 设置光源位置

    scene.add(pointLight);

    const loader = new GLTFLoader();
    loader.load('https://warpengine-open.oss-cn-shanghai.aliyuncs.com/jinmingtest/ship_in_clouds.glb', (glb) => {
      const scale = 15  //比例

      glbModel.current = glb.scene;
      glbModel.current.scale.set(scale, scale, scale)
      glbModel.current.position.set(0,0,23)
      scene.add(glbModel.current);

    }, undefined, (error) => {
      console.error(error);
    })

    const animate = () => {
      requestAnimationFrame(animate);
      if (glbModel.current) {
        // camera.current.position.x -= 0.005; 
        // camera.current.lookAt(glbModel.current.position)  看向模型中心
      }
      renderer.render(scene, camera.current);
    };

    openMouseAction();
    animate();

  }, []);

  const openMouseAction = () => {
    let isDragging = false;
    let previousMousePosition = {
      x: 0,
      y: 0
    };

    // 添加鼠标事件处理程序
    window.addEventListener('mousedown', (event) => {
      isDragging = true;
    });

    window.addEventListener('mouseup', (event) => {
      isDragging = false;
    });


    window.addEventListener('mousemove', (event) => {
      const deltaMove = {
        x: event.clientX - previousMousePosition.x,
        y: event.clientY - previousMousePosition.y
      };

      if (isDragging) {
        // 根据鼠标移动更新模型的位置
        // camera.current.rotation.x += deltaMove.x * 0.01;
        camera.current.rotation.y -= deltaMove.y * 0.01;
      }

      previousMousePosition = {
        x: event.clientX,
        y: event.clientY
      };
    });
  }

  useGesture(
    {
      onPinch: ({ offset: [d] }) => {
        // 根据双指缩放手势缩放模型
        if (glbModel.current) {
          camera.current.position.z -= d * 0.0001; 
        }
      },
    },
    {
      domTarget: sceneRef,
      eventOptions: { passive: false },
    }
  );
  
  let lastScrollTop = 0;

  const handleScroll = () => {
    const ele = document.querySelector('#scrollView');
    const { scrollTop } = ele;

    const direction = scrollTop > lastScrollTop ? 'down' : 'up';    

    if (direction === 'down') {
      camera.current.position.z -= (scrollTop - lastScrollTop) * 0.01
    } else {
      camera.current.position.z +=  (lastScrollTop - scrollTop ) * 0.01
    }
    lastScrollTop = scrollTop;
  };

  useEffect(() => {
    const ele = document.querySelector('#scrollView');
    ele?.addEventListener('scroll', handleScroll);
    return () => {
        ele?.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // const worldRef = useRef(null)

  // useEffect(()=>{
  //   const container = document.querySelector('#container');
  //   worldRef.current = new World(container);
  //   worldRef.current.start();
  // },[])

  return (
    <div className={styles.outlet}>
      {/* <div className={styles.btn}>
        <Button type="primary" onClick={()=>{worldRef.current.stop()}}>Stop</Button>
        <Button type="primary" onClick={()=>{worldRef.current.start()}}>Start</Button>
      </div> */}
      <div ref={sceneRef} id="container" className={styles.wrap}/>
      <div id='scrollView' className={styles.scrollText}>{"Hello BestReact!Hello BestReact!Hello BestReact!Hello BestReact!Hello BestReact!Hello BestReact!Hello BestReact!Hello BestReact!Hello BestReact!Hello BestReact!Hello BestReact!Hello BestReact!Hello BestReact!Hello BestReact!Hello BestReact!Hello BestReact!Hello BestReact!Hello BestReact!Hello BestReact!Hello BestReact!Hello BestReact!Hello BestReact!Hello BestReact!Hello BestReact!Hello BestReact!Hello BestReact!Hello BestReact!Hello BestReact!Hello BestReact!Hello BestReact!Hello BestReact!Hello BestReact!Hello BestReact!Hello BestReact!Hello BestReact!Hello BestReact!Hello BestReact!Hello BestReact!Hello BestReact!Hello BestReact!Hello BestReact!Hello BestReact!Hello BestReact!Hello BestReact!Hello BestReact!Hello BestReact!Hello BestReact!Hello BestReact!Hello BestReact!Hello BestReact!Hello BestReact!Hello BestReact!Hello BestReact!Hello BestReact!Hello BestReact!Hello BestReact!Hello BestReact!Hello BestReact!Hello BestReact!"}</div>
    </div>
  )
}
