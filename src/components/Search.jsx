import { useState } from "react";
import searchIcon from "../assets/busca/Lupa/Shape.png";
import "../style/Search.css";
import { useNavigate } from "react-router-dom";

function Search({ tasks, onFilterByName }) {
  const [searchInput, setSearchInput] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();

  const filteredNames = tasks
    .filter((hero) =>
      hero.name.toLowerCase().includes(searchInput.toLowerCase())
    )
    .map((hero) => hero.name);

  function onSearchHeroClick() {
    const query = new URLSearchParams();
    query.set("search", searchInput);
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
              onFilterByName
                ? onFilterByName(searchInput)
                : onSearchHeroClick();
            }
            setShowSuggestions(false);
          }}
        />
        <input
          type="text"
          placeholder="Procure por heróis"
          value={searchInput}
          onChange={(event) => {
            const value = event.target.value;
            setSearchInput(value);
            setShowSuggestions(value.length > 0);
          }}
          onFocus={() => setShowSuggestions(searchInput.length > 0)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              {
                onFilterByName
                  ? onFilterByName(searchInput)
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
                  setSearchInput(name);
                  {
                    onFilterByName
                      ? onFilterByName(searchInput)
                      : onSearchHeroClick();
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
