import { useEffect, useState } from "react";
import "../style/HeroesArray.css";
import heroes from "../mavel-heroes.json";
import logoMarvel from "../assets/logo/Group.png";
import Search from "../components/Search";
import Toggle from "../components/Toggle";
import CharactersCards from "../components/CharactersCards";
import { useSearchParams } from "react-router-dom";

function HeroesArray({ onSwitchFavorite }) {
  // const API_TS_KY = "29072025";
  // const API_PUBLIC_KEY = "51513048ccbb557a3edab95f893c704d";
  // const API_HASH_KEY = "7b3ca3b47d3c535bc3075c437b6c5892";
  // const API_URL = "http://gateway.marvel.com/v1/public";
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || []
  );
  const [countFavorite, setCountFavorite] = useState(
    JSON.parse(localStorage.getItem("countFavorite")) || 0
  );
  const [searchParams] = useSearchParams();
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [numberHeroes, setNumberHeroes] = useState();
  const [toggleState, setToggleState] = useState(false);
  const [searchTerm, setSearchInput] = useState("");

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks"));
    let initialTasks;
    if (storedTasks && storedTasks.length > 0) {
      initialTasks = storedTasks;
    } else {
      initialTasks = heroes.data.results.map((task) => ({
        ...task,
        favorite: false,
        rating: Math.floor(Math.random() * 6),
        movies: Math.floor(Math.random() * 101),
      }));
    }
    setTasks(initialTasks);

    const search = searchParams.get("search") || "";
    setSearchInput(search);
    applyFilters(initialTasks, search, toggleState);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("countFavorite", countFavorite);
  }, [countFavorite]);

  function applyFilters(
    baseTasks = tasks,
    search = searchTerm,
    toggle = toggleState
  ) {
    let result = [...baseTasks];

    if (search) {
      result = result.filter((task) =>
        task.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (toggle) result = result.filter((task) => task.favorite);

    result = result.sort((a, b) => a.name.localeCompare(b.name));

    setFilteredTasks(result);
    setNumberHeroes(result.length);
  }

  function onFilterByName(name) {
    setSearchInput(name);
    applyFilters(tasks, name, toggleState);
  }

  function updateFavorite(id) {
    const updatedTasks = onSwitchFavorite(id, tasks, countFavorite);

    setTasks(updatedTasks);
    setCountFavorite(updatedTasks.filter((task) => task.favorite).length);
    applyFilters(updatedTasks, searchTerm, toggleState);
  }

  function handleToggleChange() {
    setToggleState((prev) => {
      const newToggle = !prev;
      applyFilters(tasks, searchTerm, newToggle);
      return newToggle;
    });
  }

  return (
    <>
      <div className="heroes-container">
        <div className="header">
          <div>
            <img src={logoMarvel} alt="Logo da Marvel" className="logo" />
          </div>
          <div className="header-content">
            <h1>EXPLORE O UNIVERSO</h1>
            <h4>
              Mergulhe no domínio deslumbrante de todos os personagens clássicos
              que você ama - e aqueles que você descobrirá em breve!
            </h4>
          </div>
          <Search
            tasks={tasks}
            searchInput={searchTerm}
            onFilterByName={onFilterByName}
          />
        </div>
        <div className="content-container">
          <div className="heroes-info">
            <p className="heroes-count">
              Encontrado{numberHeroes !== 1 ? "s" : ""} {numberHeroes} herói
              {numberHeroes !== 1 ? "s" : ""}
            </p>
            <Toggle
              toggleState={toggleState}
              handleToggleChange={handleToggleChange}
            />
          </div>
          <CharactersCards
            filteredTasks={filteredTasks}
            updateFavorite={updateFavorite}
          />
        </div>
      </div>
    </>
  );
}

export default HeroesArray;
