import * as THREE from "three";

import { WindowEvents } from "./WindowEvents";

export class ViewGL implements WindowEvents {

    private readonly renderer: THREE.WebGLRenderer;

    private readonly scene: THREE.Scene;
    private readonly camera: THREE.PerspectiveCamera;

    private readonly cube: THREE.Mesh;

    constructor(canvasRef?: HTMLCanvasElement) {

        this.renderer = new THREE.WebGLRenderer({
            canvas: canvasRef,
            antialias: true,
        });
        this.renderer.setSize(innerWidth, innerHeight);

        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, (innerWidth / innerHeight), 0.1, 1000);
        this.camera.position.set(0, 0, 2);
        this.scene.add(this.camera);

        const goemetry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshNormalMaterial({ });

        this.cube = new THREE.Mesh(goemetry, material);
        this.scene.add(this.cube);

        this.renderer.setAnimationLoop(this.tick);

    }

    public onInitialization = () => {

        window.addEventListener("mousemove", this.onMouseMove);
        window.addEventListener("resize", this.onWindowResize);

    };

    public onDestruction = () => {

        window.removeEventListener("mousemove", this.onMouseMove);
        window.removeEventListener("resize", this.onWindowResize);

    };

    public onMouseMove = () => {};

    public onWindowResize = () => {

        this.camera.aspect = innerWidth / innerHeight;
        this.camera.updateProjectionMatrix();

        this.renderer.setSize(innerWidth, innerHeight);

    };

    public tick: THREE.XRAnimationLoopCallback = () => {

        this.cube.rotation.x += 0.01;
        this.cube.rotation.z += 0.02;

        this.renderer.render(this.scene, this.camera);

    };

}
