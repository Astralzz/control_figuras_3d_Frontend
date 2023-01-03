import React from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import swal from "sweetalert";
import EscenaDona from "../escenas/EscenaDona";
import axios from "axios";
import {
  API_USUARIOS_ACTUALIZAR_CONEXION,
  API_PUERTO,
  API_URL,
} from "../api/Variables";
import { actualizarNombreDeUsuario } from "../apiFiguras/apiDona";

//Pagina de la figura
const PaginaFigura = (props) => {
  //Figura
  const MostrarFiguras = () => {
    return props.sesionUsuario.isSesionIniciada ? (
      //Figuras
      <EscenaDona
        width={800}
        height={600}
        sesionUsuario={props.sesionUsuario}
      />
    ) : (
      <></>
    );
  };

  //Cerramos sesión
  const cerrarSesion = () => {
    //url
    const url =
      API_URL +
      ":" +
      API_PUERTO +
      API_USUARIOS_ACTUALIZAR_CONEXION +
      props.sesionUsuario.nombre;

    //Elemento
    const elemento = { conectado: false };

    //Enviamos
    axios
      .put(url, elemento)
      //Éxito
      .then(function (ex) {
        //Actualizamos
        props.setSesionDeUsuario({
          isSesionIniciada: false,
          nombre: null,
          conectado: false,
        });

        //Eliminamos variable del storage
        sessionStorage.removeItem("SesionUsuario");

        //Paramos hilo
        actualizarNombreDeUsuario(null);

        //Mensaje
        swal("ÉXITO", "Se cerro la sesion correctamente!", "success");
      })
      //Error
      .catch(function (er) {
        swal("ERROR", "Ocurrió un error al actualizar el estado!", "error");
        console.error(`- ERROR AL BUSCAR USUARIO -\n ${er} \n -------------`);
      });
  };

  //Ponemos nombre
  actualizarNombreDeUsuario(
    props.sesionUsuario.isSesionIniciada ? props.sesionUsuario.nombre : null
  );

  return (
    // Formulario
    <Container>
      <div className="Auth-form-container">
        <Row className="justify-content-md-center">
          <Col md="auto">
            {/* Titulo */}
            <h1 className="Auth-form-title white" style={{ color: "white" }}>
              Figura de{" "}
              {props.sesionUsuario.isSesionIniciada
                ? props.sesionUsuario.nombre
                : "???"}
            </h1>
            {/* Figura */}
            <MostrarFiguras />
            <br />
            {/* Botones */}
            <Button variant="primary" type="button">
              Conectar al servidor
            </Button>
            <Button variant="primary" type="button" onClick={cerrarSesion}>
              Cerrar Sesión
            </Button>
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default PaginaFigura;
