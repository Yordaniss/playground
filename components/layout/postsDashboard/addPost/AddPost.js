import AgeInput from "../../searchManagement/AgeInput";
import { server } from "../../../../config/index";
import { useForm } from "react-hook-form";
import CategoryDropdown from "./CategoryDropdown";
import { useSelector } from "react-redux";
import useHttpRequest from "../../../hooks/useHttpRequest";
import { getCookie } from "cookies-next";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import ModuleWindow from "../../../UI/ModuleWindow";
import { main_categories } from "../../searchManagement/SearchConstants";

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
  if (categoryState) {
    if (!e.target.className.includes("dropdown")) {
      if (
        isFieldTouchedInRedux("main_category", touchedFieldsRedux) &&
        !categoryState &&
        categoryState.trim() === ""
      ) {
        setError("main_category", {
          type: "custom",
          message: "Please, choose category",
        });
      } else if (categoryState || categoryState.trim() !== "") {
        clearErrors("main_category");
      }
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
  const router = useRouter();

  useEffect(() => {
    if (!getCookie("token")) {
      router.push("/sign_up");
    }
  }, []);

  const {
    register,
    setValue,
    getValues,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isValid },
  } = useForm({
    mode: "onBlur",
    reValidateMode: "onChange",
    criteriaMode: "firstError",
  });

  const {
    isLoading,
    error: postError,
    sendRequest: postForm,
  } = useHttpRequest();

  const onSubmit = (data) => {
    const formData = new FormData();
    for (let key in data) {
      if (key !== "file") formData.append(key, data[key]);
    }
    formData.append("file", data.file[0]);
    const token = getCookie("token");
    const authorization = { authorization: `Bearer ${token}` };

    console.log(formData);
    postForm(
      {
        url: "/api/posts",
        method: "POST",
        headers: { ...authorization },
        body: formData,
      },
      () => {
        router.push("/");
      }
    );
  };

  const categoryState = useSelector(({ addPost }) => addPost.category);
  const ageState = useSelector(({ addPost }) => addPost.age.value);
  const touchedFieldsRedux = useSelector(
    ({ addPost }) => addPost.touchedFields
  );

  const [fileIsTouched, setFileAsTouched] = useState(false);

  return (
    <div className="outer-container">
      {postError && (
        <ModuleWindow
          type="ERROR"
          message={`Sorry, something went wrong... :(`}
          image={{
            src: "/images/sad-unicorn.svg",
            className: "sending-post-animation",
          }}
          blur="addPost-blur"
        ></ModuleWindow>
      )}
      {isLoading && (
        <ModuleWindow
          type="INFO"
          message="Your post is being sent..."
          image={{
            src: "/images/post-office.svg",
            className: "sending-post-animation",
          }}
          blur="addPost-blur"
        ></ModuleWindow>
      )}

      <form
        method="POST"
        action={action}
        className="form addPost"
        onSubmit={handleSubmit((data) => onSubmit(data))}
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
                errors.main_category && categoryState.length === 0
                  ? "dropdown-error"
                  : ""
              }`}
              {...register("main_category", {
                value: setValue("main_category", categoryState),
              })}
            ></CategoryDropdown>
          </div>
          {errors.main_category && categoryState.length === 0 && (
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
