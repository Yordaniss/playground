import { useState, useEffect, use } from "react";
import useHttpRequest from "../../hooks/useHttpRequest";
import Dropdown from "../../UI/Dropdown";
import Button from "../../UI/Button";
import useInput from "../../hooks/useInput";
import AgeInput from "../searchManagement/AgeInput";

export default function AddPost(props) {
  const {
    value: enteredTitle,
    isValid: enteredTitleIsValid,
    hasError: titleHasError,
    valueChangeHandler: titleChangeHandler,
    inputBlurHandler: titleInputBlurHandler,
    reset: resetTitleInput,
  } = useInput((value) => value.trim() !== "");

  let isFormValid = false;

  if (enteredTitleIsValid) {
    isFormValid = true;
  } else {
    isFormValid = false;
  }

  useEffect(() => {
    const sendPostCallback = (sendingResult, postTitle) => {
      setPosts(fetchResult.data);
      // props.onAddPost();
    };
  }, []);

  const formSubmitHandler = (e) => {
    e.preventDefault();
    sendPost(
      {
        url: "http://localhost:3000/api/posts",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: {
          title: "hi",
          main_category: 2,
          age_category: 6,
          components: [
            ["Required items", ["rock", "paper", "scissors"]],
            ["Instruction", ["Die"]],
          ],
        },
      },
      sendPostCallback()
      // sendPostCallback.bind(null, postTitle)
    );

    if (!isFormValid) {
      return;
    }
    resetTitleInput();
  };

  const { isLoading, error, sendRequest: sendPost } = useHttpRequest();

  console.log(titleHasError ? "input-error" : "");

  return (
    <div className="outer-container">
      <form className="form addPost" onSubmit={formSubmitHandler}>
        {isLoading && <p>{isLoading}</p>}
        {error && <p>{error}</p>}
        <div className="addPost__inner-container">
          <label className="labelForTitleInput" htmlFor="inputPostTitle">
            Post title:
          </label>
          <input
            className={`input ${titleHasError ? "input-error" : ""}`}
            onChange={titleChangeHandler}
            onBlur={titleInputBlurHandler}
            id="inputPostTitle"
            type="text"
            value={enteredTitle}
            placeholder="Title is..."
          />
          <label className="labelForTextarea">Text of the post: </label>
          <textarea
            placeholder="Your funny activiy..."
            className={`textarea`}
          />
          <label className="labelForAgeInput">Enter child's age: </label>
          <AgeInput></AgeInput>
          <Dropdown
            className="dropdown"
            dropdownList={{
              key: Math.random(),
              title: "Choose category:",
              list: ["Cooking", "Games", "Sport", "Arts & Crafts", "Foraging"],
            }}
            selectionModifier="SORT"
          ></Dropdown>
          <label className="button custom-file-input" htmlFor="chooseFile">
            Choose file
          </label>
          <input id="chooseFile" type="file" />
        </div>
        <div className="formButtons">
          <input
            disabled={!isFormValid}
            className="button submit"
            type="submit"
            value="submit post"
          />
          <input type="reset" value="cancel" className="button cancel" />
        </div>
      </form>
    </div>
  );
}
