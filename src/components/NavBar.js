import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import { NavLink } from "react-router-dom";
import "./NavBar.css";

const linkClass = ({ isActive }) =>
  "nav-link px-2" + (isActive ? " active" : "");

function NavBar() {
  return (
    <Navbar
      expand="lg"
      sticky="top"
      variant="dark"
      className="app-navbar"
    >
      <Container fluid>
        <Navbar.Brand as={NavLink} to="/home" className="brand">
          🪐 <span className="brand-text"><span className="accent">Exo</span>Analitycs</span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-nav" />
        <Navbar.Collapse id="main-nav">
          <Nav className="ms-auto align-items-lg-center gap-1">
            <Nav.Link as={NavLink} to="/home" className={linkClass} end>
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="/educacion" className={linkClass}>
              Educacion
            </Nav.Link>
            <Nav.Link as={NavLink} to="/prediccion" className={linkClass}>
              Prediccion
            </Nav.Link>
            <Nav.Link as={NavLink} to="/descripcion" className={linkClass}>
              Nosotros
            </Nav.Link>

            {/* CTA a la derecha 
            <Nav.Item className="ms-lg-2">
              <Button
                as={NavLink}
                to="/mision1"
                variant="outline-light"
                className="cta-btn"
              >
                Empezar misión
              </Button>
            </Nav.Item>
            */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
