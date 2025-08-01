import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import data from "../apiMavel.json";
import "../style/CharacterDetail.css";
import logoMarvel from "../assets/logo/Group.png";
import Search from "../components/Search";

function CharacterDetail() {
  const [id, setId] = useState("");
  const [character, setCharacter] = useState(null);
  const [searchParams] = useSearchParams();

  console.log();

  useEffect(() => {
    setId(searchParams.get("id"));
    setCharacter(data.data.results.filter((char) => char.id.toString() === id));
  }, []);

  // const FoundCharacter = data.data.results.filter(
  //   (char) => char.id.toString() === id
  // );
  // setCharacter(FoundCharacter);

  if (!character) {
    return <div>Pessonagem não encontrado</div>;
  }

  return (
    <div className="character-detail-container">
      <div className="header">
        <img src={logoMarvel} alt="Logo da Marvel" className="logo" />
        <Search tasks={data.data.results} searchInput={searchTerm} />
        <h1>{character.name.toUpperCase()}</h1>
        <p className="character-description">
          {character.description || "Descrição não disponível."}
        </p>
      </div>

      <div className="character-stats">
        <div className="stat-item">
          <h3>Quadrinhos</h3>
          <p>{character.comics.available}</p>
        </div>
        <div className="stat-item">
          <h3>Filmes</h3>
          <p>40</p>{" "}
          {/* Este valor não está no JSON, seria necessário buscar de outra fonte */}
        </div>
      </div>

      <div className="rating-section">
        <h2>Rating: ★★★★★★</h2>
      </div>

      <div className="last-comic">
        <p>Último quadrinho: 13 fev. 2020</p>{" "}
        {/* Data fictícia - ajustar conforme dados reais */}
      </div>

      <div className="releases-section">
        <h2>Últimos lançamentos</h2>
        <ul className="releases-list">
          {character.comics.items.slice(0, 10).map((comic, index) => (
            <li key={index}>
              <strong>{comic.name}</strong>
              <p>Dolor Sit.</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default CharacterDetail;
