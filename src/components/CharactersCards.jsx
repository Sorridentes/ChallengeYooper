import FavoriteButton from "./FavoriteButton";
import "../style/CharactersCards.css";
import { useNavigate } from "react-router-dom";

function CharactersCards({ filteredTasks, updateFavorite }) {
  const navigate = useNavigate();

  function onSeeDetailsClick(task, e) {
    if (e.target.closest(".favorite-checkboo")) {
      return;
    }

    const query = new URLSearchParams();
    query.set("id", task.id);
    navigate(`/descricao?${query.toString()}`);
  }

  return (
    <div className="characters-cards">
      {filteredTasks.map((task) => (
        <div
          key={task.id}
          className="character-card"
          onClick={(e) => onSeeDetailsClick(task, e)}
        >
          <div className="image-wrapper">
            <img
              src={`${task.thumbnail.path}/standard_medium.${task.thumbnail.extension}`}
              alt={task.name}
            />
          </div>
          <div>
            <h3 className="character-name">{task.name}</h3>
            <FavoriteButton
              isFavorite={task.favorite}
              onSwitchFavorite={() => {
                updateFavorite(task.id);
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default CharactersCards;
