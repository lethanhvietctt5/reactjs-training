import postApi from "api/postApi";
import { useAppSelector } from "hooks";
import { useEffect, useState } from "react";
import Post from "types/post";

function useBookmark() {
  const postIds = useAppSelector((state) => state.bookmark.bookmarks);
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    async function fetchBookmakPost() {
      const posts: Post[] = [];
      for (const id of postIds) {
        const post = await postApi.getPostById(id);
        posts.push(post);
      }

      setPosts(posts);
    }

    fetchBookmakPost();
  }, [postIds]);
  return [posts];
}

export default useBookmark;
