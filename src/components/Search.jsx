function Search(props) {
    return (
        <input
            type="text"
            placeholder="Pequisa por heróis.."
            onChange={(e) => props.onSearch(e.target.value)}
        />
    );
}

export default Search;
