import { Component, OnInit, ElementRef, NgZone } from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  constructor(private ngZone: NgZone) { }

  scene: THREE.Scene = new THREE.Scene();
  camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer();
  geometries: THREE.Mesh[] = [];

  ngOnInit() {
    this.modelo3D()
  }

  modelo3D() {
    // Escena
    this.scene.background = new THREE.Color(0xebd3eb);

    // Agregar luz ambiental
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    this.scene.add(ambientLight);

    // Agregar luz direccional
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1).normalize();
    this.scene.add(directionalLight);

    // Camara
    this.camera.position.set(0, 0, 20);
    this.camera.lookAt(0, 0, 0);

    // Renderizado
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    const container = document.querySelector('.canvas') as HTMLElement;
    container.appendChild(this.renderer.domElement);

    /* Figuras */
    const cubeGeometry = new THREE.BoxGeometry(5, 5, 5);
    const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    this.geometries.push(cube);
    this.scene.add(cube);

    const cylinderGeometry = new THREE.CylinderGeometry(5, 5, 10, 32);
    const cylinderMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
    this.geometries.push(cylinder)
    this.scene.add(cylinder);

    const donutGeometry = new THREE.TorusGeometry(5, 1, 16, 100);
    const donutMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
    const donut = new THREE.Mesh(donutGeometry, donutMaterial);
    this.geometries.push(donut)
    this.scene.add(donut);

    const pyramidGeometry = new THREE.ConeGeometry(5, 10, 4);
    const pyramidMaterial = new THREE.MeshBasicMaterial({ color: 0xff00ff });
    const pyramid = new THREE.Mesh(pyramidGeometry, pyramidMaterial);
    this.geometries.push(pyramid)
    this.scene.add(pyramid);

    // Animaciones
    this.ngZone.runOutsideAngular(() => {
      const animate = () => {
        requestAnimationFrame(animate);

        // Animaciones de las geometrías
        this.geometries.forEach(geometry => {
          geometry.rotation.x += 0.01;
        });

        this.renderer.render(this.scene, this.camera);
      };
      animate();
    });
  }


}
