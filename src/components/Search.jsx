import { useState } from "react";
import { useNavigate } from "react-router-dom";
import searchIcon from "../assets/busca/Lupa/Shape.png";
import "../style/Search.css";

function Search({ tasks, searchTerm, setSearchTerm, onFilterByName }) {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();

  const filteredNames = tasks
    .filter((hero) =>
      hero.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .map((hero) => hero.name);

  function onSearchHeroClick(search = searchTerm) {
    const query = new URLSearchParams();
    query.set("search", search);
    navigate(`/?${query.toString()}`);
  }

  return (
    <div className="search-container">
      <div className="search-input-wrapper">
        <img
          src={searchIcon}
          alt="ícone de busca"
          onClick={() => {
            {
              onFilterByName ? onFilterByName(searchTerm) : onSearchHeroClick();
            }
            setShowSuggestions(false);
          }}
        />
        <input
          type="text"
          placeholder="Procure por heróis"
          value={searchTerm}
          onChange={(event) => {
            const value = event.target.value;
            setSearchTerm(value);
            setShowSuggestions(value.length > 0);
          }}
          onFocus={() => setShowSuggestions(searchTerm.length > 0)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              {
                onFilterByName
                  ? onFilterByName(searchTerm)
                  : onSearchHeroClick();
              }
              setShowSuggestions(false);
            }
          }}
        />

        {showSuggestions && filteredNames.length > 0 && (
          <ul className="suggestions-dropdown">
            {filteredNames.map((name, id) => (
              <li
                key={id}
                onClick={() => {
                  setSearchTerm(name);
                  {
                    onFilterByName
                      ? onFilterByName(name)
                      : onSearchHeroClick(name);
                  }
                  setShowSuggestions(false);
                }}
              >
                {name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Search;
