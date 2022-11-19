export default function Nav() {
  let navItems = ["Home", "About", "Contact"];
  return (
    <nav className="nav">
      <ul className="nav__list">
        {navItems.map((item) => {
          return (
            <li key={Math.random()} className="nav__list-item">
              {item}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
