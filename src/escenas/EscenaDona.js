import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import componentesDona from "../apiFiguras/apiDona";
import Dona from "../figuras/Dona";

//Tamaños
const radioDeDona = 1;
const radioDelTubo = 0.5;
const segmentos = 25;

//Geometria
const geometriaDeLaDona = new THREE.TorusGeometry(
  radioDeDona,
  radioDelTubo,
  segmentos,
  segmentos
);

//Materiales
const materialesDeLaDona = new THREE.MeshBasicMaterial({
  color: componentesDona.color,
  transparent: true,
  opacity: componentesDona.opacidad,
});

//Actualizar la dona
function actualizarDona(dona) {
  //Rotación de la dona
  switch (componentesDona.rotacion) {
    case 1: //Derecha
      dona.rotarDerecha();
      break;
    case 2: //Izquierda
      dona.rotarIzquierda();
      break;
    case 3: //Arriba
      dona.rotarArriba();
      break;
    case 4: //Abajo
      dona.rotarAbajo();
      break;
    default:
      dona.pararRotacion();
      break;
  }

  //Movimiento de la dona
  const limiteX = 3.1;
  const limiteY = 2.24;
  switch (componentesDona.posicion) {
    case 1: //Derecha
      dona.moverDerecha(limiteX);
      break;
    case 2: //Izquierda
      dona.moverIzquierda(-limiteX);
      break;
    case 3: //Arriba
      dona.moverArriba(limiteY);
      break;
    case 4: //Abajo
      dona.moverAbajo(-limiteY);
      break;
    default:
      break;
  }

  //Color
  dona.cambiarColor(componentesDona.color);

  //Opacidad
  dona.cambiarOpacidad(componentesDona.opacidad);
}

//Escena de dona
const EscenaDona = ({ width, height, sesionUsuario }) => {
  //Referencia
  const referenciaDeContenido = useRef();

  //Al cargar la pagina
  useEffect(() => {
    if (referenciaDeContenido.current) {
      // Inicializar escena, renderer y cámara
      const escena = new THREE.Scene();
      const renderizado = new THREE.WebGLRenderer();
      const camara = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);

      // Creamos la dona
      const dona = new Dona(geometriaDeLaDona, materialesDeLaDona);
      dona.insertarEnEscena(escena);

      // Posicionar la cámara y el renderer
      camara.position.z = 5;
      renderizado.setSize(width, height);
      renderizado.setClearColor(0xffffff);

      // Añadir el renderer al DOM
      if (referenciaDeContenido.current) {
        referenciaDeContenido.current.appendChild(renderizado.domElement);
      }
      function animate() {
        //Color de fondo
        escena.background = new THREE.Color("#C0C0C0");

        //Actualizamos dona
        actualizarDona(dona);

        // Renderizar escena
        renderizado.render(escena, camara);

        // Reiniciamos
        requestAnimationFrame(animate);
      }
      animate();

      // Función de reescalado
      function onWindowResize() {
        camara.aspect = width / height;
        camara.updateProjectionMatrix();
        renderizado.setSize(width, height);
      }
      window.addEventListener("resize", onWindowResize);

      return () => {
        // Limpieza cuando el componente se desmonte
        window.removeEventListener("resize", onWindowResize);
        if (referenciaDeContenido.current) {
          referenciaDeContenido.current.removeChild(renderizado.domElement);
        }
      };
    }
  }, []);

  return <div ref={referenciaDeContenido} style={{ width, height }} />;
};

export default EscenaDona;
