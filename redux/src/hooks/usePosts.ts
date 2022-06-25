import postApi from "api/postApi";
import userApi from "api/userApi";
import { useEffect, useState } from "react";
import Post from "types/post";
import User from "types/user";

function usePosts(currentPage: number) {
  const [posts, setPosts] = useState<Post[]>([]);
  const limit = 8;

  useEffect(() => {
    async function fetchAuthorInfo(user_id: string) {
      const user = await userApi.getUserById(user_id);
      return user;
    }

    async function fetchPosts() {
      try {
        let posts = await postApi.getPosts(limit, currentPage);
        if (posts.length > 0) {
          const authors: User[] = [];
          for await (const post of posts) {
            const author = await fetchAuthorInfo(post.author_id);
            authors.push(author);
          }

          posts = posts.map((post, index) => {
            return {
              ...post,
              author_name: authors[index].name,
            };
          });

          setPosts(posts);
        }
      } catch (err) {
        console.log(err);
      }
    }

    fetchPosts();
  }, [currentPage]);

  return posts;
}

export default usePosts;
