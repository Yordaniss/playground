import React, { useState, useEffect } from "react";
import Post from "../../components/layout/postsDashboard/Post";
import { useRouter } from "next/router";
import { server } from "../../config/index";

export async function getStaticPaths() {
  const res = await fetch(`${server}/api/posts`);
  const posts = await res.json();
  const paths = posts.data.map((post) => ({
    params: { postID: post._id },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const res = await fetch(`${server}/api/${params.postID}`);

  const post = await res.json();

  if (!post) {
    return {
      notFound: true,
    };
  }

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
