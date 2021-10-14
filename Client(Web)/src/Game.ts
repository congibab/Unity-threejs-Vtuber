import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFNode, VRM, VRMSchema, VRMSpringBone } from '@pixiv/three-vrm'
import { VrmAnim } from './NetworkManager';

export class Game {
    private static _instance: Game;
    private currentVRM: VRM;


    constructor() {
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

            let head: THREE.Object3D | null;

            const loader = new GLTFLoader();
            loader.load(
                './asset/VRM-Models/AvatarSample_A.vrm',
                (gltf) => {
                    VRM.from(gltf).then((vrm) => {
                        console.log(vrm);
                        this.currentVRM = vrm;
                        scene.add(vrm.scene);

                        vrm.lookAt!.target = camera;
                        //head = vrm.humanoid!.getBoneNode(VRMSchema.HumanoidBoneName["Head"]);
                        head = vrm.humanoid!.getBoneNode(VRMSchema.HumanoidBoneName.Hips);
                        //head!.rotation.x = 0.9;

                        //vrm.humanoid!.getBoneNode(VRMSchema.HumanoidBoneName.LeftUpperArm)!.rotation.x = 0.9;

                        //vrm.blendShapeProxy!.setValue(VRMSchema.BlendShapePresetName.O, 1.0);
                        //vrm.blendShapeProxy!.update();
                    })
                },
                (progress) => console.log('Loading model...', 100.0 * (progress.loaded / progress.total), '%'),
                (error) => console.error(error)
            )

            window.addEventListener('resize', onWindowResize, false);

            function onWindowResize() {

                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(window.innerWidth, window.innerHeight);
            }

            const update = () => {

                let delta = clock.getDelta();

                if (this.currentVRM) {
                    this.currentVRM.update(delta);
                }
                controls.update();
                renderer.render(scene, camera);
                requestAnimationFrame(update);
            };
            update();
        })
    }

    public static get Instance() {
        return this._instance || (this._instance = new this());
    }

    public AnimUpdate(Data: VrmAnim[]) {

        for (let i = 0; i < Data.length; i++) {

            try {
                let _bone: VRMSchema.HumanoidBoneName = VRMSchema.HumanoidBoneName[Data[i].name as keyof typeof VRMSchema.HumanoidBoneName];

                let test = this.currentVRM.humanoid!.getBoneNode(_bone);
                let keys = Data[i].keys;
                //test!.position.copy(keys.pos);
                test!.quaternion.set(-keys.rot.x, -keys.rot.y, keys.rot.z, keys.rot.w);
                //test!.scale.copy(keys.scl);

            } catch (error) {
                console.log(error);
            }

        }
    }
}