import * as THREE from "three";

//Dona
class Dona {
  //Constructor
  constructor(geometria, material) {
    //Geometria y figura
    this.mesh = new THREE.Mesh(geometria, material);
  }

  //Escena
  insertarEnEscena(escena) {
    escena.add(this.mesh);
  }

  //Mover a la derecha
  moverDerecha(limite) {
    if (this.mesh.position.x < limite) {
      this.mesh.position.x += 0.01;
    }
  }

  //Mover a la izquierda
  moverIzquierda(limite) {
    if (this.mesh.position.x > limite) {
      this.mesh.position.x -= 0.01;
    }
  }

  //Mover arriba
  moverArriba(limite) {
    if (this.mesh.position.y < limite) {
      this.mesh.position.y += 0.01;
    }
  }

  //Mover abajo
  moverAbajo(limite) {
    if (this.mesh.position.y > limite) {
      this.mesh.position.y -= 0.01;
    }
  }

  //Posiciones
  posiciones(pos) {
    this.mesh.position.x = pos.x;
    this.mesh.position.y = pos.y;
    this.mesh.position.z = pos.z;
  }

  //Rotar a la derecha
  rotarDerecha() {
    this.mesh.rotation.y += Math.PI / 180;
    this.mesh.rotation.x = 0;
  }

  //Rotar a la izquierda
  rotarIzquierda() {
    this.mesh.rotation.y -= Math.PI / 180;
    this.mesh.rotation.x = 0;
  }

  //Rotar para arriba
  rotarArriba() {
    this.mesh.rotation.x -= Math.PI / 180;
    this.mesh.rotation.y = 0;
  }

  //Rotar para abajo
  rotarAbajo() {
    this.mesh.rotation.x += Math.PI / 180;
    this.mesh.rotation.y = 0;
  }

  //Parar
  pararRotacion() {
    this.mesh.rotation.x = 0;
    this.mesh.rotation.y = 0;
  }

  //Cambiar color
  cambiarColor(color) {
    this.mesh.material.color.set(color);
  }

  //Cambiar Opacidad
  cambiarOpacidad(opacidad) {
    this.mesh.material.opacity = opacidad;
  }
}

export default Dona;
