import AgeInput from "../../searchManagement/AgeInput";
import { server } from "../../../../config/index";
import { useForm } from "react-hook-form";
import CategoryDropdown from "./CategoryDropdown";
import { useSelector } from "react-redux";
import useHttpRequest from "../../../hooks/useHttpRequest";
import { getCookie } from "cookies-next";
import { useState } from "react";

const isFieldTouchedInRedux = (fieldsName, fieldsInRedux) => {
  return fieldsInRedux.some((field) => {
    return field === fieldsName;
  });
};

const validateCategory = (
  e,
  touchedFieldsRedux,
  categoryState,
  setError,
  clearErrors
) => {
  if (!e.target.className.includes("dropdown")) {
    const dropDownInput = document.querySelector(".dropdown__input");
    if (
      isFieldTouchedInRedux("main_category", touchedFieldsRedux) &&
      !categoryState &&
      categoryState !== 0
    ) {
      dropDownInput.checked = false;
      setError("main_category", {
        type: "custom",
        message: "Please, choose category",
      });
    } else if (categoryState || categoryState === 0) {
      clearErrors("main_category");
      dropDownInput.checked = false;
    }
  }
};

const validateFile = (e, fileIsTouched, setError, getValues, clearErrors) => {
  if (
    fileIsTouched &&
    getValues("file").length === 0 &&
    !e.target.className.includes("file-input") &&
    e.target.className !== ""
  ) {
    setError("file", {
      type: "custom",
      message: "Choose some files pls :3",
    });
  } else if (getValues("file")) {
    clearErrors("file");
  }
};

export default function AddPost({ action = `${server}/api/posts` }) {
  const {
    register,
    setValue,
    getValues,
    handleSubmit,
    getFieldState,
    setError,
    clearErrors,
    formState: { errors, isValid, isDirty, touchedFields },
  } = useForm({
    mode: "onBlur",
    reValidateMode: "onChange",
    criteriaMode: "firstError",
  });

  const { isLoading, postError, sendRequest: postForm } = useHttpRequest();

  const url = `${server}/api/posts`;
  const onSubmit = (data) => {
    const formData = new FormData();
    for (let key in data) {
      if (key !== "file") formData.append(key, data[key]);
      // console.log(key)
    }
    console.log(data);
    console.log(data.file[0]);
    formData.append("file", data.file[0]);
    console.log(formData);

    const token = getCookie("token");
    const authorization = { authorization: `Bearer ${token}` };

    postForm(
      {
        url: url,
        method: "POST",
        headers: { ...authorization },
        body: formData,
      },
      () => {
        console.log("success");
      }
    );
  };
  // const onSubmit = async (data) => {
  //   console.log(getValues());
  //   const formData = new FormData();
  //   for (let key in data) {
  //     if (key !== "file") formData.append(key, data[key]);
  //     // console.log(key)
  //   }
  //   formData.append("file", data.file[0]);

  //   console.log(formData);
  //   const token = getCookie("token");
  //   const authorizationObj = { authorization: `Bearer ${token}` };

  //   const res = await fetch(url, {
  //     method: "POST",
  //     headers: {
  //       // "Content-Type": "application/json",
  //       ...authorizationObj,
  //     },
  //     body: formData,
  //   });
  //   const result = await res;
  //   console.log(result);
  // };

  const onError = (errors, e) => console.log(errors, e);

  const categoryState = useSelector(({ addPost }) => addPost.category);
  const ageState = useSelector(({ addPost }) => addPost.age.value);
  const touchedFieldsRedux = useSelector(
    ({ addPost }) => addPost.touchedFields
  );
  const [fileIsTouched, setFileAsTouched] = useState(false);

  return (
    <div className="outer-container">
      {isLoading && <div>{isLoading}</div>}
      {postError && <div>{postError}</div>}
      <form
        // encType="multipart/form-data"
        method="POST"
        action={action}
        className="form addPost"
        onSubmit={handleSubmit((data) => onSubmit(data), onError)}
        onClick={(e) => {
          validateCategory(
            e,
            touchedFieldsRedux,
            categoryState,
            setError,
            clearErrors
          );
          validateFile(e, fileIsTouched, setError, getValues, clearErrors);
        }}
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
              className={`${
                !ageState &&
                isFieldTouchedInRedux("age_category", touchedFieldsRedux)
                  ? "ageInput-container-error"
                  : ""
              }`}
              {...register("age_category", {
                required: "Please enter minimal child's age",
              })}
            ></AgeInput>
            {ageState ? setValue("age_category", ageState) : null}
          </div>
          {!ageState &&
            isFieldTouchedInRedux("age_category", touchedFieldsRedux) && (
              <p className="error-message">Please enter minimal child's age</p>
            )}
          <div className="category-group">
            <CategoryDropdown
              className={`${
                errors.main_category && !categoryState && categoryState !== 0
                  ? "dropdown-error"
                  : ""
              }`}
              {...register("main_category", {
                value: setValue("main_category", categoryState),
              })}
            ></CategoryDropdown>
          </div>
          {errors.main_category && !categoryState && categoryState !== 0 && (
            <p className="error-message">{errors.main_category?.message}</p>
          )}
          <div className="file-group">
            <label
              className={`button custom-file-input ${
                errors.file && "file-error"
              }`}
              onClick={() => {
                setFileAsTouched(true);
              }}
            >
              <input
                type="file"
                {...register("file")}
                accept="image/*, audio/*, video/*"
              />
              Choose file
            </label>
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
              getValues("components")
                ? setValue("components", [getValues("components")])
                : "";
            }}
          />
          <input type="reset" value="cancel" className="button cancel" />
        </div>
      </form>
    </div>
  );
}
