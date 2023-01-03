import axios from "axios";
import { API_PUERTO, API_URL, API_DONAS_OBTENER } from "../api/Variables";

//VARIABLES GLOBALES
const componentesDona = {
  aleatorio: 0,
  rotacion: "NINGUNA", //1 derecha, 2 izquierda, 3 arriba, 4 abajo
  movimiento: "NINGUNO", //1 derecha, 2 izquierda, 3 arriba, 4 abajo
  color_dona: "FF0000", //Hexadecimal
  color_fondo: "000000", //Hexadecimal
  opacidad: 0, // 0.1 a 1
};

//Limpiar
function limpiarDatos() {
  componentesDona.aleatorio = 0;
  componentesDona.rotacion = "NINGUNA";
  componentesDona.movimiento = "NINGUNO";
  componentesDona.color_dona = "FF0000";
  componentesDona.color_fondo = "000000";
  componentesDona.opacidad = 0;
}

//Nombre de usuario
let NOMBRE_USUARIO = null;
function actualizarNombreDeUsuario(nombre) {
  NOMBRE_USUARIO = nombre;
}

//Verificar datos del usuario
async function obtenerDatosDeLaDona(nombre) {
  //Probamos
  if (NOMBRE_USUARIO === null) {
    return;
  }
  //Ruta
  const url = API_URL + ":" + API_PUERTO + API_DONAS_OBTENER + nombre;

  //Enviamos
  await axios
    .get(url)
    //Éxito
    .then(function (ex) {
      //Ponemos datos
      componentesDona.aleatorio = ex.data.aleatorio;
      componentesDona.rotacion = ex.data.rotacion;
      componentesDona.movimiento = ex.data.movimiento;
      componentesDona.color_dona = ex.data.color_dona;
      componentesDona.color_fondo = ex.data.color_fondo;
      componentesDona.opacidad = ex.data.opacidad;
    })
    //Error
    .catch(function (er) {
      console.error(
        `- ERROR AL OBTENER DATOS DE LA DONA DE ${NOMBRE_USUARIO} -\n ${er} \n -------------`
      );
      limpiarDatos();
    });
}

//Intervalos / hilos
setInterval(async function () {
  //Verificamos
  if (NOMBRE_USUARIO !== null) {
    //obtenemos datos
    await obtenerDatosDeLaDona(NOMBRE_USUARIO);

    //Datos no aleatorios
    if (componentesDona.aleatorio === 0) {
      return;
    }

    //Datos aleatorios
    componentesDona.color_dona = getColorAleatorio();
    componentesDona.color_fondo = getColorAleatorio();
    componentesDona.opacidad = getOpacidadAleatoria();
  }
}, 3000);

// Color aleatorio
function getColorAleatorio() {
  // generar números aleatorios entre 0 y 255 para R, G y B
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);

  // crear cadena de color hexadecimal a partir de los valores de R, G y B
  return ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

// Opacidad aleatoria
function getOpacidadAleatoria() {
  return 0.1 + Math.random() * 0.9;
}

export { componentesDona, actualizarNombreDeUsuario };
