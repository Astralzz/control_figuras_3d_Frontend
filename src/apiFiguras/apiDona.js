import { getColorAleatorio, getOpacidadAleatoria } from "../funciones";

//VARIABLES GLOBALES
const componentesDona = {
  color: "#FFB266", //Hexadecimal
  colorFondo: "#99FF99", //Hexadecimal
  opacidad: 0.9, // 0.1 a 1
  rotacion: 1, //1 derecha, 2 izquierda, 3 arriba, 4 abajo
  posicion: -1, //1 derecha, 2 izquierda, 3 arriba, 4 abajo
};

//Intervalos / hilos
setInterval(function () {
  componentesDona.color = getColorAleatorio();
  componentesDona.opacidad = getOpacidadAleatoria();
}, 1000);

export default componentesDona;
