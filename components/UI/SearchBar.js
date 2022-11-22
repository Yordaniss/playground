export default function SearchBar(props) {
  return (
    <div className="searchBar">
      <input
        className="searchBar__searchInput"
        type="text"
        placeholder="Search..."
      />
      <button className="searchBar__searchButton">🔍</button>
    </div>
  );
}
