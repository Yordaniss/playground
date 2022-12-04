import AgeInput from "../../searchManagement/AgeInput";
import { server } from "../../../../config/index";
import { useForm } from "react-hook-form";
import CategoryDropdown from "./CategoryDropdown";
import { useSelector } from "react-redux";
import useHttpRequest from "../../../hooks/useHttpRequest";
import { getCookie } from "cookies-next";

export default function AddPost({ action = `${server}/api/posts` }) {
  const {
    register,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onBlur",
    reValidateMode: "onChange",
    criteriaMode: "firstError",
  });

  const { isLoading, postError, sendRequest: postForm } = useHttpRequest();

  const url = `${server}/api/posts`;

  const onSubmit = (data) => {
    console.log(data);
    console.log(JSON.stringify(data));
    const token = getCookie("token");
    postForm(
      {
        url: url,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // authorization: token,
        },
        body: data,
      },
      () => {
        console.log("success!");
      }
    );
  };

  const onError = (errors, e) => console.log(errors, e);

  const categoryState = useSelector(({ addPost }) => addPost.category);
  const ageState = useSelector(({ addPost }) => addPost.age.value);

  return (
    <div className="outer-container">
      {isLoading && <div>{isLoading}</div>}
      {postError && <div>{postError}</div>}
      <form
        action={action}
        method="POST"
        className="form addPost"
        onSubmit={handleSubmit((data) => onSubmit(data), onError)}
      >
        <div className="addPost__inner-container">
          <div className="title-group">
            <label htmlFor="inputPostTitle">Post title:</label>
            <input
              className={`input ${errors.title && "error"}`}
              id="inputPostTitle"
              type="text"
              placeholder="Title is..."
              {...register("title", {
                required: "Title is required ^_^",
              })}
            />
          </div>
          {errors.title && (
            <p className="error-message">{errors.title.message}</p>
          )}
          <div className="text-group">
            <label>Text of the post: </label>
            <textarea
              placeholder="Your funny activiy..."
              className={`textarea ${errors.text && "error"}`}
              // minLength="50"
              {...register("text", {
                required: "Text is required ;-;",
              })}
            />
          </div>
          {errors.text && (
            <p className="error-message">{errors.text?.message}</p>
          )}
          <div className="additional-info-group">
            <label htmlFor="inputAdditionalInfo">Additional info:</label>
            <input
              className={`input ${errors.components && "error"}`}
              id="inputAdditionalInfo"
              type="text"
              placeholder="Your additional info..."
              {...register("components", {
                required: "Sorry, this is also required :(",
              })}
            />
          </div>
          {errors.components && (
            <p className="error-message">{errors.components?.message}</p>
          )}
          <div className="age-group">
            <label>Enter child's age: </label>
            <AgeInput
              className={`${errors.age_category && "error"}`}
              {...register("age_category", {
                required: "Please enter minimal child's age",
              })}
            ></AgeInput>
            {ageState ? setValue("age_category", ageState) : null}
          </div>
          {errors.age_category && (
            <p className="error-message">{errors.age_category?.message}</p>
          )}
          <div className="category-group">
            <CategoryDropdown
              {...register("main_category", {
                required: "Please enter category",
              })}
            ></CategoryDropdown>
            {categoryState ? setValue("main_category", categoryState) : null}
          </div>
          {errors.main_category && (
            <p className="error-message">{errors.main_category?.message}</p>
          )}
          <div className="file-group">
            <label className="button custom-file-input" htmlFor="chooseFile">
              Choose file
            </label>
            <input
              id="chooseFile"
              type="file"
              {...register("file", {
                required: "Don't be shy, add some nice files",
              })}
            />
          </div>
          {errors.file && (
            <p className="error-message">{errors.file?.message}</p>
          )}
        </div>
        <div className="formButtons">
          <input
            disabled={!isValid}
            className="button submit"
            type="submit"
            value="submit post"
            onClick={() => {
              ({ ...getValues("components") }
                ? setValue("components", [getValues("components")])
                : "");
            }}
          />
          <input type="reset" value="cancel" className="button cancel" />
        </div>
      </form>
    </div>
  );
}
