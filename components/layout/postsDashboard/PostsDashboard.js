import { useState, useEffect, useRef } from "react";
import useHttpRequest from "../../hooks/useHttpRequest";
import SearchManagement from "../searchManagement/SearchManagement";
import Post from "./Post";
import { useSelector } from "react-redux";
import { orderBy } from "lodash";
import Pagination from "../../UI/Pagination";
import ModuleWindow from "../../UI/ModuleWindow";

export default function PostsDashboard() {
  const searchConfig = useSelector(({ searchConfig }) => searchConfig);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;
  const rocketBtnRef = useRef(null);
  const dashboardRef = useRef(null);

  const {
    isLoading,
    error,
    sendRequest: fetchPosts,
    data: posts,
  } = useHttpRequest();

  useEffect(() => {
    const filterObj = searchConfig.filtration;
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
      (posts) => {
        console.log(posts);
      }
    );
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

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 200) {
        rocketBtnRef.current.style.display = "block";
      } else {
        rocketBtnRef.current.style.display = "none";
      }
    });
  }, []);

  return (
    <section className="postsDashboard" id="postsDashboard">
      <SearchManagement></SearchManagement>
      <div className="dashboard" ref={dashboardRef}>
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
      <input
        ref={rocketBtnRef}
        type="button"
        className="button scroll-to-top"
        value="🚀"
        onClick={() => {
          rocketBtnRef.current.classList.add("rocket-animate");
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
          setTimeout(() => {
            rocketBtnRef.current.classList.remove("rocket-animate");
          }, 1000);
        }}
      />
    </section>
  );
}
