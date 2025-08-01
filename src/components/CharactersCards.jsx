import FavoriteButton from "./FavoriteButton";
import "../style/CharactersCards.css";

function CharactersCards({ filteredTasks, updateFavorite }) {
  return (
    <div className="characters-cards">
      {filteredTasks.map((task) => (
        <div key={task.id} className="character-card">
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
              onSwitchFavorite={() => updateFavorite(task.id)}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default CharactersCards;
