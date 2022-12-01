import { useState, useEffect } from "react";
import useHttpRequest from "../../hooks/useHttpRequest";
import SearchManagement from "../searchManagement/SearchManagement";
import Post from "./Post";
import { useSelector } from "react-redux";
import { orderBy } from "lodash";

export default function PostsDashboard() {
  const searchConfig = useSelector(({ searchConfig }) => searchConfig);

  const {
    isLoading,
    error,
    sendRequest: fetchPosts,
    data: posts,
  } = useHttpRequest();

  let orderedPosts;
  const sort = () => {
    const sortedPosts = orderBy(
      posts.data,
      [searchConfig.sorting.property],
      [searchConfig.sorting.direction]
    );
    return sortedPosts;
  };

  useEffect(() => {
    const postsFetchCallback = (fetchResult) => {};
    fetchPosts({ url: "http://localhost:3000/api/posts" }, postsFetchCallback);
  }, []);

  if (
    searchConfig.sorting.property !== "default" &&
    searchConfig.sorting.direction !== "default"
  ) {
    if (posts) orderedPosts = sort();
  } else {
    if (posts) orderedPosts = posts.data;
  }
  return (
    <section className="postsDashboard" id="postsDashboard">
      <SearchManagement
      // onSelect={(orderingProps, selectionModifier) =>
      //   onSelect(orderingProps, selectionModifier)
      // }
      ></SearchManagement>
      <div className="dashboard">
        {isLoading && "Loading..."}
        {error && error}
        {orderedPosts &&
          orderedPosts.map((post) => {
            return <Post key={Math.random()} post={post}></Post>;
          })}
      </div>
    </section>
  );
}
