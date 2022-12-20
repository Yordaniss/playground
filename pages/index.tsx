import clientPromise from "../lib/mongodb";
import { InferGetServerSidePropsType } from "next";
import App from "./_app";
import React from "react";

export async function getServerSideProps(context: any) {
  try {
    await clientPromise;
    // `await clientPromise` will use the default database passed in the MONGODB_URI
    // However you can use another database (e.g. myDatabase) by replacing the `await clientPromise` with the following code:
    //
    // `const client = await clientPromise`
    // `const db = client.db("myDatabase")`
    //
    // Then you can execute queries against your database like so:
    // db.find({}) or any of the MongoDB Node Driver commands

    // const res = await fetch('http://localhost:3000/api/posts');
    // const data = await res.json();
    // console.log(data);

    return {
      props: { isConnected: true },
    };
  } catch (e) {
    console.error(e);
    return {
      props: { isConnected: false },
    };
  }
}

export default function Home(
  { isConnected }: InferGetServerSidePropsType<typeof getServerSideProps>,
  props: any
) {
  return <App {...props} />;
}
