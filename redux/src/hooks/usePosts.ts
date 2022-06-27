import postApi from "api/postApi";
import userApi from "api/userApi";
import { useEffect, useState } from "react";
import Post from "types/post";
import User from "types/user";

function usePosts(currentPage: number) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [fetching, setFetching] = useState<boolean>(false);
  const [failed, setFailed] = useState<boolean>(false);
  const [totalRecord, setTotalRecord] = useState<number>(0);
  const limit = 8;

  useEffect(() => {
    async function fetchAuthorInfo(user_id: string) {
      const user = await userApi.getUserById(user_id);
      return user;
    }

    async function fetchPosts() {
      setFetching(true);
      try {
        const { posts, total } = await postApi.getPosts(limit, currentPage);
        setTotalRecord(total);

        if (posts.length > 0) {
          const authors: User[] = [];
          for await (const post of posts) {
            const author = await fetchAuthorInfo(post.author_id);
            authors.push(author);
          }

          setPosts(
            posts.map((post, index) => {
              return {
                ...post,
                author_name: authors[index].name,
              };
            })
          );
          setFetching(false);
          setFailed(false);
        }
      } catch (err) {
        setFailed(true);
        setFetching(false);
      }
    }

    fetchPosts();
  }, [currentPage]);

  return { posts, fetching, failed, totalRecord, limit };
}

export default usePosts;
