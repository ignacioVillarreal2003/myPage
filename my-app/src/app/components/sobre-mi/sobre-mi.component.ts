import { Component } from '@angular/core';

@Component({
  selector: 'app-sobre-mi',
  templateUrl: './sobre-mi.component.html',
  styleUrls: ['./sobre-mi.component.css']
})
export class SobreMiComponent {

  contadorDatos: number = 0;
  datos = ['le encanta programar.', 'es muy organizado y ordenado.', 'le encanta viajar.',];
  dato: string = "le encanta programar.";

  ngOnInit(){
    setInterval(() => this.cambiarFrase(), 3000);
  }

  cambiarFrase(){
    this.dato = this.datos[this.contadorDatos];
    this.contadorDatos ++
    if (this.contadorDatos === 3){
      this.contadorDatos = 0
    }
  }

}
