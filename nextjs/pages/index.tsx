import { GetStaticProps, NextPage } from "next";
import Link from "next/link";
import PostItem from "../components/PostItem";
import { Post } from "../types";

type Props = {
  posts: Post[];
};

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch(
    "https://jsonplaceholder.typicode.com/posts?_page=1&_limit=5"
  );
  const posts: Post[] = await res.json();

  return {
    props: {
      posts,
    },
  };
};

const Home: NextPage<Props> = ({ posts }) => {
  return (
    <div className="w-full">
      {posts.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
      <Link href="/posts?page=1">
        <div className="text-center underline underline-offset-2 cursor-pointer">
          See all
        </div>
      </Link>
    </div>
  );
};

export default Home;
