import { Box, Grid } from "@chakra-ui/react";
import postApi from "api/postApi";
import BlogItem from "components/BlogItem";
import { useAppSelector } from "hooks";
import React, { useEffect, useState } from "react";
import Post from "types/post";

function Bookmark() {
  const postIds = useAppSelector((state) => state.bookmark.bookmarks);
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    async function fetchBookmakPost() {
      let posts: Post[] = [];
      for await (let id of postIds) {
        const res = await postApi.getPostById(id);
        posts.push(res.data);
      }

      setPosts(posts);
    }

    fetchBookmakPost();
  }, [postIds]);

  return (
    <Box py="10">
      <Grid templateColumns="repeat(4,1fr)" gap="6">
        {posts.map((post, index) => (
          <BlogItem key={post.id} post={post} />
        ))}
      </Grid>
    </Box>
  );
}

export default Bookmark;
