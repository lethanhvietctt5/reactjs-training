import { Grid } from "@chakra-ui/react";
import { Post } from "types";
import BlogItem from "./BlogItem";

type Props = {
  posts: Post[];
};

function ListPosts({ posts }: Props) {
  return (
    <Grid templateColumns="repeat(4,1fr)" gap="6">
      {posts.map((post) => (
        <BlogItem key={post.id} post={post} />
      ))}
    </Grid>
  );
}

export default ListPosts;
