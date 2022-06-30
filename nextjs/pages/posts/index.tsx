import { GetServerSideProps, NextPage } from "next";
import PostItem from "../../components/PostItem";
import usePagination from "../../hooks/usePagination";
import { Post } from "../../types";

type Props = {
  posts: Post[];
  page: number;
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { page } = query;
  let pageNumber = 1;

  if (page && parseInt(page.toString())) {
    pageNumber = parseInt(page.toString());
  }

  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_page=${pageNumber}&_limit=5`
  );
  const posts: Post[] = await res.json();
  return {
    props: {
      posts,
      page: pageNumber,
    },
  };
};

const Posts: NextPage<Props> = ({ posts, page }) => {
  const { pageNumber, next, prev } = usePagination(page);
  
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <button
          className="border text-xl rounded-md px-4 py-3 cursor-pointer disabled:opacity-25"
          onClick={prev}
          disabled={pageNumber === 1}
        >
          Prev
        </button>

        <button
          className="border text-xl rounded-md px-4 py-3 cursor-pointer"
          onClick={next}
        >
          Next
        </button>
      </div>
      <div className="w-full">
        {posts.map((post) => (
          <PostItem key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Posts;
