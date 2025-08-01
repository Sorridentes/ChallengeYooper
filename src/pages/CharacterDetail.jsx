import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import heroes from "../apiMavel.json";
import marvelLogo from "../assets/logo/Group.png";
import Search from "../components/Search";
import FavoriteButton from "../components/FavoriteButton";
import "../style/CharacterDetail.css";

function CharacterDetail() {
  const [id, setId] = useState("");
  const [character, setCharacter] = useState(null);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    setId(searchParams.get("id"));
    setCharacter(heroes.data.results.filter((char) => char.id.toString() === id));
  }, []);

  if (!character) {
    return <div>Pessonagem não encontrado</div>;
  }

  return (
    <div className="character-detail-page">
      <header className="header-detail">
        <img src={marvelLogo} alt="Marvel Logo" className="logo" />
        <Search tasks={heroes.data.results} />
      </header>
      <section className="character-main-info">
        <div className="character-text">
          {/* <h1>
            {character.name}
            <FavoriteButton isFavorite={false} onSwitchFavorite={() => {}} />
          </h1>
          <p>{character.description}</p> */}
          <div className="character-stats">
            <div>
              <span role="img" aria-label="Quadrinhos">
                📚
              </span>
              {/* <span>{character.comics.available}</span> */}
              <span>Quadrinhos</span>
            </div>
            <div>
              <span role="img" aria-label="Filmes">
                🎬
              </span>
              {/* <span>{character.series.available}</span> */}
              <span>Filmes</span>
            </div>
            <div>
              <span>Rating:</span>
              <span>★★★★★</span>
            </div>
            <div>
              <span>Último quadrinho:</span>
              {/* <span>
                {character.modified
                  ? new Date(character.modified).toLocaleDateString("pt-BR")
                  : "--"}
              </span> */}
            </div>
          </div>
        </div>
        <div className="character-images">
          {/* <img
            src={`${character.thumbnail.path}/portrait_uncanny.${character.thumbnail.extension}`}
            alt={character.name}
            className="main-character-img"
          /> */}
          {/* Exemplo de vídeo ou imagem extra */}
          <div className="character-video">
            <img
              src="https://i.imgur.com/your-video-thumb.jpg"
              alt="Cena do personagem"
            />
          </div>
        </div>
      </section>

      {/* Últimos lançamentos */}
      <section className="character-comics">
        <h2>Últimos lançamentos</h2>
        <div className="comics-list">
          {/* {character.comics.items.slice(0, 10).map((comic, index) => (
            <div className="comic-card" key={index}>
              <img
                src={`${comic.thumbnail.path}/portrait_medium.${comic.thumbnail.extension}`}
                alt={comic.title}
              />
              <p>{comic.title || "Lorem Ipsum Dolor Sit."}</p>
            </div>
          ))} */}
        </div>
      </section>
    </div>
  );
}

export default CharacterDetail;
