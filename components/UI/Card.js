export default function Card(props) {
  console.log(
    props.className !== "" && props.className !== undefined
      ? " " + props.className
      : ""
  );
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
