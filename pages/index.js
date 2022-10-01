import { Fragment } from "react";
import FeaturedPosts from "../components/Home/featured-posts";
import Hero from "../components/Home/hero";
import { getFeaturedPosts } from "../lib/posts-utils";
import Head from "next/dist/next-server/lib/head";

function HomePage(props) {
  return (
    <Fragment>
      <Head>
        <title>Welcome to my blog</title>
        <meta
          name="description"
          content="i post about programming and web dev"
        />
      </Head>
      <Hero />
      <FeaturedPosts posts={props.posts} />
    </Fragment>
  );
}

export function getStaticProps() {
  const featuredPosts = getFeaturedPosts();

  return {
    props: {
      posts: featuredPosts,
    },
  };
}

export default HomePage;

// hero
// Featured posts
