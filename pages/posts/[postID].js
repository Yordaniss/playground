import React, { useState, useEffect } from "react";
import useHttpRequest from "../../components/hooks/useHttpRequest";
import Post from "../../components/layout/postsDashboard/Post";
import { useRouter } from "next/router";

export async function getStaticPaths() {
  const res = await fetch("http://localhost:3000/api/posts");
  const posts = await res.json();
  const paths = posts.data.map((post) => ({
    params: { postID: post._id },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const res = await fetch(`http://localhost:3000/api/${params.postID}`);

  const post = await res.json();

  return { props: { post } };
}

export default function PostInfo({ post }) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  // console.log(post);
  return (
    <div className="post-container">
      <Post post={post.data}></Post>
    </div>
  );
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
