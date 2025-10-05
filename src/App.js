import './App.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import Modelo from "./components/modelo/modelo";
import PredictionComponent from './components/Prediction/PredictionComponent';
//import RetrainComponent from './components/Retrain/RetrainComponent';
import GrupoDescripcion from "./components/nosotros/Grupo_descripcion";


function App() {
  return (
    <div className="App">
      
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/educacion" element={<Modelo />} />
            <Route path="/prediccion" element={<PredictionComponent />} />
            <Route path="/descripcion" element={<GrupoDescripcion />} />
            <Route path="*" element={<Home />} /> {/* 404 -> Home */}
          </Routes>
        </BrowserRouter>
      
    </div>
  );
}

export default App;
