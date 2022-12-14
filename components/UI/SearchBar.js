import { useRef } from "react";

export default function SearchBar(props) {
  const searchBarRef = useRef(null);

  const handleClick = () => {
    props.onSearch(searchBarRef.current.value.trim());
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      props.onSearch(searchBarRef.current.value.trim());
    }
  };

  return (
    <div className="searchBar">
      <input
        className="searchBar__searchInput"
        type="text"
        placeholder="Search..."
        onKeyDown={handleKeyDown}
        ref={searchBarRef}
      />
      <button className="searchBar__searchButton" onClick={handleClick}>
        🔍
      </button>
    </div>
  );
}
