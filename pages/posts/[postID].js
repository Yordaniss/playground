import React from "react";
import Post from "../../components/layout/postsDashboard/Post";
import { useRouter } from "next/router";
import { server } from "../../config/index";
import ModuleWindow from "../../components/UI/ModuleWindow";

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
    return (
      <ModuleWindow
        type="INFO"
        message="Your post is loading..."
        image={{
          src: "/images/post-office.svg",
          className: "sending-post-animation",
        }}
        blur="addPost-blur"
      ></ModuleWindow>
    );
  }
  return (
    <div className="post-container">
      <Post post={post.data} viewModifier="WHOLE_POST"></Post>
    </div>
  );
}
