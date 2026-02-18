function Menu() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <a className="navbar-brand" href="#">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
            alt="Logo"
            width="30"
            height="30"
            className="d-inline-block align-top me-2"
          />
          Composite View
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a className="nav-link active" href="#">Inicio</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Acerca de</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Servicios</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Contacto</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Menu;
