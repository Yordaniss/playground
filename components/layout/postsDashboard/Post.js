import Button from "../../UI/Button";
import Card from "../../UI/Card";
import Link from "next/link";

export default function Post(props) {
  const categories = ["Arts & crafts", "Cooking", "Sport", "Games"];

  return (
    <Card className="post">
      <div className="post__header">
        <div className="authors-image" alt="author's photo"></div>
        <Link href="/" className="authors-username">
          @Author's username
        </Link>
        <h1 className="title">{props.post.title}</h1>
        <p className="category-container">
          <Link
            href={`/${categories[props.post.main_category - 1]}`}
            className="category"
          >
            {categories[props.post.main_category - 1]}
          </Link>
        </p>
      </div>

      <p className="post__text">{props.post.text}</p>

      <Button className="post__button">View more</Button>
    </Card>
  );
}
