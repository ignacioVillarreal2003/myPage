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
    const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0x6DB9EF });
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.position.set(-25, -13, 0);
    cube.scale.set(0.9, 0.9, 0.9);
    this.geometries.push(cube);
    this.scene.add(cube);

    const cylinderGeometry = new THREE.CylinderGeometry(5, 5, 10, 32);
    const cylinderMaterial = new THREE.MeshBasicMaterial({ color: 0xD0A2F7 });
    const cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
    cylinder.position.set(25, -13, 0);
    cylinder.scale.set(0.8, 0.8, 0.8);
    this.geometries.push(cylinder)
    this.scene.add(cylinder);

    const donutGeometry = new THREE.TorusGeometry(5, 1, 16, 100);
    const donutMaterial = new THREE.MeshBasicMaterial({ color: 0xFFF78A });
    const donut = new THREE.Mesh(donutGeometry, donutMaterial);
    donut.position.set(-25, 13, 0);
    this.geometries.push(donut)
    this.scene.add(donut);

    const pyramidGeometry = new THREE.ConeGeometry(5, 10, 4);
    const pyramidMaterial = new THREE.MeshBasicMaterial({ color: 0xF7B787 });
    const pyramid = new THREE.Mesh(pyramidGeometry, pyramidMaterial);
    pyramid.position.set(15, 8, 2);
    pyramid.scale.set(0.9, 0.9, 0.9);
    this.geometries.push(pyramid)
    this.scene.add(pyramid);

    // Variables
    let isDona = true;
    let isPiramide = true;
    let isCubo = true;
    let isCilindro = true;

    // Animaciones
    this.ngZone.runOutsideAngular(() => {
      const animate = () => {
        requestAnimationFrame(animate);

        // Dona
        let dona = this.geometries[2]
        dona.rotation.x += 0.01;
        dona.rotation.y += 0.01;
        if (isDona){          
          dona.position.x += 0.01;
          if (dona.position.x > -10){
            isDona = !isDona;
          }
        }
        if (!isDona){
          dona.position.x -= 0.01;
          if (dona.position.x < -25){
            isDona = !isDona;
          }
        }

        // Piramide
        let piramide = this.geometries[3]
        piramide.rotation.x += 0.005;
        piramide.rotation.y += 0.005;
        if (isPiramide){          
          piramide.position.x += 0.01;
          piramide.position.y -= 0.005
          if (piramide.position.x > 28){
            isPiramide = !isPiramide;
          }
        }
        if (!isPiramide){
          piramide.position.x -= 0.01;
          piramide.position.y += 0.005
          if (piramide.position.x < 15){
            isPiramide = !isPiramide;
          }
        }

        // Cubo
        let cubo = this.geometries[0]
        cubo.rotation.x += 0.002;
        cubo.rotation.z += 0.005;        
        if (isCubo){          
          cubo.position.y += 0.01
          cubo.position.x -= 0.005
          if (cubo.position.y > 2){
            isCubo = !isCubo;
          }
        }
        if (!isCubo){
          cubo.position.y -= 0.01
          cubo.position.x += 0.005
          if (cubo.position.y < -13){
            isCubo = !isCubo;
          }
        }

        // Cilindro
        let cilindro = this.geometries[1]
        cilindro.rotation.x += 0.002;
        cilindro.rotation.z += 0.005;
        cilindro.rotation.y += 0.008;                
        if (isCilindro){          
          cilindro.position.x -= 0.005
          if (cilindro.position.x < 15){
            isCilindro = !isCilindro;
          }
        }
        if (!isCilindro){
          cilindro.position.x += 0.005
          if (cilindro.position.y > 25){
            isCilindro = !isCilindro;
          }
        }

        this.renderer.render(this.scene, this.camera);
      };
      animate();
    });
  }


}
