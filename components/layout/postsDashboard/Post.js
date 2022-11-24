import Button from "../../UI/Button";
import Card from "../../UI/Card";

export default function Post(props) {
  return (
    <Card className="post">
      <img alt="author's photo"></img>
      <p>Author's username</p>
      <h1>{props.post.title}</h1>
      <p>
        <span>{props.post.main_category}</span>
      </p>
      <p>{props.post.text}</p>
      <Button className="post__button">View more</Button>
    </Card>
  );
}
