import { useState, useEffect } from "react";
import useHttpRequest from "../../hooks/useHttpRequest";
import SearchManagement from "../searchManagement/SearchManagement";
import Post from "./Post";
import { orderBy, filter } from "lodash";

export default function PostsDashboard(props) {
  const [posts, setPosts] = useState([]);
  const { isLoading, error, sendRequest: fetchPosts } = useHttpRequest();

  useEffect(() => {
    const postsFetchCallback = (fetchResult) => {
      setPosts(fetchResult.data);
    };
    fetchPosts({ url: "http://localhost:3000/api/posts" }, postsFetchCallback);
  }, []);

  // const onSelect = (orderingProps, selectionModifier) => {
  //   const data = posts;
  //   if (selectionModifier === "SORT") {
  //     const sortedData = orderBy(
  //       data,
  //       [
  //         (dataUnit) => {
  //           if (typeof dataUnit[`${orderingProps.sortBy}`] === "string") {
  //             return dataUnit[`${orderingProps.sortBy}`].toLowerCase();
  //           } else {
  //             return dataUnit[`${orderingProps.sortBy}`];
  //           }
  //         },
  //       ],
  //       [orderingProps.direction]
  //     );
  //     setPosts(sortedData);
  //   } else if (selectionModifier === "FILTER") {
  //     // const sortedData = filter(data, [
  //     //   (dataUnit) => {
  //     //     orderingProps.map((orderingProp) => {
  //     //       if (
  //     //         dataUnit[`${orderingProp.filterBy}`] ===
  //     //         orderingProp.propertyValue
  //     //       ) {
  //     //         return dataUnit[`${orderingProp.filterBy}`];
  //     //       }
  //     //     });
  //     //   },
  //     // ]);
  //     // console.log(orderingProps);
  //     let categories = [];
  //     orderingProps.map((prop) => {
  //       const { main_category } = prop;
  //       categories.push(main_category);
  //     });
  //     const sortedData = data.filter((dataUnit) => {
  //       if (categories.includes(dataUnit.main_category)) return dataUnit;
  //     });
  //     console.log(sortedData);
  //     console.log(orderingProps);
  //     // setPosts(sortedData);
  //   }
  // };

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
