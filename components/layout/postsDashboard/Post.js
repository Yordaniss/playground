import Button from "../../UI/Button";
import Card from "../../UI/Card";

export default function Post(props) {
  return (
    <Card className="post">
      <div className="post__header">
        <div className="post__header__authors-image" alt="author's photo"></div>
        <a className="post__header__authors-username">Author's username</a>
        <h1 className="post__header__title">{props.post.title}</h1>
        <p className="post__header__category-container">
          <a className="post__header__category">{props.post.main_category}</a>
        </p>
      </div>

      <p className="post__text">{props.post.text}</p>

      <Button className="post__button">View more</Button>
    </Card>
  );
}
