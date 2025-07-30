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
  ); // novo estado
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [numberHeroes, setNumberHeroes] = useState();
  const [toggleState, setToggleState] = useState(false);

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
      setTasks([...data.data.results, { favorite: false }]);
      setFilteredTasks([...data.data.results, { favorite: false }]);
      setNumberHeroes(data.data.count);
    };
    fetchCharacters();
  }, []);

  function onFilterByName(name) {
    if (!name) {
      setFilteredTasks(tasks); // sempre use o array completo
      setNumberHeroes(tasks.length);
      return;
    }
    const filteredTasks = tasks.filter((task) =>
      task.name.toLowerCase().includes(name.toLowerCase())
    );
    setFilteredTasks(filteredTasks);
    setNumberHeroes(filteredTasks.length);
  }

  function handleToggleChange() {
    setToggleState(!toggleState);

    if (toggleState) {
      setFilteredTasks(() =>
        filteredTasks.filter((task) => task.favorite === true)
      );
    } else {
    }
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
          <Search tasks={tasks} onFilterByName={onFilterByName} />
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
