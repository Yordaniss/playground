import Card from "../../UI/Card";
import Link from "next/link";
import { main_categories } from "../searchManagement/SearchConstants";
import { useEffect } from "react";
import { setCookie } from "cookies-next";

export default function Post(props) {
  const getCategory = () => {
    const chosenCategoryIndex = props.post.main_category;
    let chosenCategory;
    for (let [categoryConstant, categoryObj] of Object.entries(
      main_categories
    )) {
      if (categoryObj.value === chosenCategoryIndex) {
        chosenCategory = categoryObj.title;
      }
    }
    return chosenCategory;
  };

  return (
    <Card
      className={`post ${
        props.viewModifier !== "POST_CARD" && "whole-post-view"
      }`}
    >
      <div className="post__header">
        <div className="authors-image" alt="author's photo"></div>
        <Link href="/" className="authors-username">
          @Author's username
        </Link>
        <h1 className="title">{props.post.title}</h1>
        <p className="category-container">
          <Link href={`/${props.post.main_category}`} className="category">
            #{getCategory()}
          </Link>
          <br />
          <Link href={`/${props.post.age_category}`} className="category">
            from {props.post.age_category} y.o.
          </Link>
        </p>
      </div>

      <div className="post__text-container">
        <p className="post__text">{props.post.text}</p>
        {props.viewModifier === "POST_CARD" && (
          <div className="post__text-blur"></div>
        )}
      </div>

      {props.viewModifier === "POST_CARD" && (
        <Link href={`/posts/${props.post._id}`} className="button post__button">
          View more
        </Link>
      )}
    </Card>
  );
}
