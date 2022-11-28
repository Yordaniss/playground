import { useState, useEffect, use } from "react";
import useHttpRequest from "../../hooks/useHttpRequest";
import Dropdown from "../../UI/Dropdown";
import Button from "../../UI/Button";
// import Input from "../../UI/Input";

export default function AddPost(props) {
  const [isInputTouched, setInputIsTouched] = useState({
    title: false,
    text: false,
    category: false,
  });
  const [enteredFormData, setEnteredFormData] = useState({
    title: "",
    text: "",
    category: 0,
  });
  const enteredFormDataIsValid = {
    title: enteredFormData.title.trim() !== "" ? true : false,
    text: enteredFormData.text.trim() !== "" ? true : false,
    category: false,
  };
  const putErrorClass = {
    title: !enteredFormDataIsValid.title && isInputTouched.title ? true : false,
    text: !enteredFormDataIsValid.text && isInputTouched.text ? true : false,
    category: false,
  };

  let isFormValid = false;

  if (enteredFormDataIsValid.title && enteredFormDataIsValid.text) {
    isFormValid = true;
  } else {
    isFormValid = false;
  }

  const titleInputChangeHandler = (e) => {
    setEnteredFormData((prevInput) => {
      return { ...prevInput, title: e.target.value };
    });
  };

  const titleInputBlurHandler = (e) => {
    setInputIsTouched((prevInput) => {
      return { ...prevInput, title: true };
    });
  };

  const textTextareaChangeHandler = (e) => {
    setEnteredFormData((prevInput) => {
      return { ...prevInput, text: e.target.value };
    });
  };

  const textTextareaBlurHandler = (e) => {
    setInputIsTouched((prevInput) => {
      return { ...prevInput, text: true };
    });
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();
    // sendPost(
    //   {
    //     url: "http://localhost:3000/api/posts",
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: {
    //       title: "hi",
    //       main_category: 2,
    //       age_category: 6,
    //       components: [
    //         ["Required items", ["rock", "paper", "scissors"]],
    //         ["Instruction", ["Die"]],
    //       ],
    //     },
    //   },
    //   sendPostCallback()
    //   // sendPostCallback.bind(null, postTitle)
    // );

    if (!enteredFormDataIsValid.title) {
      return;
    }
    setEnteredFormData({
      title: "",
      authorsUsername: "",
      text: "",
      category: 0,
    });

    setInputIsTouched({
      title: false,
      authorsUsername: false,
      text: false,
      category: false,
    });
  };

  const { isLoading, error, sendRequest: sendPost } = useHttpRequest();

  // useEffect(() => {
  const sendPostCallback = (sendingResult, postTitle) => {
    // setPosts(fetchResult.data);
    // props.onAddPost();
    console.log("success");
  };

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
            className={`input ${putErrorClass.title ? "input-error" : ""}`}
            onChange={titleInputChangeHandler}
            onBlur={titleInputBlurHandler}
            id="inputPostTitle"
            type="text"
            value={enteredFormData.title}
            placeholder="Title is..."
          />
          <label className="labelForTextarea">Text of the post: </label>
          <textarea
            placeholder="Your funny activiy..."
            className={`textarea ${putErrorClass.text ? "input-error" : ""}`}
            onChange={textTextareaChangeHandler}
            onBlur={textTextareaBlurHandler}
            value={enteredFormData.text}
          />
          <Dropdown
            className="dropdown"
            dropdownList={{
              key: Math.random(),
              title: "Choose category:",
              list: ["Cooking", "Games", "Sport", "Arts & Crafts", "Foraging"],
            }}
            selectionModifier="SORT"
          ></Dropdown>
        </div>
        <div className="formButtons">
          <input
            disabled={!isFormValid}
            className="button"
            type="submit"
            value="submit post"
          ></input>
          <a className="button cancel">cancel</a>
        </div>
      </form>
    </div>
  );
}
