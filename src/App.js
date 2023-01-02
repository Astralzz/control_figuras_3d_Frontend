// import logo from "./logo.svg";
import "./App.css";
import PaginaLogin from "./paginas/PaginaLogin";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import PaginaFigura from "./paginas/PaginaFigura";

//App
function App() {
  // Obtiene el valor de la variable del almacenamiento de sesión
  const valorDeSesion = sessionStorage.getItem("SesionUsuario");
  // Convierte la cadena de texto en un objeto
  const valorDeSesionJson = JSON.parse(valorDeSesion);

  //Variable
  const [sesionUsuario, setSesionDeUsuario] = useState(
    valorDeSesionJson || {
      isSesionIniciada: false,
      nombre: null,
      conectado: false,
    }
  );

  //Al cargar pagina
  useEffect(() => {
    // Obtiene los datos del storage de sesion
    function fetchSesion() {
      const us = sessionStorage.getItem("SesionUsuario");
      setSesionDeUsuario(JSON.parse(us));
    }

    //Si ahi una sesion guardada en el buscador
    if (sessionStorage.getItem("SesionUsuario") !== null) {
      //Si no ahi una sesion iniciada
      if (!sesionUsuario.isSesionIniciada) {
        fetchSesion();
        return;
      }
    }
  }, []);

  //Al actualizar usuario
  useEffect(() => {
    // Guarda los datos en el almacenamiento de sesion del navegador
    sessionStorage.setItem("SesionUsuario", JSON.stringify(sesionUsuario));
  }, [sesionUsuario]);

  //Obtenemos pagina
  const PaginaEscogida = () => {
    return !sesionUsuario.isSesionIniciada ? (
      // espacio de la pagina
      <PaginaLogin setSesionDeUsuario={setSesionDeUsuario} />
    ) : (
      // Figura
      <PaginaFigura
        sesionUsuario={sesionUsuario}
        setSesionDeUsuario={setSesionDeUsuario}
      />
    );
  };

  //App
  return (
    <div className="App">
      <PaginaEscogida />
    </div>
  );
}

export default App;

/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */
