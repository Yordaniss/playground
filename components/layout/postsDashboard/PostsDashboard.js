import { useState, useEffect } from "react";
import useHttpRequest from "../../hooks/useHttpRequest";
import SearchManagement from "../searchManagement/SearchManagement";
import Post from "./Post";
import { useSelector } from "react-redux";
import { orderBy } from "lodash";
import Pagination from "../../UI/Pagination";
import { server } from "../../../config/index";

export default function PostsDashboard() {
  const searchConfig = useSelector(({ searchConfig }) => searchConfig);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(2);

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

  const url = `${server}/api/posts`;

  useEffect(() => {
    fetchPosts({ url: url }, () => {});
  }, []);

  if (
    searchConfig.sorting.property !== "default" &&
    searchConfig.sorting.direction !== "default"
  ) {
    if (posts) orderedPosts = sort();
  } else {
    if (posts) orderedPosts = posts.data;
  }

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  let currentPosts;
  if (posts) {
    currentPosts = orderedPosts.slice(indexOfFirstPost, indexOfLastPost);
  }

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <section className="postsDashboard" id="postsDashboard">
      <SearchManagement></SearchManagement>
      <div className="dashboard">
        {isLoading && "Loading..."}
        {error && error}
        {posts &&
          currentPosts.map((post) => {
            return <Post key={Math.random()} post={post}></Post>;
          })}
        {posts && (
          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={posts.data.length}
            paginate={paginate}
          ></Pagination>
        )}
      </div>
    </section>
  );
}
