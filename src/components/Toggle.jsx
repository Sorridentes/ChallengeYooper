import toggle from '../assets/toggle/Group 6.png'
import heroIcon from '../assets/icones/heroi/noun_Superhero_2227044.png'
import heart from '../assets/icones/heart/Path@1,5x.png'

function Toggle() {
    return (
        <div className="toggle-container">
            <div className="toggle-text">
                <img src={heroIcon} alt="Icone de Heroi" />
                <p>Ordenar por nome - A/Z</p>
            </div>
            <button className="switch">
                <img src={toggle} alt="Toggle" />
            </button>
            <div className="toggle-text">
                <img src={heart} alt="Icone de Favorito" />
                <p>Somente favoritos</p>
            </div>
        </div>
    )
}

export default Toggle;
