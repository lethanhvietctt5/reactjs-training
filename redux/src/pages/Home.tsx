import { TimeIcon } from "@chakra-ui/icons";
import { Badge, Box, Flex, Grid, Heading, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import api from "../service";

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

        console.log(res);
      } catch (err) {}
    }

    fetchPosts();
  }, []);

  const arr_color = ["orange.400", "blue.400", "green.400", "yellow.400"];

  return (
    <Box mt="10">
      <Grid templateColumns="repeat(4,1fr)" gap="6">
        {posts.map((post) => (
          <Box backgroundColor="white" borderRadius="lg" p="5" cursor="pointer">
            <Heading noOfLines={2} size="lg" fontWeight="900">
              {post.title}
            </Heading>
            <Text fontWeight="bold">
              {post.tags.map((tag, index) => (
                <Badge
                  my="1"
                  mr="1"
                  backgroundColor={arr_color[index]}
                  color="white"
                >
                  {tag}
                </Badge>
              ))}
            </Text>
            <Flex align="center" gap="4">
              <Flex py="2" fontSize="xs" gap="1">
                by <Text color="green">{post.author_name}</Text>
              </Flex>
              <Flex align="center" gap="1">
                <TimeIcon w="3" />
                <Text py="2" fontSize="xs">
                  {new Date(post.created_at).toLocaleDateString()}
                </Text>
              </Flex>
            </Flex>
            <Text fontSize="sm" noOfLines={4}>
              {post.body}
            </Text>
          </Box>
        ))}
      </Grid>
    </Box>
  );
}

export default Home;
