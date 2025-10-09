import React, { useEffect, useState } from "react";
import "./Home.css";
import { Link } from "react-router-dom";

function Home() {
  const [showOverlay, setShowOverlay] = useState(false);
  const [activeTab, setActiveTab] = useState("prediccion");

  // Cerrar con tecla Escape
  useEffect(() => {
    const onEsc = (e) => {
      if (e.key === "Escape") {
        setShowOverlay(false);
      }
    };
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, []);

  // Bloquear scroll del body cuando haya overlay abierto
  useEffect(() => {
    document.body.style.overflow = showOverlay ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [showOverlay]);

  // Pre-carga de imágenes para evitar parpadeos
  useEffect(() => {
    const sources = [
      //"/imagesHome/marte_home2.png",
      //"/imagesHome/luna_home2.png",
      "/imagesHome/exoplaneta1.png",
      "/imagesHome/exoplaneta2.png",
      "/imagesHome/astronauta4.png",
    ];
    sources.forEach((src) => {
      const img = new Image();
      img.src = process.env.PUBLIC_URL + src;
    });
  }, []);

  return (
    <div className="home-container">

      {/* Título principal */}
      <div className="titulo-container" length={1}>
        <h1  className="home-title">Descubre mas allá de nuestro sistema solar</h1>
      </div>

      {/* Imágenes centrales */}
      <div className="centro-imagen">
        <img
          src={process.env.PUBLIC_URL + "/imagesHome/exoplaneta1.png"}
          alt="Marte"
          className="marte-img"
        />
        <img
          src={process.env.PUBLIC_URL + "/imagesHome/exoplaneta2.png"}
          alt="Luna"
          className="luna-img"
        />
        <div className="astronauta-wrap">
          <img
            src={process.env.PUBLIC_URL + "/imagesHome/astronauta4.png"}
            alt="Astronauta"
            className="astronauta-img"
          />
        </div>

      </div>

      {/* Botón para empezar misión */}
      <div className="boton-container">
        <button
          className="boton-mision space-button"
          onClick={() => setShowOverlay(true)}
          aria-haspopup="dialog"
          aria-expanded={showOverlay}
        >
          Empezar misión
        </button>
      </div>

      <div className="seisminds-text">
        <Link to="/descripcion" className="exo-analytics-link">Exo Analytics</Link>
      </div>


          {/* Overlay que aparece al hacer clic en "Empezar misión" */}
          {showOverlay && (
            <div
              className={`overlay-container show`}
              role="dialog"
              aria-modal="true"
              onClick={(e) => {
                // cerrar solo si se hace click en el fondo (no en el contenido)
                if (e.currentTarget === e.target) setShowOverlay(false);
              }}
            >
              <div className="misiones-container space-modal" onClick={(e) => e.stopPropagation()}>
                <h2 className="modal-title">Explora la detección de exoplanetas</h2>
                <p className="modal-description">
                  Elige tu aventura en el fascinante mundo de la detección de exoplanetas.
                </p>

                {/* Pestañas */}
                <div className="tabs-container mb-4">
                  <button
                    className={`tab-button ${activeTab === "prediccion" ? "active" : ""}`}
                    onClick={() => setActiveTab("prediccion")}
                  >
                    Predicción
                  </button>
                  <button
                    className={`tab-button ${activeTab === "educacion" ? "active" : ""}`}
                    onClick={() => setActiveTab("educacion")}
                  >
                    Educación
                  </button>
                </div>

                {/* Contenido de las pestañas */}
                {activeTab === "prediccion" && (
                  <div className="tab-content">
                    <h3 className="tab-title">Pestaña Predicción</h3>
                    <p className="tab-description">
                      Explora cómo el modelo predice si un candidato es un exoplaneta real. 
                      Ingresa los datos observados y descubre la predicción con información sobre cada variable, 
                      respaldada en ciencia y señales confiables.
                    </p>
                    <Link 
                      to="/prediction" 
                      className="space-button tab-action-button"
                      onClick={() => setShowOverlay(false)}
                    >
                      Ir a Predicción
                    </Link>
                  </div>
                )}

                {activeTab === "educacion" && (
                  <div className="tab-content">
                    <h3 className="tab-title">Pestaña Educación</h3>
                    <p className="tab-description">
                      Aprende sobre exoplanetas, cómo se descubren y qué significan las variables del modelo. 
                      Amanda, Mateo y Doña Estela te guían con explicaciones claras, curiosidades y metáforas 
                      para entender el universo de manera divertida y sencilla.
                    </p>
                    <Link 
                      to="/modelo" 
                      className="space-button tab-action-button"
                      onClick={() => setShowOverlay(false)}
                    >
                      Ir a Educación
                    </Link>
                  </div>
                )}

                <div style={{ marginTop: 24 }}>
                  <button className="space-button" onClick={() => setShowOverlay(false)} aria-label="Cerrar">
                    Cerrar
                  </button>
                </div>
              </div>
            </div>
          )}
    </div>
  );
}

export default Home;
