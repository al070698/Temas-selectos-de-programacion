import Menu from './components/Menu.jsx';
import Carusel from './components/Carusel.jsx';
import Paginacion from './components/Paginacion.jsx';

function App() {
  return (
    <>
      {/* Vista compuesta: Menu */}
      <Menu />

      {/* Contenedor principal */}
      <div className="principal">
        {/* Vista compuesta: Carusel */}
        <Carusel />

        {/* Vista compuesta: Paginacion */}
        <div className="container mt-4">
          <h2 className="mb-3">Contenido con Paginación</h2>
          <Paginacion />
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-dark text-white text-center py-3 mt-4">
        <p className="mb-0">Composite View - Patrón de Diseño © 2025</p>
      </footer>
    </>
  );
}

export default App
