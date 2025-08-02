function ComicsCards({ character }) {
  return (
    <div
      className="comics-container"
      style={{ maxWidth: `${(150 + 100) * character.comics.returned}` + "px" }}
    >
      {character.comics.items.slice(0, 10).map((comic) => {
        return (
          <div
            key={Number(comic.resourceURI.split("/").pop())}
            className="comic-card"
          >
            <img
              className="comic-image"
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
