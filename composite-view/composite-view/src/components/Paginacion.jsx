import { useState } from 'react';

function Paginacion() {
  const [paginaActual, setPaginaActual] = useState(1);
  const totalPaginas = 5;

  const contenido = {
    1: "Bienvenido al patrón Composite View. Este patrón permite componer una página a partir de múltiples subvistas independientes.",
    2: "Cada componente (Menu, Carusel, Paginacion) es una vista independiente que se combina en la vista principal.",
    3: "La ventaja principal es la reutilización: cada componente se puede usar en diferentes páginas sin modificarlo.",
    4: "En React, cada componente es un archivo .jsx separado que se importa y se usa como una etiqueta HTML personalizada.",
    5: "Este es un ejemplo de SPA (Single Page Application): toda la navegación ocurre sin recargar la página."
  };

  return (
    <div>
      <div className="card mb-3">
        <div className="card-body">
          <h5 className="card-title">Página {paginaActual}</h5>
          <p className="card-text">{contenido[paginaActual]}</p>
        </div>
      </div>

      <nav>
        <ul className="pagination justify-content-center">
          <li className={`page-item ${paginaActual === 1 ? 'disabled' : ''}`}>
            <button className="page-link" onClick={() => setPaginaActual(paginaActual - 1)}>
              Anterior
            </button>
          </li>
          {[...Array(totalPaginas)].map((_, i) => (
            <li key={i + 1} className={`page-item ${paginaActual === i + 1 ? 'active' : ''}`}>
              <button className="page-link" onClick={() => setPaginaActual(i + 1)}>
                {i + 1}
              </button>
            </li>
          ))}
          <li className={`page-item ${paginaActual === totalPaginas ? 'disabled' : ''}`}>
            <button className="page-link" onClick={() => setPaginaActual(paginaActual + 1)}>
              Siguiente
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Paginacion;
