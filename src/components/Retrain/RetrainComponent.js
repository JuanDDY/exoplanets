// RetrainComponent.js
import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Table, Card } from "react-bootstrap";
import Papa from "papaparse";
import "./RetrainComponent.css";

const RetrainComponent = () => {
  // Estados para la carga por CSV
  const [fileName, setFileName] = useState("");
  const [fileData, setFileData] = useState(null);
  const [trainingMetrics, setTrainingMetrics] = useState(null);

  // Función para manejar la subida del CSV
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (result) => {
          setFileData(result.data);
          console.log("Datos parseados:", result.data);
        },
      });
    }
  };

  // Función para enviar el archivo CSV a la API para reentrenamiento
  const handleRetrainData = async () => {
    if (!fileData) {
      alert("Por favor, seleccione un archivo.");
      return;
    }
    // Se espera que el CSV tenga las columnas "Titulo", "Descripcion" y "Label"
    const dataToSend = fileData.map((row) => ({
      Titulo: row.Titulo,
      Descripcion: row.Descripcion,
      sdg: row.Label,
    }));
  
    // Construir payload: 'messages' es la concatenación de Titulo y Descripcion; 'sdg' es el label de cada registro.
    const payload = {
      messages: dataToSend.map((row) => `${row.Titulo} ${row.Descripcion}`),
      sdg: dataToSend.map((row) => row.sdg),
    };
  
    console.log("Datos enviados al API:", JSON.stringify(payload, null, 2));
  
    try {
      const response = await fetch("http://127.0.0.1:8000/retrain", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
        },
        body: JSON.stringify(payload),
      });
  
      if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.statusText}`);
      }
  
      const result = await response.json();
      console.log("Respuesta de la API:", result);
      // Simplemente se muestran las métricas en la ventana (tabla)
      setTrainingMetrics(result);
    } catch (error) {
      console.error("Error en el reentrenamiento del modelo:", error);
      alert("Error en el reentrenamiento del modelo.");
    }
  };
  
  return (
    <div className="retrain-container">
      <Container className="py-5">
        <h1 className="retrain-title text-center mb-4" style={{ fontSize: "2.5rem" }}>Reentrenamiento del Modelo IA</h1>
      
        <Card className="space-card p-4 floating">
          <div className="space-card-header">
            <h2 className="section-title">Subida de Archivo CSV</h2>
          </div>
          <Card.Body>
          <Row className="justify-content-center">
            <Col md={8}>
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label className="space-label">Subir archivo CSV (columnas: <span style={{color: "#3b82f6"}}>Título</span> y <span style={{color: "#3b82f6"}}>Descripción</span>)</Form.Label>
                <Form.Control type="file" accept=".csv" onChange={handleFileChange} className="space-input" />
                {fileName && <p className="mt-2 file-success">Archivo seleccionado: {fileName}</p>}
              </Form.Group>
            </Col>
          </Row>
          {fileData && (
            <Row className="mt-3 text-center">
              <Col>
                <Button onClick={handleRetrainData} className="space-button">
                  Realizar Reentrenamiento
                </Button>
              </Col>
            </Row>
          )}
        </Card.Body>
      </Card>
      
        {trainingMetrics && (
          <Card className="space-card p-4 mt-4 floating">
            <div className="space-card-header">
              <h3 className="section-title">Métricas del Reentrenamiento</h3>
            </div>
            <Card.Body>
              <Table responsive className="space-table mt-3 text-center">
                <thead>
                  <tr>
                    <th>Precisión</th>
                    <th>Recall</th>
                    <th>F1-Score</th>
                    <th>Accuracy</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="metric-value">{trainingMetrics.precision}</td>
                    <td className="metric-value">{trainingMetrics.recall}</td>
                    <td className="metric-value">{trainingMetrics.f1score}</td>
                    <td className="metric-value">{trainingMetrics.acuracy}</td>
                  </tr>
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        )}
      </Container>
    </div>
  );
};

export default RetrainComponent;
