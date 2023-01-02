import React, { useState, useRef } from "react";
import {
  Form,
  InputGroup,
  Button,
  Figure,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import swal from "sweetalert";
import ControlDeErrores from "../componentes/ControlDeErrores";
import EscenaDona from "../escenas/EscenaDona";

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
    //Actualizamos
    props.setSesionDeUsuario({
      isSesionIniciada: false,
      nombre: null,
      conectado: false,
    });

    //Eliminamos variable del storage
    sessionStorage.removeItem("SesionUsuario");

    //Mensaje
    swal("ÉXITO", "Se cerro la sesion correctamente!", "success");
  };

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
            <ControlDeErrores>
              <MostrarFiguras />
            </ControlDeErrores>
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
