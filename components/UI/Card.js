export default function Card(props) {
  return (
    <div
      className={`card${
        !props.className === undefined ? " " + props.className : ""
      }`}
    >
      {props.children}
    </div>
  );
}
