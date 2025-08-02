import heroIcon from "../assets/icones/heroi/noun_Superhero_2227044.png";
import heart from "../assets/icones/heart/Path.svg";
import "../style/Toggle.css";

function Toggle({ toggleState, handleToggleChange }) {
  return (
    <div className="toggle-container">
      <div className={`toggle-text ${toggleState ? "grayscale" : ""}`}>
        <img src={heroIcon} alt="Icone de Heroi" />
        <p>Ordenar por nome - A/Z</p>
      </div>
      <label className="switch">
        <input
          type="checkbox"
          defaultChecked={toggleState}
          onClick={handleToggleChange}
        />
        <span className="slider"></span>
      </label>
      <div className={`toggle-text ${!toggleState ? "grayscale" : ""}`}>
        <img src={heart} alt="Icone de Favorito" />
        <p>Somente favoritos</p>
      </div>
    </div>
  );
}

export default Toggle;
