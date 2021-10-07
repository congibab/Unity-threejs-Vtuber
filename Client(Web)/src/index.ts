import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { BVHLoader } from 'three/examples/jsm/loaders/BVHLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFNode, VRM, VRMSchema, VRMSpringBone } from '@pixiv/three-vrm'


const sock = new WebSocket("ws://127.0.0.1:5001");

sock.addEventListener("open", e => {
  console.log("接続が開かれたときに呼び出されるイベント");
});

sock.addEventListener("message", e => {
  console.log("Message : " + e.data);
});

sock.addEventListener("close", e => {
  console.log("接続が閉じられたときに呼び出されるイベント");
});

sock.addEventListener("error", e => {
  console.log("エラーが発生したときに呼び出されるイベント");
});


//=========================================
window.addEventListener("DOMContentLoaded", () => {

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 1.1, -2);

  const renderer = new THREE.WebGLRenderer({
    antialias: true
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x000000, 1.0);
  document.body.appendChild(renderer.domElement);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.target.set(0, 0.85, 0);
  controls.screenSpacePanning = true;
  controls.update();

  const light = new THREE.DirectionalLight(0xffffff);
  light.position.set(-1, 1, -1).normalize();
  scene.add(light);

  const gridHelper = new THREE.GridHelper(50, 50);
  scene.add(gridHelper);

  const axesHelper = new THREE.AxesHelper(5);
  scene.add(axesHelper);

  const clock = new THREE.Clock();
  //==================================

  const texture_loader = new THREE.CubeTextureLoader();
  texture_loader.setPath('./asset/skybox/');

  const textureCube = texture_loader.load([
    'right.jpg',
    'left.jpg',
    'top.jpg',
    'bottom.jpg',
    'front.jpg',
    'back.jpg'
  ]);

  scene.background = textureCube;

  //==================================
  let mixer: THREE.AnimationMixer;

  let currentVRM: VRM;
  let head: THREE.Object3D | null;

  const loader = new GLTFLoader();
  loader.load(
    './asset/VRM-Models/AvatarSample_A.vrm',
    (gltf) => {
      VRM.from(gltf).then((vrm) => {
        console.log(vrm);
        currentVRM = vrm;
        scene.add(vrm.scene);

        vrm.lookAt!.target = camera;
         head = vrm.humanoid!.getBoneNode(VRMSchema.HumanoidBoneName.Head);

        //vrm.humanoid!.getBoneNode(VRMSchema.HumanoidBoneName.LeftUpperArm)!.rotation.x = 0.6;

        //vrm.blendShapeProxy!.setValue(VRMSchema.BlendShapePresetName.O, 1.0);
        //vrm.blendShapeProxy!.update();
      })
    }
  )

  window.addEventListener('resize', onWindowResize, false);

  function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  const update = () => {
    requestAnimationFrame(update);

    let delta = clock.getDelta();

    if (currentVRM) {
      currentVRM.update(delta);
    }
    controls.update();
    renderer.render(scene, camera);
  };
  update();
})