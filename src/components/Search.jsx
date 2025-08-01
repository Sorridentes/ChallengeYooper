import { useState } from "react";
import searchIcon from "../assets/busca/Lupa/Shape.png";
import "../style/Search.css";

function Search({ tasks, onFilterByName }) {
  const [searchInput, setSearchInput] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const filteredNames = tasks
    .filter((hero) =>
      hero.name.toLowerCase().includes(searchInput.toLowerCase())
    )
    .map((hero) => hero.name);

  return (
    <div className="search-container">
      <div className="search-input-wrapper">
        <img
          src={searchIcon}
          alt="ícone de busca"
          onClick={() => {
            onFilterByName(searchInput);
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
              onFilterByName(searchInput);
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
                  onFilterByName(name);
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
