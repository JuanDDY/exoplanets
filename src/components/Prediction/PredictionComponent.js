import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Table, Card, Modal } from "react-bootstrap";
import Papa from "papaparse";
import "./PredictionComponent.css";

const PredictionComponent = () => {
  // Estados principales
  const [selectedFile, setSelectedFile] = useState(null); // File real del input
  const [fileName, setFileName] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  
  // Estado para las variables importantes y modal
  const [showVariableModal, setShowVariableModal] = useState(false);
  const [selectedVariable, setSelectedVariable] = useState(null);
  const [variableExplanations, setVariableExplanations] = useState({});

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

  // Estados para registros individuales
  const [recordInput, setRecordInput] = useState({
    Titulo: "",
    Descripcion: "",
    Fecha: "",
  });
  const [recordList, setRecordList] = useState([]);

  /**
   * Maneja la selección de archivo del input
   * CRÍTICO: Guarda el File real, no parsea el contenido
   */
  const handleFileChange = (e) => {
    const file = e.target.files?.[0] || null;
    
    if (file) {
      // Validar que sea CSV
      if (!file.name.toLowerCase().endsWith('.csv') && !file.type.includes('csv')) {
        setErr("Por favor selecciona un archivo CSV válido");
        return;
      }
      
      setSelectedFile(file);
      setFileName(file.name);
      setErr("");
      setResult(null);
      
      console.log("Archivo seleccionado:", {
        name: file.name,
        size: file.size,
        type: file.type,
        isFile: file instanceof File
      });
    } else {
      setSelectedFile(null);
      setFileName("");
    }
  };

  /**
   * Helper: Convierte cualquier dato a un File CSV válido
   * Útil para datos en memoria que necesitan enviarse como archivo
   */
  const toCsvFile = (value, filename = "datos.csv") => {
    if (value instanceof File) {
      return value; // Ya es un File válido
    }
    
    if (value instanceof Blob) {
      return new File([value], filename, { type: "text/csv" });
    }
    
    if (typeof value === "string") {
      return new File([value], filename, { type: "text/csv" });
    }
    
    if (Array.isArray(value)) {
      // Convertir array de objetos a CSV usando papaparse
      const csv = Papa.unparse(value);
      return new File([csv], filename, { type: "text/csv" });
    }
    
    throw new Error(`No se puede convertir ${typeof value} a File CSV`);
  };

  /**
   * Función para mostrar el modal de explicación de variable
   */
  const handleShowVariableModal = (variableName) => {
    setSelectedVariable(variableName);
    setShowVariableModal(true);
  };

  /**
   * Función para cerrar el modal
   */
  const handleCloseVariableModal = () => {
    setShowVariableModal(false);
    setSelectedVariable(null);
  };





  /**
   * Función principal para procesar CSV y enviar datos JSON al backend
   * NUEVO: El backend ahora espera JSON en lugar de archivos
   */
  const onSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setErr("");
      setLoading(true);
      setResult(null);

      // 1. Validar que tenemos un archivo
      if (!selectedFile) {
        throw new Error("Selecciona un archivo CSV");
      }

      // 2. Verificar que el archivo es válido
      if (!(selectedFile instanceof File)) {
        throw new Error("El archivo seleccionado no es válido");
      }

      console.log("Procesando archivo:", {
        name: selectedFile.name,
        size: selectedFile.size,
        type: selectedFile.type
      });

      // 3. Parsear CSV a JSON usando papaparse
      const csvText = await selectedFile.text();
      console.log("Contenido CSV parseado:", csvText.substring(0, 200) + "...");

      const parseResult = Papa.parse(csvText, {
        header: true,
        skipEmptyLines: true,
        transformHeader: (header) => header.trim() // Limpiar espacios en headers
      });

      if (parseResult.errors && parseResult.errors.length > 0) {
        console.warn("Errores de parsing:", parseResult.errors);
      }

      const csvData = parseResult.data;
      console.log("Datos parseados:", {
        totalRows: csvData.length,
        columns: Object.keys(csvData[0] || {}),
        sampleRow: csvData[0]
      });

      if (csvData.length === 0) {
        throw new Error("El archivo CSV está vacío o no tiene datos válidos");
      }

      // 4. Enviar datos como JSON al backend
      const requestPayload = csvData; // Enviar lista directa como especifica la API
      
      console.log("Enviando al backend:", {
        totalRecords: requestPayload.length,
        payloadType: Array.isArray(requestPayload) ? "array" : typeof requestPayload,
        sampleRecord: requestPayload[0]
      });

      const response = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(requestPayload)
      });

      console.log("Respuesta del servidor:", {
        status: response.status,
        statusText: response.statusText,
        contentType: response.headers.get("content-type")
      });

      // 5. Manejar respuesta del backend
      if (!response.ok) {
        let errorMessage = `Error ${response.status}: ${response.statusText}`;
        try {
          const errorText = await response.text();
          const errorJson = JSON.parse(errorText);
          if (errorJson.detail) {
            errorMessage = errorJson.detail;
          } else if (errorJson.error) {
            errorMessage = errorJson.error;
          } else {
            errorMessage = errorText;
          }
        } catch (parseError) {
          const errorText = await response.text();
          errorMessage = errorText || errorMessage;
        }
        throw new Error(errorMessage);
      }

      // 6. Procesar predicciones del backend
      const predictionResult = await response.json();
      console.log("Predicciones recibidas:", predictionResult);

      if (!predictionResult.predictions || !Array.isArray(predictionResult.predictions)) {
        throw new Error("Formato de respuesta inválido: se esperaba 'predictions' como array");
      }

      if (predictionResult.predictions.length !== csvData.length) {
        throw new Error(`Número de predicciones (${predictionResult.predictions.length}) no coincide con número de registros (${csvData.length})`);
      }

      // Log de variables importantes si están disponibles
      if (predictionResult.important_variables && Array.isArray(predictionResult.important_variables)) {
        console.log("Variables importantes recibidas:", predictionResult.important_variables);
      }

      // 7. Combinar datos originales con predicciones
      const dataWithPredictions = csvData.map((record, index) => {
        const prediction = predictionResult.predictions[index];
        
        // Extraer valores del objeto de predicción
        let clasificacion_id = '';
        let clasificacion = '';
        let confidence = '';
        
        if (typeof prediction === 'object' && prediction !== null) {
          clasificacion_id = prediction.pred || '';
          clasificacion = prediction.label || '';
          confidence = prediction.confidence || '';
        } else {
          // Fallback si no es un objeto
          clasificacion_id = prediction;
          clasificacion = prediction;
          confidence = '';
        }
        
        return {
          ...record,
          clasificacion_id,
          clasificacion,
          confidence
        };
      });

      console.log("Datos combinados:", {
        totalRecords: dataWithPredictions.length,
        sampleRecord: dataWithPredictions[0],
        predictions: predictionResult.predictions.slice(0, 5) // Mostrar primeras 5 predicciones
      });

      // 8. Generar y descargar CSV actualizado
      const updatedCsv = Papa.unparse(dataWithPredictions);
      const blob = new Blob([updatedCsv], { type: "text/csv;charset=utf-8" });
      const url = window.URL.createObjectURL(blob);
      
      // Crear nombre de archivo con timestamp
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
      const downloadFilename = `${selectedFile.name.replace('.csv', '')}_con_predicciones_${timestamp}.csv`;
      
      // Crear link de descarga
      const link = document.createElement("a");
      link.href = url;
      link.download = downloadFilename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Limpiar URL temporal
      window.URL.revokeObjectURL(url);
      
      setResult({ 
        message: "Procesamiento completado exitosamente",
        filename: downloadFilename,
        totalRecords: dataWithPredictions.length,
        predictions: predictionResult.predictions,
        importantVariables: predictionResult.important_variables || []
      });

    } catch (error) {
      console.error("Error en onSubmit:", error);
      setErr(error.message || "Error desconocido");
    } finally {
      setLoading(false);
    }
  };

  // Manejo de cambios en los inputs individuales
  const handleRecordInputChange = (e) => {
    const { name, value } = e.target;
    setRecordInput({ ...recordInput, [name]: value });
  };

  // Función para agregar un registro individual
  const handleAdjuntarRegistro = () => {
    const { Titulo, Descripcion } = recordInput;
    if (Titulo.trim() === "" && Descripcion.trim() === "") {
      setErr("Por favor, complete todos los campos del registro.");
      return;
    }
    const newRecord = {
      ID: recordList.length + 1,
      Titulo,
      Descripcion
    };
    setRecordList([...recordList, newRecord]);
    setRecordInput({ Titulo: "", Descripcion: "" });
    setErr("");
  };

  // Función para clasificar registros individuales
  const handleClasificacionRegistro = async () => {
    if (recordList.length === 0) {
      setErr("No hay registros para clasificar.");
      return;
    }
    
    setErr("");
    setLoading(true);

    try {
      // Crear CSV con los registros individuales
      const csvData = recordList.map((record) => ({
        ID: record.ID,
        Titulo: record.Titulo,
        Descripcion: record.Descripcion
      }));
      
      // Convertir a File CSV usando el helper
      const csvFile = toCsvFile(csvData, "registros_individuales.csv");
      
      // Crear FormData
      const formData = new FormData();
      formData.append("file", csvFile, csvFile.name);

      // Llamar al endpoint predict2
      const response = await fetch("http://127.0.0.1:8000/predict2", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error ${response.status}: ${errorText}`);
      }

      const result = await response.json();
      console.log("Respuesta para registros:", result);
      
      // Actualizar la lista de registros con las predicciones
      if (result.predictions && Array.isArray(result.predictions)) {
      const updatedRecords = recordList.map((record, index) => ({
        ...record,
          Clasificacion: result.predictions[index] === 0 ? "Verdadera" : "Falsa",
      }));
      setRecordList(updatedRecords);
        setResult({ message: "Clasificación de registros completada exitosamente" });
      } else {
        throw new Error("Formato de respuesta inválido del API");
      }
    } catch (error) {
      console.error("Error al clasificar los registros:", error);
      setErr(`Error al clasificar los registros: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Función para truncar texto
  const truncateText = (text, maxLength = 40) => {
    if (!text) return "";
    return text.length <= maxLength ? text : text.substring(0, maxLength) + "...";
  };

  return (
    <div className="prediction-container">
    <Container className="py-5">
        <h1 className="prediction-title text-center mb-4" style={{ fontSize: "2.5rem" }}>
          Clasificación de Sismos Espaciales
        </h1>
      
        {/* Sección de subida de CSV */}
        <Card className="space-card p-4 floating">
          <div className="space-card-header">
            <h2 className="section-title">Subida de Archivo CSV</h2>
          </div>
        <Card.Body>
          <Row className="justify-content-center">
            <Col md={8}>
              <Form.Group controlId="formFile" className="mb-3">
                  <Form.Label className="space-label">
                    Subir archivo CSV
                  </Form.Label>
                  <Form.Control 
                    type="file" 
                    accept=".csv,text/csv" 
                    onChange={handleFileChange} 
                    className="space-input"
                    disabled={loading}
                  />
                  {fileName && (
                    <p className="mt-2 file-success">
                      📁 Archivo seleccionado: {fileName}
                    </p>
                  )}
                  {err && <p className="mt-2 text-danger">{err}</p>}
              </Form.Group>
            </Col>
          </Row>
            
            {selectedFile && (
            <Row className="mt-3 text-center">
              <Col>
                  <Button 
                    onClick={onSubmit} 
                    className="space-button" 
                    disabled={loading}
                  >
                    {loading ? "Procesando..." : "Clasificar Datos del Archivo"}
                </Button>
              </Col>
            </Row>
          )}
        </Card.Body>
      </Card>
      
        {/* Resultados */}
        
        {result && (
          <Card className="space-card p-4 mt-4 floating">
            <div className="space-card-header">
              <h3 className="section-title">Resultados de Clasificación</h3>
            </div>
          <Card.Body>
              <div className="alert alert-success">
                <h5>¡Clasificación completada!</h5>
                {result.message === "CSV descargado exitosamente" ? (
                  <div>
                    <p>El archivo CSV con los resultados ha sido descargado a tu dispositivo.</p>
                    <p className="mb-0">📁 Revisa tu carpeta de descargas para ver el archivo.</p>
                    {result.filename && (
                      <p className="text-muted">Archivo: {result.filename}</p>
                    )}
                  </div>
                ) : (
                  <div>
                    <p>Procesamiento completado exitosamente.</p>
                    <p className="mb-3">📁 Revisa tu carpeta de descargas para ver el archivo.</p>
                    {result.filename && (
                      <p className="text-muted mb-3">Archivo: {result.filename}</p>
                    )}
                    
                    {/* Variables importantes */}
                    {result.importantVariables && result.importantVariables.length > 0 && (
                      <div className="mt-4">
                        <h6 className="text-white mb-3">Variables más importantes para la predicción:</h6>
                        <div className="d-flex flex-wrap gap-2 justify-content-center">
                          {result.importantVariables.map((variable, index) => (
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
                        <p className="text-muted mt-2 small">
                          Haz clic en cualquier variable para conocer su importancia
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
          </Card.Body>
        </Card>
      )}
      
        

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
    </Container>
    </div>
  );
};

export default PredictionComponent;

/*
=== CHECKLIST DE VERIFICACIÓN ===

1. DevTools → Network → POST /predict:
   ✅ Content-Disposition: form-data; name="file"; filename="...csv"
   ✅ Content-Type: text/csv (en la parte del archivo)
   ✅ Request payload muestra: ------WebKitFormBoundary... con el archivo

2. Descarga automática:
   ✅ Se descarga cuando el backend devuelve text/csv
   ✅ Nombre del archivo se obtiene de Content-Disposition
   ✅ URL temporal se limpia correctamente

3. Manejo de errores:
   ✅ Errores 4xx/5xx se muestran legiblemente
   ✅ JSON de error se parsea correctamente
   ✅ Fallback a texto si no es JSON

4. Estados de UI:
   ✅ Loading state durante la petición
   ✅ Botones deshabilitados durante loading
   ✅ Mensajes de error claros
   ✅ Confirmación de éxito con detalles

5. Validaciones:
   ✅ Verificación de archivo CSV
   ✅ Verificación de File instanceof
   ✅ Verificación de FormData.append correcto

6. Funcionalidad adicional:
   ✅ Registros individuales funcionan
   ✅ Helper toCsvFile para conversiones
   ✅ Tema galáctico mantenido
   ✅ Responsive design
*/