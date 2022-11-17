export default function FilterDropdown() {
  return (
    <div className="filterDropdown">
      <input type="checkbox" id="filterDropdown__checkbox"></input>
      <label className="filterDropdown__top" htmlFor="filterDropdown__checkbox">
        {"Choose category:"}
      </label>
      <ul className="filterDropdown__categories">
        <li>
          <input
            type="checkbox"
            id="category__checkbox1"
            onClick={(e) => {
              // const ul = document.querySelector(
              //   "label[for='" + e.target + "' + ul"
              // );
              // ul.classList.add("doDropdown");
              console.log(e.target);
            }}
          ></input>
          <label className="filterDropdown__top" htmlFor="category__checkbox1">
            {"At-home activities"}
          </label>
          <ul className="filterDropdown__categories">
            <li>
              <input type="checkbox" />
              Cooking
            </li>
            <li>
              <input type="checkbox" />
              Crafting
            </li>
            <li>
              <input type="checkbox" />
              Games
            </li>
          </ul>
        </li>
        <li>
          <input type="checkbox" id="category__checkbox2"></input>
          <label className="filterDropdown__top" htmlFor="category__checkbox2">
            {"Outfoor activities"}
          </label>
          <ul className="filterDropdown__categories">
            <li>
              <input type="checkbox" />
              Foraging
            </li>
            <li>
              <input type="checkbox" />
              Active games
            </li>
            <li>
              <input type="checkbox" />
              Sports
            </li>
          </ul>
        </li>
      </ul>

      <svg>
        <filter id="goo">
          <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
          <feColorMatrix
            in="blur"
            type="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
            result="goo"
          />
          <feComposite in="goo" result="composite" operator="atop" />
          <feBlend in="SourceGraphic" in2="composite" />
        </filter>
      </svg>
    </div>
  );
}
