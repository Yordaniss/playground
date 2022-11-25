import { useState, useEffect } from "react";
import useHttpRequest from "../../hooks/useHttpRequest";

export default function AddPost(props) {
  const { isLoading, error, sendRequest: sendPost } = useHttpRequest();

  // useEffect(() => {
  const sendPostCallback = (sendingResult, postTitle) => {
    // setPosts(fetchResult.data);
    // props.onAddPost();
    console.log("success");
  };
  const taskSubmitHandler = (e) => {
    // e.preventDefault();
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
          file: {},
        },
      },
      sendPostCallback()
      // sendPostCallback.bind(null, postTitle)
    );
  };

  // return (
  //   <form
  //     style={{
  //       backgroundColor: "white",
  //       height: "500px",
  //       position: "relative",
  //       display: "flex",
  //       justifyContent: "space-around",
  //     }}
  //     onSubmit={taskSubmitHandler}
  //   >
  //     <p>{isLoading}</p>
  //     <button type="submit">Submit</button>
  //   </form>
  // );
}
