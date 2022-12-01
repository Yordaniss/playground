import { useState, useEffect } from "react";
import useHttpRequest from "../../hooks/useHttpRequest";
import SearchManagement from "../searchManagement/SearchManagement";
import Post from "./Post";
import { useSelector } from "react-redux";
// import { searchConfigActions } from "../../../store/index";

export default function PostsDashboard() {
  const searchConfig = useSelector(({ searchConfig }) => searchConfig);
  console.log(searchConfig);

  const [posts, setPosts] = useState([]);
  const { isLoading, error, sendRequest: fetchPosts } = useHttpRequest();

  useEffect(() => {
    const postsFetchCallback = (fetchResult) => {
      setPosts(fetchResult.data);
    };

    let url = "http://localhost:3000/api/";

    if (searchConfig.filtration.filters.length > 0) {
      url += "search/";
    }
    fetchPosts({ url: "http://localhost:3000/api/posts" }, postsFetchCallback);
  }, []);

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
        {posts &&
          posts.map((post) => {
            return <Post key={Math.random()} post={post}></Post>;
          })}
      </div>
    </section>
  );
}
