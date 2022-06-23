import { Avatar, Box, Flex, Grid } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import BlogItem from "../components/BlogItem";
import api from "../api";
import Post from "types/post";
import User from "types/user";
import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";
import { useSearchParams } from "react-router-dom";

function Home() {
  const [posts, setPosts] = useState([] as Post[]);
  const [params, setParams] = useSearchParams();
  const [page, setPage] = useState(1);
  const limit = 8;
  const [arrPages, setArrPages] = useState([1, 2, 3, 4, 5]);

  useEffect(() => {
    if (params.has("page")) {
      setPage(parseInt(params.get("page") as string));
    }
  }, [params]);

  useEffect(() => {
    async function fetchAuthor(id: string) {
      const data = await api.get(`/users/${id}`);
      return data;
    }

    async function fetchPosts() {
      try {
        const res = await api.get(`/posts?_limit=${limit}&_page=${page}`);
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
  }, [page]);

  useEffect(() => {
    if (page > Math.max(...arrPages)) {
      setArrPages(arrPages.map((num, index) => index + page));
    }

    if (page < Math.min(...arrPages) && page > 1) {
      setArrPages(arrPages.map((num, index) => num - page));
    }
  }, [page, arrPages]);

  return (
    <Box py="10">
      <Grid templateColumns="repeat(4,1fr)" gap="6">
        {posts.map((post, index) => (
          <BlogItem key={index} post={post} />
        ))}
      </Grid>
      <Flex justify="center" mt="5" gap="3">
        <Avatar
          bg="gray.300"
          cursor="pointer"
          _hover={{
            bg: "green.300",
          }}
          icon={<ArrowLeftIcon p="1" color="gray.600" />}
          onClick={() => {
            if (page > 1) setParams({ page: String(page - 1) });
          }}
        />
        {arrPages.map((num) =>
          num === page ? (
            <Avatar
              key={num}
              bg="green.300"
              cursor="pointer"
              icon={<Box color="gray.600">{num}</Box>}
            />
          ) : (
            <Avatar
              key={num}
              bg="gray.300"
              cursor="pointer"
              _hover={{
                bg: "green.300",
              }}
              icon={<Box color="gray.600">{num}</Box>}
              onClick={() => setParams({ page: String(num) })}
            />
          )
        )}
        <Avatar
          bg="gray.300"
          cursor="pointer"
          _hover={{
            bg: "green.300",
          }}
          icon={<ArrowRightIcon p="1" color="gray.600" />}
          onClick={() => setParams({ page: String(page + 1) })}
        />
      </Flex>
    </Box>
  );
}

export default Home;
