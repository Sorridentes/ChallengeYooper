import unfilledHeart from '../assets/icones/heart/Path Copy 2@1,5x.svg'

function FavoriteButton() {
    return (
        <button className="favorite-button">
            <img src={unfilledHeart} alt="Favorite" />
        </button>
    );
}


export default FavoriteButton;