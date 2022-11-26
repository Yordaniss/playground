import { useState, useEffect } from "react";
import useHttpRequest from "../../hooks/useHttpRequest";
import SearchManagement from "../searchManagement/SearchManagement";
import Post from "./Post";
import AddPost from "./AddPost";

export default function PostsDashboard(props) {
  const [posts, setPosts] = useState([]);
  const { isLoading, error, sendRequest: fetchPosts } = useHttpRequest();

  useEffect(() => {
    const postsFetchCallback = (fetchResult) => {
      setPosts(fetchResult.data);
    };
    fetchPosts({ url: "http://localhost:3000/api/posts" }, postsFetchCallback);
  }, []);
  return (
    <section className="postsDashboard" id="postsDashboard">
      {/* <svg
        id="svg"
        viewBox="0 0 1440 400"
        preserveAspectRatio="none"
        className="svgUnderIllustration"
      >
        <path
          d="M 0,400 C 0,400 0,200 0,200 C 148.92857142857142,162.28571428571428 297.85714285714283,124.57142857142858 400,131 C 502.14285714285717,137.42857142857142 557.5000000000001,188 666,218 C 774.4999999999999,248 936.1428571428571,257.42857142857144 1074,251 C 1211.857142857143,244.57142857142858 1325.9285714285716,222.28571428571428 1440,200 C 1440,200 1440,400 1440,400 Z"
          stroke="none"
          strokeWidth="0"
          fill="#f7cac9"
          fillOpacity="1"
          className="transition-all duration-300 ease-in-out delay-150 path-0"
          transform="rotate(-180 720 200)"
        ></path>
      </svg> */}

      <SearchManagement></SearchManagement>
      <AddPost></AddPost>
      <div className="dashboard">
        {isLoading && "Loading..."}
        {error && error}
        {posts &&
          posts.map((post) => {
            return <Post key={Math.random()} post={post}></Post>;
            // console.log(post);
          })}
      </div>
    </section>
  );
}
