import React from 'react';
import './GrupoDescripcion.css';

const GrupoDescripcion = () => {
    const groupInfo = {
        name: "Exo Analytics",
        description: "Exoanalitys es un equipo dedicado al análisis y divulgación del universo, en especial de los exoplanetas y los métodos que permiten descubrirlos. Nos enfocamos en transformar datos científicos en conocimiento claro, accesible y atractivo, combinando curiosidad, creatividad y rigor académico. Nuestra visión es acercar la exploración espacial a más personas, mostrando cómo la ciencia y la tecnología nos ayudan a comprender mejor nuestro lugar en el cosmos.",
        members: [
            { name: "Helen Penagos", role: "Ingeniera de datos" },
            { name: "Valentina Rodriguez", role: "Analista de datos" },
            { name: "Sharek Marin", role: "Cientifica de datos" },
            { name: "Juan David Duarte", role: "Ingeniero de sistemas / Matematico" }
        ],
        projects: [
            "Exploración de datos astronómicos para identificar exoplanetas.",
            "Aplicación de inteligencia artificial al análisis de señales de tránsito planetario.",
            "Desarrollo de herramientas que aceleren la detección de nuevos mundos."
        ]
    };

    return (
        <div className="grupo-container">
            <div className="grupo-card">
                <h1 className="grupo-title">{groupInfo.name}</h1>

                <p className="grupo-description">{groupInfo.description}</p>

                <h2 className="section-title">Miembros del equipo</h2>

                <ul className="members-list">
                    {groupInfo.members.map((member, index) => (
                        <li key={index} className="member-item">
                            <span className="member-name">{member.name}</span>
                            <span className="member-role">- {member.role}</span>
                        </li>
                    ))}
                </ul>

                <h2 className="section-title">Proyecto Actual</h2>

                <ul className="projects-list">
                    {groupInfo.projects.map((project, index) => (
                        <li key={index} className="project-item">
                            {project}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default GrupoDescripcion;
