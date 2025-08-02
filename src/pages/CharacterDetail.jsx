import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import heroes from "../mavel-heroes.json";
import "../style/CharacterDetail.css";
import Search from "../components/Search";
import FavoriteButton from "../components/FavoriteButton";
import ComicsCards from "../components/ComicsCards";
import marvelLogo from "../assets/logo/Group.png";
import book from "../assets/icones/book/Group.png";
import video from "../assets/icones/video/Shape.png";

function CharacterDetail({ tasks, onSwitchFavorite }) {
  const [character, setCharacter] = useState(null);
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const id = searchParams.get("id");
    if (id) {
      const found = tasks.find((char) => char.id.toString() === id);
      setCharacter(found);
    }
  }, [searchParams]);

  if (!character) {
    return <div>Personagem não encontrado</div>;
  }

  function formatMarvelDate(dateString) {
    const date = new Date(dateString);
    const options = { day: "2-digit", month: "short", year: "numeric" };
    return date.toLocaleDateString("pt-BR", options).replace(/ de /g, " ");
  }

  return (
    <div className="character-detail-page">
      <header className="header-detail">
        <a href="/">
          <img src={marvelLogo} alt="Marvel Logo" className="logo" />
        </a>
        <Search
          tasks={heroes.data.results}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
      </header>
      <section className="character-detail">
        <div className="watermark">{character.name.split("(")[0]}</div>
        <div className="character-main-info">
          <figure>
            <img
              src={`${character.thumbnail.path}/portrait_uncanny.${character.thumbnail.extension}`}
              alt={character.name}
              className="main-character-img"
            />
          </figure>
          <div className="character-info">
            <div className="character-header">
              <h1>{character.name}</h1>
              <FavoriteButton
                isFavorite={character.favorite}
                onSwitchFavorite={() => {
                  const updatedTasks = onSwitchFavorite(character.id);
                  setCharacter(
                    updatedTasks.find((task) => task.id === character.id)
                  );
                }}
              />
            </div>
            <p className="character-text">{character.description}</p>
            <div className="character-stats">
              <section className="icons-info">
                <div className="icon-info">
                  <h5>Quadrinhos</h5>
                  <div className="icon">
                    <img src={book} alt="Icone de livro" />
                    <span>{character.comics.available}</span>
                  </div>
                </div>
                <div className="icon-info">
                  <h5>Filmes</h5>
                  <div className="icon">
                    <img src={video} alt="Icone para filme" />
                    <span>{character.movies}</span>
                  </div>
                </div>
              </section>
              <div>
                <h5>Rating:</h5>
                <div style={{ display: "flex", gap: "2px" }}>
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      width="17px"
                      height="15px"
                      viewBox="0 0 17 15"
                      xmlns="http://www.w3.org/2000/svg"
                      style={{ display: "inline-block" }}
                    >
                      <path
                        d="M15.3176118,5.26581107 L10.683489,4.53399175 C10.683489,4.53399175 9.49540914,1.88164657 8.72713108,0.578968174 C7.95783409,-0.723710218 7.39945693,0.578968174 7.39945693,0.578968174 L5.32592133,4.53399175 L0.598056353,5.21982243 C-0.61244011,5.76868692 0.389174388,6.56948922 0.389174388,6.56948922 L3.62531645,9.65272802 L2.83258391,14.1786107 C2.66955409,15.5262779 4.09097039,14.7954584 4.09097039,14.7954584 L8.02610283,12.8289439 L12.0345987,14.8404473 C13.4091439,15.457295 13.1523719,14.0866334 13.1523719,14.0866334 L12.4523626,9.67572234 L15.5968004,6.54549514 C16.645286,5.58373259 15.3176118,5.26581107 15.3176118,5.26581107 Z"
                        fill={i < character.rating ? "#FF1510" : "none"}
                        stroke="#ff1510"
                      />
                    </svg>
                  ))}
                </div>
              </div>
              <div className="last-comic">
                <h5>Último quadrinho:</h5>
                <span>
                  {character.comics.returned > 0
                    ? formatMarvelDate(character.modified)
                    : "-"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="character-comics">
        <h2>Últimos lançamentos</h2>
        <ComicsCards character={character} />
      </section>
    </div>
  );
}

export default CharacterDetail;
