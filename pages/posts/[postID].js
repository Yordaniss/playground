import React, { useState, useEffect } from "react";
import useHttpRequest from "../../components/hooks/useHttpRequest";

function getPostIds() {
  const [posts, setPosts] = useState(null);
  const { isLoading, error, sendRequest: fetchPosts } = useHttpRequest();

  useEffect(() => {
    const postsFetchCallback = (fetchResult) => {
      setPosts(fetchResult.data);
    };
    fetchPosts({ url: "http://localhost:3000/api/posts" }, postsFetchCallback);
  }, []);

  let ids = [];
  posts.map((post) => {
    ids.push(post._id);
  });

  return {
    props: {
      ids: ids,
    },
  };
}

export async function getStaticPaths() {
  const ids = getPostIds();
  let paths = [];
  ids.map((id) => {
    paths.push({ params: { postID: id } });
  });
  return { paths, fallback: false };
}

export async function getStaticProps(context) {
  const { isLoading, error, sendRequest: fetchPost } = useHttpRequest();
  const { params } = context;
  const [post, setPost] = useState(null);

  useEffect(() => {
    const postFetchCallback = (fetchResult) => {
      setPost(fetchResult.data);
    };
    fetchPost(
      {
        url: `http://localhost:3000/api/${params.postID}`,
      },
      postFetchCallback
    );
  }, []);
  return {
    props: {
      post: post,
    },
  };
}

// export const getServerSideProps = async (context) => {
//   const { isLoading, error, sendRequest: fetchPost } = useHttpRequest();
//   const id = context.params.postID;
//   const [post, setPost] = useState(null);
//   useEffect(() => {
//     const postFetchCallback = (fetchResult) => {
//       setPost(fetchResult.data);
//     };
//     fetchPost(
//       {
//         url: `http://localhost:3000/api/${id}`,
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: {},
//       },
//       postFetchCallback
//     );
//     // sendPost(
//     //   {
//     //     url: "http://localhost:3000/api/posts",
//     //     method: "POST",
//     //     headers: {
//     //       "Content-Type": "application/json",
//     //     },
//     //     body: {
//     //       title: "hi",
//     //       main_category: 2,
//     //       age_category: 6,
//     //       components: [
//     //         ["Required items", ["rock", "paper", "scissors"]],
//     //         ["Instruction", ["Die"]],
//     //       ],
//     //     },
//     //   },
//     //   sendPostCallback()
//     // sendPostCallback.bind(null, postTitle)
//     // );
//   }, []);
//   console.log(post);
//   return {
//     props: {
//       post: post.data,
//     },
//   };
//   return {
//     props: {
//       id: id,
//     },
//   };
// };

export default function PostInfo(props) {
  return (
    <React.Fragment>
      {/* {isLoading && "Loading"}
      {error && error}
      <Post post={post}></Post> */}
    </React.Fragment>
  );
}
