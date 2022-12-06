import { useState, useEffect } from "react";
import useHttpRequest from "../../hooks/useHttpRequest";
import SearchManagement from "../searchManagement/SearchManagement";
import Post from "./Post";
import { useSelector } from "react-redux";
import { orderBy } from "lodash";
import Pagination from "../../UI/Pagination";
import ModuleWindow from "../../UI/ModuleWindow";
import { main_categories } from "../searchManagement/SearchConstants";

export default function PostsDashboard() {
  const searchConfig = useSelector(({ searchConfig }) => searchConfig);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;

  const {
    isLoading,
    error,
    sendRequest: fetchPosts,
    data: posts,
  } = useHttpRequest();

  useEffect(() => {
    if (searchConfig.filtration) {
      const filterObj = searchConfig.filtration;
      // console.log(searchConfig.filtration.filters[0].filterBy);
      const filtersJSON = JSON.stringify(filterObj);
      console.log(filtersJSON);
      fetchPosts(
        {
          url: `/api/search`,
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: filtersJSON,
        },
        () => {
          console.log("filtered");
        }
      );
    } else {
      fetchPosts(
        {
          url: `/api/posts`,
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        },
        () => {
          console.log("not filtered");
        }
      );
    }
  }, [searchConfig]);

  const sort = () => {
    if (searchConfig.sorting.property === "default") {
      return posts.data.reverse();
    }
    if (searchConfig.sorting.property === "date") {
      searchConfig.sorting.direction === "desc"
        ? posts.data.reverse()
        : posts.data;
    }
    return orderBy(
      posts.data,
      [searchConfig.sorting.property],
      [searchConfig.sorting.direction]
    );
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  let postsForPage;
  if (posts) {
    const sortedPosts = sort();
    postsForPage = sortedPosts.slice(indexOfFirstPost, indexOfLastPost);
  }

  return (
    <section className="postsDashboard" id="postsDashboard">
      <SearchManagement></SearchManagement>
      <div className="dashboard">
        {isLoading && (
          <ModuleWindow
            type="INFO"
            message="Loading..."
            image={{
              src: "/images/post-office.svg",
              className: "sending-post-animation",
            }}
            className="postsDashboard-loading"
            blur="postsDashboard-blur"
          ></ModuleWindow>
        )}
        {error && (
          <ModuleWindow
            type="ERROR"
            message={`Sorry, something went wrong... :( 
              Maybe try to reload..?`}
            image={{
              src: "/images/sad-unicorn.svg",
              className: "sending-post-animation",
            }}
            className="postsDashboard-loading"
            blur="postsDashboard-blur"
          ></ModuleWindow>
        )}
        {postsForPage &&
          postsForPage.map((post) => {
            return <Post key={Math.random()} post={post}></Post>;
          })}
        {postsForPage && (
          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={posts.data.length}
            paginate={paginate}
            currentPage={currentPage}
          ></Pagination>
        )}
      </div>
    </section>
  );
}
