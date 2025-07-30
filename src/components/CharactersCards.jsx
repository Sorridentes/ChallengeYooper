import FavoriteButton from './FavoriteButton';

function CharactersCards(props) {
    return (
        <div className="characters-cards">
        {props.tasks.map((task) => (
            <button key={task.id} className="character-card">
                <img
                    src={`${task.thumbnail.path}/standard_medium.${task.thumbnail.extension}`}
                    alt={task.name}
                />
                <div>
                    <h3 className="character-name">{task.name}</h3>
                    <FavoriteButton />
                </div>
            </button>
        ))}
        </div>
    );
}

export default CharactersCards;
