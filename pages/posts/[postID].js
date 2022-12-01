import React, { useState, useEffect } from "react";
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
  return (
    <div className="post-container">
      <Post post={post.data}></Post>
    </div>
  );
}
