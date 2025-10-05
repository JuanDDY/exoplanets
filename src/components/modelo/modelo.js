import React, { useState, useEffect } from "react";
import { Container, Button, Card, Modal } from "react-bootstrap";
import "./ModeloComponent.css";

const Modelo = () => {
  // Estados para el modal de variables
  const [showVariableModal, setShowVariableModal] = useState(false);
  const [selectedVariable, setSelectedVariable] = useState(null);
  const [variableExplanations, setVariableExplanations] = useState({});

  // Estados para el modal de educación
  const [showEducationModal, setShowEducationModal] = useState(false);
  const [selectedEducationTopic, setSelectedEducationTopic] = useState(null);
  const [educationExplanations, setEducationExplanations] = useState({});

  // Estados para el modal de ML Pipeline
  const [showMlPipelineModal, setShowMlPipelineModal] = useState(false);
  const [selectedMlPipelineTopic, setSelectedMlPipelineTopic] = useState(null);
  const [mlPipelineExplanations, setMlPipelineExplanations] = useState({});

  // Cargar explicaciones de variables al montar el componente
  useEffect(() => {
    const loadVariableExplanations = async () => {
      try {
        // Datos embebidos como fallback
        const fallbackData = {
          "period_days": {
            "personaje": "Amanda",
            "explicacion": [
              "El periodo nos dice cuánto tarda el exoplaneta en dar una vuelta completa alrededor de su estrella.",
              "Si ese ciclo se repite con precisión, es una fuerte señal de un exoplaneta real."
            ]
          },
          "duration_hours": {
            "personaje": "Mateo",
            "explicacion": [
              "Es como ver cuánto tarda la sombra en cruzar la luz.",
              "Si siempre dura lo mismo, ¡seguro es un exoplaneta que pasa frente a la estrella!"
            ]
          },
          "depth_ppm": {
            "personaje": "Doña_Estela",
            "explicacion": [
              "Hasta la más pequeña sombra en la luz de una estrella puede esconder un mundo nuevo.",
              "Esa pequeña disminución es la huella del tránsito."
            ]
          },
          "planet_radius_re": {
            "personaje": "Amanda",
            "explicacion": [
              "El radio planetario se calcula con la luz bloqueada en el tránsito.",
              "Así podemos diferenciar entre planetas rocosos como la Tierra y gigantes como Júpiter."
            ]
          },
          "snr": {
            "personaje": "Mateo",
            "explicacion": [
              "Es como subir el volumen de la tele: si la señal es fuerte, se escucha clarito.",
              "Eso significa que el exoplaneta es más confiable."
            ]
          },
          "impact": {
            "personaje": "Doña Estela",
            "explicacion": [
              "La claridad surge cuando el camino es directo y sin desvíos.",
              "Un tránsito central nos da más certeza de que es un exoplaneta."
            ]
          },
          "stellar_teff_k": {
            "personaje": "Amanda",
            "explicacion": [
              "La temperatura de la estrella afecta la claridad de la señal.",
              "Las más calientes brillan tanto que el tránsito puede ser difícil de detectar."
            ]
          },
          "stellar_logg_cgs": {
            "personaje": "Doña_Estela",
            "explicacion": [
              "La grandeza a veces engaña: las estrellas gigantes confunden con señales falsas,",
              "mientras que las enanas nos hablan con más claridad."
            ]
          },
          "stellar_radius_rsun": {
            "personaje": "Mateo",
            "explicacion": [
              "Si la estrella es enorme, ¡el exoplaneta tarda más en cruzarla!",
              "Eso nos ayuda a comprobar si los datos tienen sentido."
            ]
          },
          "mag": {
            "personaje": "Amanda",
            "explicacion": [
              "La magnitud mide qué tan brillante se ve la estrella desde la Tierra.",
              "Las más brillantes nos dan señales más limpias y confiables."
            ]
          },
          "fp_nt": {
            "personaje": "Mateo",
            "explicacion": [
              "¡A veces no es un exoplaneta, solo ruido o una variación de la estrella!",
              "Este indicador nos lo advierte."
            ]
          },
          "fp_ss": {
            "personaje": "Doña_Estela",
            "explicacion": [
              "Entre luces que se eclipsan, la ilusión de un planeta puede desvanecerse.",
              "Este marcador señala un posible eclipse estelar."
            ]
          },
          "fp_co": {
            "personaje": "Amanda",
            "explicacion": [
              "Este indicador nos advierte que la señal proviene de otra estrella cercana,",
              "no de la que estábamos observando. Es contaminación del campo visual."
            ]
          },
          "fp_ec": {
            "personaje": "Doña_Estela",
            "explicacion": [
              "Cuando las voces del cielo se superponen, el mensaje se vuelve incierto.",
              "Este indicador señala coincidencias que pueden confundir."
            ]
          }
        };

        // Probar diferentes rutas posibles
        const possiblePaths = [
          '/data/respuestas_prediccion_data.json',
          './data/respuestas_prediccion_data.json',
          `${process.env.PUBLIC_URL}/data/respuestas_prediccion_data.json`
        ];
        
        let data = null;
        let loadedFromFile = false;
        
        for (const path of possiblePaths) {
          try {
            console.log(`Intentando cargar desde: ${path}`);
            const response = await fetch(path);
            
      if (!response.ok) {
              throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            
            const text = await response.text();
            console.log(`Respuesta recibida (${text.length} caracteres):`, text.substring(0, 200) + '...');
            
            if (!text.trim()) {
              throw new Error('Respuesta vacía');
            }
            
            data = JSON.parse(text);
            console.log('JSON parseado exitosamente desde archivo:', Object.keys(data));
            loadedFromFile = true;
            break;
            
          } catch (error) {
            console.warn(`Error con ruta ${path}:`, error.message);
          }
        }
        
        // Usar datos embebidos si no se pudo cargar desde archivo
        if (!loadedFromFile) {
          console.log('Usando datos embebidos como fallback');
          data = fallbackData;
        }
        
        setVariableExplanations(data);
        console.log('Explicaciones de variables cargadas exitosamente');
        
    } catch (error) {
        console.error('Error cargando explicaciones de variables:', error);
        // Cargar datos por defecto para evitar errores
        setVariableExplanations({});
      }
    };
    
    loadVariableExplanations();
  }, []);

  // Cargar explicaciones educativas al montar el componente
  useEffect(() => {
    const loadEducationExplanations = async () => {
      try {
        // Datos embebidos como fallback para educación
        const fallbackEducationData = {
          "exoplanetas": {
            "personaje": "Amanda",
            "explicacion": [
              "Los exoplanetas son planetas que orbitan estrellas diferentes al Sol.",
              "Desde 1992, hemos descubierto más de 5000 exoplanetas confirmados."
            ]
          },
          "metodo_transito": {
            "personaje": "Mateo",
            "explicacion": [
              "El método de tránsito detecta exoplanetas cuando pasan frente a su estrella.",
              "Como un eclipse, pero mucho más pequeño y preciso."
            ]
          },
          "telescopio_kepler": {
            "personaje": "Doña_Estela",
            "explicacion": [
              "El telescopio Kepler observó una región del cielo durante 9 años.",
              "Descubrió miles de candidatos a exoplanetas y revolucionó nuestro conocimiento."
            ]
          },
          "señales_falsas": {
            "personaje": "Amanda",
            "explicacion": [
              "No todas las señales son exoplanetas reales.",
              "Las estrellas binarias, manchas solares y ruido pueden crear señales falsas."
            ]
          },
          "clasificacion_exoplanetas": {
            "personaje": "Mateo",
            "explicacion": [
              "Los exoplanetas se clasifican por tamaño, composición y distancia a su estrella.",
              "Desde super-Tierras hasta gigantes gaseosos como Júpiter."
            ]
          },
          "zona_habitable": {
            "personaje": "Doña_Estela",
            "explicacion": [
              "La zona habitable es la distancia perfecta donde el agua puede ser líquida.",
              "Ni muy cerca (muy caliente) ni muy lejos (muy frío) de la estrella."
            ]
          }
        };

        // Probar diferentes rutas posibles
        const possiblePaths = [
          '/data/educacion_exoplanetas.json',
          './data/educacion_exoplanetas.json',
          `${process.env.PUBLIC_URL}/data/educacion_exoplanetas.json`
        ];
        
        let data = null;
        let loadedFromFile = false;
        
        for (const path of possiblePaths) {
          try {
            console.log(`Intentando cargar educación desde: ${path}`);
            const response = await fetch(path);
            
      if (!response.ok) {
              throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            
            const text = await response.text();
            console.log(`Respuesta educación recibida (${text.length} caracteres):`, text.substring(0, 200) + '...');
            
            if (!text.trim()) {
              throw new Error('Respuesta vacía');
            }
            
            data = JSON.parse(text);
            console.log('JSON educación parseado exitosamente desde archivo:', Object.keys(data));
            loadedFromFile = true;
            break;
            
    } catch (error) {
            console.warn(`Error con ruta educación ${path}:`, error.message);
          }
        }
        
        // Usar datos embebidos si no se pudo cargar desde archivo
        if (!loadedFromFile) {
          console.log('Usando datos educación embebidos como fallback');
          data = fallbackEducationData;
        }
        
        setEducationExplanations(data);
        console.log('Explicaciones educativas cargadas exitosamente');
        
    } catch (error) {
        console.error('Error cargando explicaciones educativas:', error);
        // Cargar datos por defecto para evitar errores
        setEducationExplanations({});
      }
    };
    
    loadEducationExplanations();
  }, []);


  useEffect(() => {
    const loadEducationExplanations = async () => {
      try {
        // Datos embebidos como fallback para educación
        const fallbackEducationData = {
          "exoplanetas": {
            "personaje": "Amanda",
            "explicacion": [
              "Los exoplanetas son planetas que orbitan estrellas diferentes al Sol.",
              "Desde 1992, hemos descubierto más de 5000 exoplanetas confirmados."
            ]
          },
          "metodo_transito": {
            "personaje": "Mateo",
            "explicacion": [
              "El método de tránsito detecta exoplanetas cuando pasan frente a su estrella.",
              "Como un eclipse, pero mucho más pequeño y preciso."
            ]
          },
          "telescopio_kepler": {
            "personaje": "Doña_Estela",
            "explicacion": [
              "El telescopio Kepler observó una región del cielo durante 9 años.",
              "Descubrió miles de candidatos a exoplanetas y revolucionó nuestro conocimiento."
            ]
          },
          "señales_falsas": {
            "personaje": "Amanda",
            "explicacion": [
              "No todas las señales son exoplanetas reales.",
              "Las estrellas binarias, manchas solares y ruido pueden crear señales falsas."
            ]
          },
          "clasificacion_exoplanetas": {
            "personaje": "Mateo",
            "explicacion": [
              "Los exoplanetas se clasifican por tamaño, composición y distancia a su estrella.",
              "Desde super-Tierras hasta gigantes gaseosos como Júpiter."
            ]
          },
          "zona_habitable": {
            "personaje": "Doña_Estela",
            "explicacion": [
              "La zona habitable es la distancia perfecta donde el agua puede ser líquida.",
              "Ni muy cerca (muy caliente) ni muy lejos (muy frío) de la estrella."
            ]
          }
        };

        // Probar diferentes rutas posibles
        const possiblePaths = [
          '/data/educacion_exoplanetas.json',
          './data/educacion_exoplanetas.json',
          `${process.env.PUBLIC_URL}/data/educacion_exoplanetas.json`
        ];
        
        let data = null;
        let loadedFromFile = false;
        
        for (const path of possiblePaths) {
          try {
            console.log(`Intentando cargar educación desde: ${path}`);
            const response = await fetch(path);
            
      if (!response.ok) {
              throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            
            const text = await response.text();
            console.log(`Respuesta educación recibida (${text.length} caracteres):`, text.substring(0, 200) + '...');
            
            if (!text.trim()) {
              throw new Error('Respuesta vacía');
            }
            
            data = JSON.parse(text);
            console.log('JSON educación parseado exitosamente desde archivo:', Object.keys(data));
            loadedFromFile = true;
            break;
            
    } catch (error) {
            console.warn(`Error con ruta educación ${path}:`, error.message);
          }
        }
        
        // Usar datos embebidos si no se pudo cargar desde archivo
        if (!loadedFromFile) {
          console.log('Usando datos educación embebidos como fallback');
          data = fallbackEducationData;
        }
        
        setEducationExplanations(data);
        console.log('Explicaciones educativas cargadas exitosamente');
        
    } catch (error) {
        console.error('Error cargando explicaciones educativas:', error);
        // Cargar datos por defecto para evitar errores
        setEducationExplanations({});
      }
    };
    
    loadEducationExplanations();
  }, []);

  // Cargar explicaciones de ML Pipeline al montar el componente
  useEffect(() => {
    const loadMlPipelineExplanations = async () => {
      try {
        // Datos embebidos como fallback para ML Pipeline
        const fallbackMlPipelineData = {
          "HistGradientBoostingClassifier": {
            "explicacion": [
              "Un algoritmo de machine learning que combina muchos árboles de decisión, ",
              "cada uno corrigiendo errores del anterior. Es potente para aprender relaciones ",
              "no lineales entre variables como duración, profundidad o forma del tránsito.",
            ]
          },
          "Imputación con la mediana": {
            "explicacion": [
              "Técnica usada para rellenar valores faltantes en los datos. ",
              "En lugar de borrar registros, se reemplazan los valores vacíos por la mediana, ",
              "evitando sesgos extremos y conservando la mayor parte de la información.",
            ]
          },
          "Escalado de variables": {
            "explicacion": [
              "Proceso de normalizar las magnitudes de distintas variables. ",
              "Ejemplo: comparar 'días' con 'partes por millón' sin que una domine a la otra. ",
              "Facilita que el modelo aprenda patrones equilibrados.",
            ]
          },
          "Clases (0, 1, 2)": {
            "explicacion": [
              "Las tres categorías que el modelo aprende a predecir: ",
              "0 = Falso positivo, 1 = Candidato, 2 = Confirmado. ",
              "Permite separar casos descartados de aquellos con mayor evidencia científica.",
            ]
          },
          "Calibración probabilística (sigmoid)": {
            "explicacion": [
              "Ajuste de las probabilidades del modelo usando una curva sigmoide. ",
              "Con esto, si el modelo dice 0.8, significa un 80% real de certeza. ",
              "Hace que el modelo sea confiable para tomar decisiones científicas.",
            ]
          },
          "Selective prediction (umbral τ)": {
            "explicacion": [
              "Estrategia en la que el modelo solo da una respuesta si está seguro. ",
              "Se fija un umbral de confianza τ = 0.75: si la predicción supera este valor, se acepta; ",
              "si no, el modelo se abstiene ('ABSTAIN'). ",
              "Así se reducen errores y se evitan conclusiones dudosas."
            ]
          },
          "Interpretabilidad": {
            "explicacion": [
              "Cualidad de un modelo que no solo acierta, sino que explica sus resultados ",
              "de forma comprensible y confiable. Fundamental en ciencia, donde las predicciones ",
              "deben ser transparentes para la comunidad investigadora."
            ]
          }
        };

        // Probar diferentes rutas posibles
        const possiblePaths = [
          '/data/ml_pipeline_exoplanets.json',
          './data/ml_pipeline_exoplanets.json',
          `${process.env.PUBLIC_URL}/data/ml_pipeline_exoplanets.json`
        ];
        
        let data = null;
        let loadedFromFile = false;
        
        for (const path of possiblePaths) {
          try {
            console.log(`Intentando cargar ML Pipeline desde: ${path}`);
            const response = await fetch(path);
            
            if (!response.ok) {
              throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            
            const text = await response.text();
            console.log(`Respuesta ML Pipeline recibida (${text.length} caracteres):`, text.substring(0, 200) + '...');
            
            if (!text.trim()) {
              throw new Error('Respuesta vacía');
            }
            
            data = JSON.parse(text);
            console.log('JSON ML Pipeline parseado exitosamente desde archivo:', Object.keys(data));
            loadedFromFile = true;
            break;
            
          } catch (error) {
            console.warn(`Error con ruta ML Pipeline ${path}:`, error.message);
          }
        }
        
        // Usar datos embebidos si no se pudo cargar desde archivo
        if (!loadedFromFile) {
          console.log('Usando datos ML Pipeline embebidos como fallback');
          data = fallbackMlPipelineData;
        }
        
        setMlPipelineExplanations(data);
        console.log('Explicaciones de ML Pipeline cargadas exitosamente');
        
    } catch (error) {
        console.error('Error cargando explicaciones de ML Pipeline:', error);
        // Cargar datos por defecto para evitar errores
        setMlPipelineExplanations({});
      }
    };
    
    loadMlPipelineExplanations();
  }, []);

  
  // Función para mostrar el modal de explicación de variable
  const handleShowVariableModal = (variableName) => {
    setSelectedVariable(variableName);
    setShowVariableModal(true);
  };

  // Función para cerrar el modal
  const handleCloseVariableModal = () => {
    setShowVariableModal(false);
    setSelectedVariable(null);
  };

  // Función para mostrar el modal de explicación educativa
  const handleShowEducationModal = (topicName) => {
    setSelectedEducationTopic(topicName);
    setShowEducationModal(true);
  };

  // Función para cerrar el modal educativo
  const handleCloseEducationModal = () => {
    setShowEducationModal(false);
    setSelectedEducationTopic(null);
  };

  // Función para mostrar el modal de explicación de ML Pipeline
  const handleShowMlPipelineModal = (topicName) => {
    setSelectedMlPipelineTopic(topicName);
    setShowMlPipelineModal(true);
  };

  // Función para cerrar el modal de ML Pipeline
  const handleCloseMlPipelineModal = () => {
    setShowMlPipelineModal(false);
    setSelectedMlPipelineTopic(null);
  };

  // Lista de variables disponibles
  const availableVariables = [
    "period_days", "duration_hours", "depth_ppm", "planet_radius_re", 
    "snr", "impact", "stellar_teff_k", "stellar_logg_cgs", 
    "stellar_radius_rsun", "mag", "fp_nt", "fp_ss", "fp_co", "fp_ec"
  ];

  // Lista de temas educativos disponibles
  const availableEducationTopics = [
    "exoplanetas", "metodo_transito", "telescopio_kepler", 
    "señales_falsas", "clasificacion_exoplanetas", "zona_habitable"
  ];

  // Lista de temas de ML Pipeline disponibles
  const availableMlPipelineTopics = [
    "HistGradientBoostingClassifier", "Imputación con la mediana", "Escalado de variables",
    "Clases (0, 1, 2)", "Calibración probabilística (sigmoid)", "Selective prediction (umbral τ)", "Interpretabilidad"
  ];

  return (
    <div className="modelo-container">
    <Container className="py-5">
        <h1 className="text-center modelo-title fw-bold mb-4" style={{ fontSize: "2.5rem" }}>Descubre mas alla del sistema solar</h1>

        {/* Sección de Variables de Exoplanetas */}
        <Card className="space-card p-4 mt-4 floating">
          <div className="space-card-header">
            <h2 className="section-title">Variables de Exoplanetas</h2>
          </div>
        <Card.Body>
            <p className="text-light text-center mb-4">
              Explora las variables utilizadas en la detección de exoplanetas. 
              Haz clic en cualquier variable para conocer su importancia y explicación detallada.
            </p>
            
            <div className="d-flex flex-wrap gap-2 justify-content-center">
              {availableVariables.map((variable, index) => (
                <Button
                  key={index}
                  variant="outline-info"
                  size="sm"
                  onClick={() => handleShowVariableModal(variable)}
                  className="variable-button"
                  style={{
                    borderColor: '#3b82f6',
                    color: '#ffffff',
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = 'rgba(59, 130, 246, 0.3)';
                    e.target.style.transform = 'scale(1.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'rgba(59, 130, 246, 0.1)';
                    e.target.style.transform = 'scale(1)';
                  }}
                >
                  {variable}
                </Button>
              ))}
            </div>
          </Card.Body>
        </Card>

        {/* Sección de Conocimientos Previos */}
        <Card className="space-card p-4 mt-4 floating">
          <div className="space-card-header">
            <h2 className="section-title">Conocimientos Previos</h2>
          </div>
          <Card.Body>
            <p className="text-light text-center mb-4">
              Aprende conceptos fundamentales sobre exoplanetas y su detección. 
              Haz clic en cualquier tema para obtener una explicación detallada.
            </p>
            
            <div className="d-flex flex-wrap gap-2 justify-content-center">
              {availableEducationTopics.map((topic, index) => (
                <Button
                  key={index}
                  variant="outline-success"
                  size="sm"
                  onClick={() => handleShowEducationModal(topic)}
                  className="education-button"
                  style={{
                    borderColor: '#10b981',
                    color: '#ffffff',
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = 'rgba(16, 185, 129, 0.3)';
                    e.target.style.transform = 'scale(1.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'rgba(16, 185, 129, 0.1)';
                    e.target.style.transform = 'scale(1)';
                  }}
                >
                  {topic.replace(/_/g, ' ')}
                </Button>
              ))}
            </div>
          </Card.Body>
        </Card>

        {/* Sección de ML Pipeline */}
        <Card className="space-card p-4 mt-4 floating">
          <div className="space-card-header">
            <h2 className="section-title">ML Pipeline</h2>
          </div>
          <Card.Body>
            <p className="text-light text-center mb-4">
              Explora los componentes del pipeline de machine learning para la clasificación de exoplanetas. 
              Haz clic en cualquier componente para conocer su función y importancia.
            </p>
            
            <div className="d-flex flex-wrap gap-2 justify-content-center">
              {availableMlPipelineTopics.map((topic, index) => (
                <Button
                  key={index}
                  variant="outline-warning"
                  size="sm"
                  onClick={() => handleShowMlPipelineModal(topic)}
                  className="ml-pipeline-button"
                  style={{
                    borderColor: '#f59e0b',
                    color: '#ffffff',
                    backgroundColor: 'rgba(245, 158, 11, 0.1)',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = 'rgba(245, 158, 11, 0.3)';
                    e.target.style.transform = 'scale(1.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'rgba(245, 158, 11, 0.1)';
                    e.target.style.transform = 'scale(1)';
                  }}
                >
                  {topic}
                </Button>
              ))}
            </div>
          </Card.Body>
        </Card>
        
        {/* Modal para explicación de variables */}
        <Modal 
          show={showVariableModal} 
          onHide={handleCloseVariableModal}
          centered
          size="lg"
          style={{ transform: 'scale(1.2)' }}
        >
          <Modal.Header 
            closeButton 
            style={{
              backgroundColor: 'rgba(15, 23, 42, 0.9)',
              borderBottom: '1px solid rgba(59, 130, 246, 0.3)'
            }}
          >
            <Modal.Title 
              className="text-white"
              style={{ fontFamily: 'Orbitron, Arial, sans-serif' }}
            >
              {selectedVariable && variableExplanations[selectedVariable]?.personaje}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body 
            style={{
              backgroundColor: 'rgba(15, 23, 42, 0.9)',
              color: '#ffffff'
            }}
          >
            {selectedVariable && variableExplanations[selectedVariable] ? (
              <div>
                <h5 className="text-info mb-3">
                  Variable: <span className="text-warning">{selectedVariable}</span>
                </h5>
                <div className="space-card p-3" style={{ minHeight: '180px' }}>
                  <div className="d-flex align-items-stretch" style={{ height: '100%' }}>
                    {/* Imagen del personaje */}
                    <div className="me-3 flex-shrink-0" style={{ height: '100%' }}>
                      <img 
                        src={`/images/${variableExplanations[selectedVariable].personaje.toLowerCase().replace(/\s+/g, '_')}.png`}
                        alt={variableExplanations[selectedVariable].personaje}
                        className="character-image"
                        style={{
                          width: '100px',
                          height: '150px',
                          borderRadius: '12px',
                          objectFit: 'cover',
                          border: '2px solid rgba(59, 130, 246, 0.3)',
                          boxShadow: '0 4px 15px rgba(59, 130, 246, 0.2)'
                        }}
                        onError={(e) => {
                          // Fallback si la imagen no existe
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'block';
                        }}
                      />
                      {/* Fallback si no hay imagen */}
                      <div 
                        style={{
                          width: '100px',
                          height: '150px',
                          borderRadius: '12px',
                          backgroundColor: 'rgba(59, 130, 246, 0.2)',
                          border: '2px solid rgba(59, 130, 246, 0.3)',
                          display: 'none',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '32px',
                          color: '#3b82f6'
                        }}
                      >
                        👤
                      </div>
                    </div>
                    
                    {/* Explicación */}
                    <div className="flex-grow-1">
                      <h6 className="text-white mb-2">
                        {variableExplanations[selectedVariable].personaje} explica:
                      </h6>
                      {variableExplanations[selectedVariable].explicacion.map((line, index) => (
                        <p key={index} className="mb-2 text-light">
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <h5 className="text-info mb-3">
                  Variable: <span className="text-warning">{selectedVariable}</span>
                </h5>
                <div className="space-card p-3" style={{ minHeight: '180px' }}>
                  <div className="d-flex align-items-stretch" style={{ height: '100%' }}>
                    {/* Imagen genérica */}
                    <div className="me-3 flex-shrink-0" style={{ height: '100%' }}>
                      <div 
                        style={{
                          width: '100px',
                          height: '150px',
                          borderRadius: '12px',
                          backgroundColor: 'rgba(59, 130, 246, 0.2)',
                          border: '2px solid rgba(59, 130, 246, 0.3)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '32px',
                          color: '#3b82f6'
                        }}
                      >
                        🤖
                      </div>
                    </div>
                    
                    {/* Explicación genérica */}
                    <div className="flex-grow-1">
                      <h6 className="text-white mb-2">
                        Sistema explica:
                      </h6>
                      <p className="text-light">
                        Esta variable es importante para el modelo de predicción de exoplanetas.
                      </p>
                      <p className="text-muted">
                        Las explicaciones detalladas no están disponibles en este momento.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </Modal.Body>
          <Modal.Footer 
            style={{
              backgroundColor: 'rgba(15, 23, 42, 0.9)',
              borderTop: '1px solid rgba(59, 130, 246, 0.3)'
            }}
          >
            <Button 
              onClick={handleCloseVariableModal}
              className="space-button"
            >
              Cerrar
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Modal para explicación educativa */}
        <Modal 
          show={showEducationModal} 
          onHide={handleCloseEducationModal}
          centered
          size="lg"
          style={{ transform: 'scale(1.2)' }}
        >
          <Modal.Header 
            closeButton 
            style={{
              backgroundColor: 'rgba(15, 23, 42, 0.9)',
              borderBottom: '1px solid rgba(16, 185, 129, 0.3)'
            }}
          >
            <Modal.Title 
              className="text-white"
              style={{ fontFamily: 'Orbitron, Arial, sans-serif' }}
            >
              {selectedEducationTopic && educationExplanations[selectedEducationTopic]?.personaje}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body 
            style={{
              backgroundColor: 'rgba(15, 23, 42, 0.9)',
              color: '#ffffff'
            }}
          >
            {selectedEducationTopic && educationExplanations[selectedEducationTopic] ? (
              <div>
                <h5 className="text-success mb-3">
                  Tema: <span className="text-warning">{selectedEducationTopic.replace(/_/g, ' ')}</span>
                </h5>
                <div className="space-card p-3" style={{ minHeight: '180px' }}>
                  <div className="d-flex align-items-stretch" style={{ height: '100%' }}>
                    {/* Imagen del personaje */}
                    <div className="me-3 flex-shrink-0" style={{ height: '100%' }}>
                      <img 
                        src={`/images/${educationExplanations[selectedEducationTopic].personaje.toLowerCase().replace(/\s+/g, '_')}.png`}
                        alt={educationExplanations[selectedEducationTopic].personaje}
                        className="character-image"
                        style={{
                          width: '100px',
                          height: '150px',
                          borderRadius: '12px',
                          objectFit: 'cover',
                          border: '2px solid rgba(16, 185, 129, 0.3)',
                          boxShadow: '0 4px 15px rgba(16, 185, 129, 0.2)'
                        }}
                        onError={(e) => {
                          // Fallback si la imagen no existe
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'block';
                        }}
                      />
                      {/* Fallback si no hay imagen */}
                      <div 
                        style={{
                          width: '100px',
                          height: '150px',
                          borderRadius: '12px',
                          backgroundColor: 'rgba(16, 185, 129, 0.2)',
                          border: '2px solid rgba(16, 185, 129, 0.3)',
                          display: 'none',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '32px',
                          color: '#10b981'
                        }}
                      >
                        👤
                      </div>
                    </div>
                    
                    {/* Explicación */}
                    <div className="flex-grow-1">
                      <h6 className="text-white mb-2">
                        {educationExplanations[selectedEducationTopic].personaje} explica:
                      </h6>
                      {educationExplanations[selectedEducationTopic].explicacion.map((line, index) => (
                        <p key={index} className="mb-2 text-light">
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <h5 className="text-success mb-3">
                  Tema: <span className="text-warning">{selectedEducationTopic}</span>
                </h5>
                <div className="space-card p-3" style={{ minHeight: '180px' }}>
                  <div className="d-flex align-items-stretch" style={{ height: '100%' }}>
                    {/* Imagen genérica */}
                    <div className="me-3 flex-shrink-0" style={{ height: '100%' }}>
                      <div 
                        style={{
                          width: '100px',
                          height: '150px',
                          borderRadius: '12px',
                          backgroundColor: 'rgba(16, 185, 129, 0.2)',
                          border: '2px solid rgba(16, 185, 129, 0.3)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '32px',
                          color: '#10b981'
                        }}
                      >
                        🤖
                      </div>
                    </div>
                    
                    {/* Explicación genérica */}
                    <div className="flex-grow-1">
                      <h6 className="text-white mb-2">
                        Sistema explica:
                      </h6>
                      <p className="text-light">
                        Este tema educativo es importante para entender la detección de exoplanetas.
                      </p>
                      <p className="text-muted">
                        Las explicaciones detalladas no están disponibles en este momento.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </Modal.Body>
          <Modal.Footer 
            style={{
              backgroundColor: 'rgba(15, 23, 42, 0.9)',
              borderTop: '1px solid rgba(16, 185, 129, 0.3)'
            }}
          >
            <Button 
              onClick={handleCloseEducationModal}
              style={{
                background: 'linear-gradient(135deg, #10b981, #059669)',
                border: 'none',
                borderRadius: '50px',
                color: 'white',
                fontWeight: '600',
                padding: '12px 30px',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 15px rgba(16, 185, 129, 0.3)'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 8px 25px rgba(16, 185, 129, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 15px rgba(16, 185, 129, 0.3)';
              }}
            >
              Cerrar
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Modal para explicación de ML Pipeline */}
        <Modal 
          show={showMlPipelineModal} 
          onHide={handleCloseMlPipelineModal}
          centered
          size="lg"
          style={{ transform: 'scale(1.2)' }}
        >
          <Modal.Header 
            closeButton 
            style={{
              backgroundColor: 'rgba(15, 23, 42, 0.9)',
              borderBottom: '1px solid rgba(245, 158, 11, 0.3)'
            }}
          >
            <Modal.Title 
              className="text-white"
              style={{ fontFamily: 'Orbitron, Arial, sans-serif' }}
            >
              ML Pipeline
            </Modal.Title>
          </Modal.Header>
          <Modal.Body 
            style={{
              backgroundColor: 'rgba(15, 23, 42, 0.9)',
              color: '#ffffff'
            }}
          >
            {selectedMlPipelineTopic && mlPipelineExplanations[selectedMlPipelineTopic] ? (
              <div>
                <h5 className="text-warning mb-3">
                  Componente: <span className="text-info">{selectedMlPipelineTopic}</span>
                </h5>
                <div className="space-card p-3" style={{ minHeight: '180px' }}>
                  <div className="d-flex align-items-stretch" style={{ height: '100%' }}>
                    {/* Imagen genérica para ML Pipeline */}
                    <div className="me-3 flex-shrink-0" style={{ height: '100%' }}>
                      <div 
                        style={{
                          width: '100px',
                          height: '150px',
                          borderRadius: '12px',
                          backgroundColor: 'rgba(245, 158, 11, 0.2)',
                          border: '2px solid rgba(245, 158, 11, 0.3)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '32px',
                          color: '#f59e0b'
                        }}
                      >
                        🤖
                      </div>
                    </div>
                    
                    {/* Explicación */}
                    <div className="flex-grow-1">
                      <h6 className="text-white mb-2">
                        Sistema ML explica:
                      </h6>
                      {mlPipelineExplanations[selectedMlPipelineTopic].explicacion.map((line, index) => (
                        <p key={index} className="mb-2 text-light">
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <h5 className="text-warning mb-3">
                  Componente: <span className="text-info">{selectedMlPipelineTopic}</span>
                </h5>
                <div className="space-card p-3" style={{ minHeight: '180px' }}>
                  <div className="d-flex align-items-stretch" style={{ height: '100%' }}>
                    {/* Imagen genérica */}
                    <div className="me-3 flex-shrink-0" style={{ height: '100%' }}>
                      <div 
                        style={{
                          width: '100px',
                          height: '150px',
                          borderRadius: '12px',
                          backgroundColor: 'rgba(245, 158, 11, 0.2)',
                          border: '2px solid rgba(245, 158, 11, 0.3)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '32px',
                          color: '#f59e0b'
                        }}
                      >
                        🤖
                      </div>
                    </div>
                    
                    {/* Explicación genérica */}
                    <div className="flex-grow-1">
                      <h6 className="text-white mb-2">
                        Sistema ML explica:
                      </h6>
                      <p className="text-light">
                        Este componente es importante para el pipeline de machine learning de exoplanetas.
                      </p>
                      <p className="text-muted">
                        Las explicaciones detalladas no están disponibles en este momento.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </Modal.Body>
          <Modal.Footer 
            style={{
              backgroundColor: 'rgba(15, 23, 42, 0.9)',
              borderTop: '1px solid rgba(245, 158, 11, 0.3)'
            }}
          >
            <Button 
              onClick={handleCloseMlPipelineModal}
              style={{
                background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                border: 'none',
                borderRadius: '50px',
                color: 'white',
                fontWeight: '600',
                padding: '12px 30px',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 15px rgba(245, 158, 11, 0.3)'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 8px 25px rgba(245, 158, 11, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 15px rgba(245, 158, 11, 0.3)';
              }}
            >
              Cerrar
            </Button>
          </Modal.Footer>
        </Modal>
    </Container>
    </div>
  );
};

export default Modelo;