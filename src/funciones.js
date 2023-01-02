// Color aleatorio
function getColorAleatorio() {
  // generar números aleatorios entre 0 y 255 para R, G y B
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);

  // crear cadena de color hexadecimal a partir de los valores de R, G y B
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

// Opacidad aleatoria
function getOpacidadAleatoria() {
  return 0.1 + Math.random() * 0.9;
}

// Rotación aleatoria
function getRotacionAleatoria() {
  return {
    rX: 0.01, // Math.random() * 0.6,
    rY: Math.PI / 180, //Derecha
  };
}

export { getColorAleatorio, getOpacidadAleatoria, getRotacionAleatoria };
