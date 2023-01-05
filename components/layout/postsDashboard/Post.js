import Card from "../../UI/Card";
import Link from "next/link";
import { main_categories } from "../searchManagement/SearchConstants";
import { useDispatch, useSelector } from "react-redux";
import { searchConfigActions } from "../../../store/index";

export default function Post(props) {
  const dispatch = useDispatch();
  const searchConfig = useSelector(({ searchConfig }) => searchConfig);
  const getCategory = () => {
    const chosenCategoryIndex = props.post.main_category;
    let chosenCategory;
    for (let [categoryConstant, categoryObj] of Object.entries(
      main_categories
    )) {
      if (categoryObj.value === chosenCategoryIndex) {
        chosenCategory = categoryObj;
      }
    }
    return chosenCategory;
  };

  const handleCategoryClick = (e) => {
    e.preventDefault();
    const category = getCategory().value;
    const filters = {
      ...searchConfig.filtration,
      main_category: category,
    };
    dispatch(searchConfigActions.setFilters(filters));
  };

  return (
    <Card className="post">
      <div className="post__header">
        <div className="authors-image" alt="author's photo"></div>
        <Link href="/" className="authors-username">
          @Author's username
        </Link>
        <h1 className="title">{props.post.title}</h1>
        <p className="category-container">
          <Link href={``} className="category" onClick={handleCategoryClick}>
            #{getCategory().title}
          </Link>
          <br />
          <Link href={`/${props.post.age_category}`} className="category">
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
