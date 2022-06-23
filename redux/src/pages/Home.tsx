import { Box, Grid } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import BlogItem from "../components/BlogItem";
import api from "../api";

function Home() {
  const [posts, setPosts] = useState([] as Post[]);

  useEffect(() => {
    async function fetchAuthor(id: string) {
      const data = await api.get(`/users/${id}`);
      return data;
    }

    async function fetchPosts() {
      try {
        const res = await api.get("/posts");
        if (res.data.length > 0) {
          let posts: Post[] = res.data;
          let authors: User[] = [];
          for await (const post of posts) {
            const author = await fetchAuthor(post.author_id);
            authors.push(author.data);
          }

          posts = posts.map((post, index) => {
            return {
              ...post,
              author_name: authors[index].name,
            };
          });

          setPosts(posts);
        }
      } catch (err) {}
    }

    fetchPosts();
  }, []);

  return (
    <Box py="10">
      <Grid templateColumns="repeat(4,1fr)" gap="6">
        {posts.map((post, index) => (
          <BlogItem key={index} post={post} />
        ))}
      </Grid>
    </Box>
  );
}

export default Home;
