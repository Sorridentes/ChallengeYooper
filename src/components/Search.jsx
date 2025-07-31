import { useState } from "react";
import searchIcon from "../assets/busca/Lupa/Shape.png";

function Search({ tasks, onFilterByName }) {
  const [searchInput, setSearchInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  return (
    <div className="search-container">
      <div>
        <img
          src={searchIcon}
          alt="ícone de busca"
          onClick={() => {
            onFilterByName(searchInput);
            setSuggestions([]);
          }}
        />
        <input
          type="text"
          placeholder="Procure por heróis"
          value={searchInput}
          onChange={(event) => {
            const value = event.target.value;
            setSearchInput(value);

            if (value.length == 0) {
              setSuggestions([]);
              return;
            }

            const filteredNames = tasks
              .map((hero) => hero.name)
              .filter((name) =>
                name.toLowerCase().includes(value.toLowerCase())
              );
            setSuggestions(filteredNames);
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              onFilterByName(searchInput);
              setSuggestions([]);
            }
          }}
        />
      </div>
      {suggestions.length > 0 && (
        <ul>
          {suggestions.map((name, id) => (
            <li
              key={id}
              onClick={() => {
                setSearchInput(name);
                setSuggestions([]);
                onFilterByName(name);
              }}
            >
              {name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Search;
