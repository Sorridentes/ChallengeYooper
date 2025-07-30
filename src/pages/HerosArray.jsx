import { useEffect, useState } from "react";
import "../HerosArray.css";
import axios from "axios";
import data from "../apiMavel.json";

function HerosArray() {
  const API_TS_KY = "29072025";
  const API_PUBLIC_KEY = "51513048ccbb557a3edab95f893c704d";
  const API_HASH_KEY = "7b3ca3b47d3c535bc3075c437b6c5892";
  const API_URL = "http://gateway.marvel.com/v1/public";
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("task")) || []
  );

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
      setTasks(data.data.results);
    };
    fetchCharacters();
  }, []);

  return <>{tasks}</>;
}

export default HerosArray;
