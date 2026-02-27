import imagen1 from '../assets/1.jpg';
import imagen2 from '../assets/2.jpg';
import imagen3 from '../assets/3.jpg';

function Carusel() {
  return (
    <div id="carouselExample" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-indicators">
        <button type="button" data-bs-target="#carouselExample" data-bs-slide-to="0" className="active"></button>
        <button type="button" data-bs-target="#carouselExample" data-bs-slide-to="1"></button>
        <button type="button" data-bs-target="#carouselExample" data-bs-slide-to="2"></button>
      </div>
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img src={imagen1} className="d-block w-100" alt="Imagen 1" />
          <div className="carousel-caption d-none d-md-block">
            <h5>Primera Imagen</h5>
            <p>Descripción de la primera imagen del carrusel.</p>
          </div>
        </div>
        <div className="carousel-item">
          <img src={imagen2} className="d-block w-100" alt="Imagen 2" />
          <div className="carousel-caption d-none d-md-block">
            <h5>Segunda Imagen</h5>
            <p>Descripción de la segunda imagen del carrusel.</p>
          </div>
        </div>
        <div className="carousel-item">
          <img src={imagen3} className="d-block w-100" alt="Imagen 3" />
          <div className="carousel-caption d-none d-md-block">
            <h5>Tercera Imagen</h5>
            <p>Descripción de la tercera imagen del carrusel.</p>
          </div>
        </div>
      </div>
      <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
        <span className="carousel-control-prev-icon"></span>
        <span className="visually-hidden">Anterior</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
        <span className="carousel-control-next-icon"></span>
        <span className="visually-hidden">Siguiente</span>
      </button>
    </div>
  );
}

export default Carusel;
