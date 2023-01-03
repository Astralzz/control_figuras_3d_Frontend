import React, { useState, useRef } from "react";
import { Form, InputGroup, Button, Container, Row, Col } from "react-bootstrap";
import { Eye, EyeSlash } from "react-bootstrap-icons";
import axios from "axios";
import swal from "sweetalert";
import {
  API_PUERTO,
  API_URL,
  API_DONAS_GUARDAR,
  API_USUARIOS_BUSCAR_NOMBRE,
  API_USUARIOS_GUARDAR,
  API_USUARIOS_VERIFICAR,
  API_USUARIOS_ACTUALIZAR_CONEXION,
} from "../../api/Variables";

//Pagina del login
const PaginaLogin = (props) => {
  //Ocultar la contraseña
  const [passOculta, setPassOculta] = useState(true);
  const [nombre, setNombre] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  //Referencia nombre
  const refNombre = useRef();

  //Registrar o acceder
  const [isNuevo, setNuevo] = useState(false);

  //Usuario existente
  const [isUsuarioExistente, setUsuarioExistente] = useState(false);

  //Referencia
  const refFormulario = useRef(null);

  //Crear donas
  const registrarDona = (nombre) => {
    //Ruta
    const url = API_URL + ":" + API_PUERTO + API_DONAS_GUARDAR;

    //Convertimos
    const usuario = { usuario: nombre };

    //Enviamos
    axios
      .post(url, usuario)
      //Error
      .catch(function (er) {
        swal("ERROR", "Ocurrió un error al crear la dona!", "error");
        console.error(`- ERROR AL CREAR DONA -\n ${er} \n -------------`);
      });
  };

  //Buscar
  const buscar = async (url) => {
    //Enviamos
    return (
      axios
        .get(url)
        //Éxito
        .then(function (ex) {
          return ex.data.encontrado;
        })
        //Error
        .catch(function (er) {
          console.error(`- ERROR AL BUSCAR USUARIO -\n ${er} \n -------------`);
          return false;
        })
    );
  };

  //Actualizar nombre
  const actualizarNombre = (name) => {
    //url
    const url =
      API_URL + ":" + API_PUERTO + API_USUARIOS_ACTUALIZAR_CONEXION + name;

    //Elemento
    const elemento = { conectado: true };

    //Enviamos
    axios
      .put(url, elemento)
      //Éxito
      .then(function (ex) {
        props.setSesionDeUsuario({
          isSesionIniciada: true,
          nombre: name,
          conectado: true,
        });
      })
      //Error
      .catch(function (er) {
        swal("ERROR", "Ocurrió un error al actualizar el estado!", "error");
        console.error(`- ERROR AL BUSCAR USUARIO -\n ${er} \n -------------`);
        return false;
      });
  };
  //Buscamos nombre existente
  const buscarNombre = async (event) => {
    //Actualizamos
    setNombre(event.target.value);

    //Comprobamos
    if (event.target.value.length > 3 && isNuevo) {
      //Ruta
      const url =
        API_URL +
        ":" +
        API_PUERTO +
        API_USUARIOS_BUSCAR_NOMBRE +
        event.target.value;
      //Buscamos
      const r = await buscar(url);
      setUsuarioExistente(r);
    }
  };

  //Registrar nuevo usuario
  const registrarNuevoUsuario = async (event) => {
    event.preventDefault();

    //Ruta
    const url = API_URL + ":" + API_PUERTO + API_USUARIOS_GUARDAR;

    //obtenemos datos
    const formData = new FormData(refFormulario.current);

    //Enviamos
    await axios
      .post(url, formData)
      //Éxito
      .then(function (ex) {
        swal("ÉXITO", ex.data.mensaje + "!", "success");
        setNombre("");
        setPassword("");
        setNuevo(false);
        registrarDona(formData.get("nombre"));
      })
      //Error
      .catch(function (er) {
        swal("ERROR", "Ocurrió un error inesperado!", "error");
        console.error(`- ERROR AL CREAR USUARIO -\n ${er} \n -------------`);
      });
  };

  //Verificar datos del usuario
  const iniciarSesion = async (event) => {
    event.preventDefault();

    //Ruta
    const url = API_URL + ":" + API_PUERTO + API_USUARIOS_VERIFICAR;

    //Obtenemos datos
    const formData = new FormData(refFormulario.current);

    //Enviamos
    await axios
      .post(url, formData)
      //Éxito
      .then(function (ex) {
        setNombre("");
        setPassword("");
        actualizarNombre(ex.data.nombre);
      })
      //Error
      .catch(function (er) {
        if (er !== null && er !== undefined) {
          if (er.response) {
            switch (er.response.status) {
              case 401:
                swal("ERROR", er.response.data.error + "!", "error");
                return;
              default:
                swal("ERROR", "Ocurrió un error en la consulta!", "error");
                console.error(
                  `- ERROR AL VERIFICAR USUARIO -\n ${er} \n -------------`
                );
                return;
            }
          }
          swal("ERROR", "Ocurrió un error en extraño!", "error");
          return;
        }

        swal("ERROR", "Ocurrió un error en la consulta!", "error");
        console.error(
          `- ERROR AL VERIFICAR USUARIO -\n ${er} \n -------------`
        );
      });
  };

  //Icono
  const IconoEye = () => {
    return passOculta ? <EyeSlash /> : <Eye />;
  };

  //Comprobar pass
  function comprobarPass() {
    if (isNuevo) {
      //Si existe el usuario
      if (isUsuarioExistente) {
        return false;
      }
      return (
        nombre.length >= 4 &&
        password.length >= 4 &&
        password2.length >= 4 &&
        password === password2
      );
    }
    return true;
  }
  const isPassIgual = comprobarPass();

  //Comprobar nombre
  function comprobarNombreExistente() {
    if (refNombre.current) {
      if (refNombre.current.value.length > 3) {
        if (isNuevo) {
          if (isUsuarioExistente) {
            return false;
          }
        }
      }
    }
    return true;
  }
  const isNombreExist = comprobarNombreExistente();

  //Retornamos
  return (
    // Formulario
    <Container>
      <div className="container py-5 h-100">
        <div className="Auth-form-container">
          <div className="col col-xl-10">
            <div className="card" style={{ borderRadius: "1rem" }}>
              <div className="row g-0">
                {/* Parte de ka imagen */}
                <div className="col-md-6 col-lg-5 d-none d-md-block">
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp"
                    alt="login form"
                    className="img-fluid"
                    style={{ borderRadius: "1rem 0 0 1rem" }}
                  />
                </div>

                {/* Parte del formulario */}
                <div className="col-md-6 col-lg-7 d-flex align-items-center">
                  <div className="card-body p-4 p-lg-5 text-black">
                    {/* Formulario */}
                    <Form
                      ref={refFormulario}
                      onSubmit={isNuevo ? registrarNuevoUsuario : iniciarSesion}
                    >
                      <div className="Auth-form-content">
                        {/* Titulo */}
                        <div className="d-flex align-items-center mb-3 pb-1">
                          <span className="h1 fw-bold mb-0">
                            {!isNuevo ? "Conectar" : "Registrar"}
                          </span>
                        </div>

                        {/* Nombre de usuario */}
                        <div className="form-group mt-3">
                          <Form.Group controlId="formUsername">
                            <Form.Label>Nombre de usuario</Form.Label>
                            <Form.Control
                              ref={refNombre}
                              type="text"
                              name="nombre"
                              value={nombre}
                              onChange={buscarNombre}
                              required
                              minLength={4}
                              maxLength={16}
                            />
                            {/* Alerta de nombre existente */}
                            <p hidden={isNombreExist} className="text-danger">
                              {" "}
                              Nombre en uso
                            </p>
                          </Form.Group>
                        </div>

                        {/* Contraseña */}
                        <div className="form-group mt-3">
                          <Form.Group controlId="formPassword">
                            <Form.Label>Contraseña</Form.Label>
                            <InputGroup>
                              <Form.Control
                                type={passOculta ? "password" : "text"}
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                minLength={4}
                                maxLength={12}
                                required
                              />
                              <Button
                                className="btn btn-dark"
                                onClick={() => setPassOculta(!passOculta)}
                              >
                                <IconoEye />
                              </Button>
                            </InputGroup>

                            {/* Repetir contraseña */}
                            <InputGroup hidden={!isNuevo}>
                              <Form.Control
                                type={"password"}
                                value={password2}
                                onChange={(e) => setPassword2(e.target.value)}
                              />
                            </InputGroup>
                          </Form.Group>
                        </div>

                        {/* Boton de crear */}
                        <div className="d-grid gap-2 mt-3">
                          <Button
                            type="submit"
                            className="btn btn-dark btn-lg btn-block"
                            disabled={!isPassIgual}
                          >
                            {!isNuevo
                              ? "Conectar al servidor"
                              : "Crear Usuario"}
                          </Button>
                        </div>

                        {/* Boton de Registro */}
                        <p className="mb-5 pb-lg-2" style={{ colo: "#393f81" }}>
                          {!isNuevo
                            ? "No estas registrado? "
                            : "Ya estas registrado? "}
                          <button
                            type="button"
                            onClick={() => {
                              setPassOculta(true);
                              setNombre("");
                              setPassword("");
                              setPassword2("");
                              setNuevo(!isNuevo);
                            }}
                            style={{
                              backgroundColor: "transparent",
                              color: "#393f81",
                              textDecoration: "underline",
                              cursor: "pointer",
                              border: "none",
                            }}
                          >
                            {!isNuevo ? "Registro" : "Acceder"}
                          </button>
                        </p>
                      </div>
                    </Form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default PaginaLogin;
