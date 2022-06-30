import { postApi } from "api";
import { useAppSelector } from "hooks";
import { useEffect, useState } from "react";
import { Post } from "types";

export function useBookmarkPosts() {
  const postIds = useAppSelector((state) => state.bookmark.collections);
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
