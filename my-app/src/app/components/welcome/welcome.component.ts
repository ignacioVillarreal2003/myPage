import { Component, OnInit, ElementRef, NgZone } from '@angular/core';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent {

  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private loader: GLTFLoader;

  constructor(private ngZone: NgZone) {
    this.loader = new GLTFLoader();
  }

  ngOnInit() {
    this.initThree();
    this.createScene();
    this.createCamera();
    this.createRenderer();
    this.loadGLBModel();
    this.render();
  }

  private initThree() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer();
  }

  private createScene() {
    this.scene.background = new THREE.Color(0xffffff);
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
  this.scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(1, 1, 1).normalize();
  this.scene.add(directionalLight);
  }

  private createCamera() {
    this.camera.position.set(0, 0, 10);  // Cambia los valores según sea necesario
  }

  private createRenderer() {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);
  }

  model: any = null;

  rotar(){
    // Supongamos que tienes una referencia al objeto que deseas rotar
const objectToMove = this.model;

// Movimiento en el eje X
objectToMove.position.x += 5;

// Movimiento en el eje Y
objectToMove.position.y -= 2;

// Movimiento en el eje Z
objectToMove.position.z += 1;

  }
  private loadGLBModel() {
    this.loader.load(
      '../../../assets/Basic Spaceship.glb',
      (gltf) => {
        // Cuando el modelo se carga exitosamente
        const model = gltf.scene;
        this.scene.add(model);
        this.model = model;
      },
      undefined,
      (error) => {
        console.error('Error al cargar el modelo GLB', error);
      }
    );
  }

  private render() {
    this.ngZone.runOutsideAngular(() => {
      const animate = () => {
        requestAnimationFrame(animate);
        // Actualiza la escena aquí
        this.renderer.render(this.scene, this.camera);
      };

      animate();
    });
  }

}
