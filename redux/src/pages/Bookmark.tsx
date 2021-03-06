import { Box, Grid } from "@chakra-ui/react";
import BlogItem from "components/BlogItem";
import { useBookmarkPosts } from "hooks";

function Bookmark() {
  const [posts] = useBookmarkPosts();

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
