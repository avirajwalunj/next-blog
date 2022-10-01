import AllPosts from "../../components/posts/all-posts";
import { getAllPosts } from "../../lib/posts-utils";

import { Fragment } from "react";
import Head from "next/head";

function AllPostsPage(props) {
  return (
    <Fragment>
      <Head>
        <title>All posts</title>
        <meta
          name="description"
          content="a list of all programming related posts"
        />
      </Head>
      <AllPosts posts={props.allPosts} />
    </Fragment>
  );
}

export function getStaticProps() {
  return {
    props: {
      allPosts: getAllPosts(),
    },
  };
}

export default AllPostsPage;
