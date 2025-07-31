import { useEffect, useState } from "react";
import "../HeroesArray.css";
// import axios from "axios";
import data from "../apiMavel.json";
import logoMarvel from "../assets/logo/Group.png";
import Search from "../components/Search";
import Toggle from "../components/Toggle";
import CharactersCards from "../components/CharactersCards";

function HeroesArray() {
  const API_TS_KY = "29072025";
  const API_PUBLIC_KEY = "51513048ccbb557a3edab95f893c704d";
  const API_HASH_KEY = "7b3ca3b47d3c535bc3075c437b6c5892";
  const API_URL = "http://gateway.marvel.com/v1/public";
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || []
  );
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [numberHeroes, setNumberHeroes] = useState();
  const [toggleState, setToggleState] = useState(false);
  const [countFavorite, setCountFavorite] = useState(0);
  const [searchTerm, setSearchInput] = useState("");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(filteredTasks));
  }, [filteredTasks]);

  useEffect(() => {
    const fetchCharacters = async () => {
      // const response = await axios.get(`${API_URL}/characters`, {
      //   params: {
      //     ts: API_TS_KY,
      //     apikey: API_PUBLIC_KEY,
      //     hash: API_HASH_KEY,
      //     limit: 20,
      //   },
      // });
      // const data = await response.data;
      const tasksWithFavorites = data.data.results.map((task) => ({
        ...task,
        favorite: false,
      }));

      setTasks(tasksWithFavorites);
      setFilteredTasks(tasksWithFavorites);
      setNumberHeroes(tasksWithFavorites.length);
    };
    fetchCharacters();
  }, []);

  function onFilterByName(name) {
    setSearchInput(name);
    let result = [...tasks];

    if (name) {
      result = result.filter((task) =>
        task.name.toLowerCase().includes(name.toLowerCase())
      );
    }

    if (toggleState) result = result.filter((task) => task.favorite);
    else result = result.sort((a, b) => a.name.localeCompare(b.name));

    setFilteredTasks(result);
    setNumberHeroes(result.length);
  }

  function addFavorite(id) {
    if (countFavorite < 5) {
      const updatedTasks = filteredTasks.map((task) => {
        if (task.id === id) {
          return { ...task, favorite: !task.favorite };
        }
        return task;
      });
      setFilteredTasks(updatedTasks);
      setCountFavorite((prevCount) =>
        updatedTasks.find((task) => task.favorite) ? prevCount + 1 : prevCount
      );
    }
  }

  function handleToggleChange() {
    setToggleState(!toggleState);

    let result = [...tasks];

    if (searchTerm)
      result = result.filter((task) =>
        task.name.toLowerCase().includes(searchTerm.toLowerCase())
      );

    if (!toggleState) result = result.filter((task) => task.favorite);
    else result = result.sort((a, b) => a.name.localeCompare(b.name));
    setFilteredTasks(result);
    setNumberHeroes(result.length);
  }

  return (
    <>
      <div>
        <div className="header">
          <div>
            <img src={logoMarvel} alt="Logo da Marvel" />
          </div>
          <div>
            <h1>EXPLORE O UNIVERSO</h1>
            <h4>
              Mergulhe no domínio deslumbrante de todos os personagens clásicos
              que você ama - e aqueles qu você descobrirá em breve!
            </h4>
          </div>
          <Search
            tasks={tasks}
            searchInput={searchTerm}
            onFilterByName={onFilterByName}
          />
        </div>
        <div>
          <div>
            <p>Encontramos {numberHeroes} heróis</p>
            <Toggle
              toggleState={toggleState}
              handleToggleChange={handleToggleChange}
            />
          </div>
          <CharactersCards filteredTasks={filteredTasks} />
        </div>
      </div>
    </>
  );
}

export default HeroesArray;
