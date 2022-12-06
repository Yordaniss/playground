import { useRef } from "react";

export default function Searchbar(props) {
  const searchbarRef = useRef(null);

  const handleClick = () => {
    props.onSearch(searchbarRef.current.value.trim());
  };

  return (
    <div className="searchbar">
      <input
        className="searchbar__searchInput"
        type="text"
        placeholder="Search..."
        ref={searchbarRef}
      />
      <button className="searchbar__searchButton" onClick={handleClick}>
        🔍
      </button>
    </div>
  );
}
