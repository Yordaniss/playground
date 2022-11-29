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
      <SearchManagement></SearchManagement>
      <div className="dashboard">
        {isLoading && "Loading..."}
        {error && error}
        {posts &&
          posts.map((post) => {
            return <Post key={Math.random()} post={post}></Post>;
          })}
      </div>
    </section>
  );
}
