export default function Card(props) {
  return (
    <div
      className={`card${
        props.className !== "" && props.className !== undefined
          ? " " + props.className
          : ""
      }`}
    >
      {props.children}
    </div>
  );
}
