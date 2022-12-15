import Card from "../../UI/Card";
import Link from "next/link";

export default function Post(props) {
  return (
    <Card className="post">
      <div className="post__header">
        <div className="authors-image" alt="author's photo"></div>
        <Link href="/" className="authors-username">
          @Author's username
        </Link>
        <h1 className="title">{props.post.title}</h1>
        <p className="category-container">
          <Link href={`/${props.post.main_category}`} className="category">
            #{props.post.main_category}
          </Link>
          <Link href={`/${props.post.main_category}`} className="category">
            from {props.post.age_category} y.o.
          </Link>
        </p>
      </div>

      <p className="post__text">{props.post.text}</p>

      {props.viewModifier === "POST_CARD" && (
        <Link href={`/posts/${props.post._id}`} className="button post__button">
          View more
        </Link>
      )}
    </Card>
  );
}
