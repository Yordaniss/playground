export default function Button(props) {
  return (
    <a
      href={props.href}
      className={`button ${props.className}`}
      onClick={props.onClick}
    >
      {props.children}
    </a>
  );
}
