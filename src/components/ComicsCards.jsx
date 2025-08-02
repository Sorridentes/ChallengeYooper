function ComicsCards({ character }) {
  return (
    <div className="comics-container">
      {character.comics.items.slice(0, 10).map((comic) => {
        return (
          <div className="comic-card">
            <img
              src="https://cdn.marvel.com/content/1x/default/comic-no-img.jpg"
              alt="Imagem não disponível"
            />
            <span>{comic.name}</span>
          </div>
        );
      })}
    </div>
  );
}

export default ComicsCards;
