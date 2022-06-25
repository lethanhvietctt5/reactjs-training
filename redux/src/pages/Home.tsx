import { Avatar, Box, Flex, Grid } from "@chakra-ui/react";
import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";
import BlogItem from "components/BlogItem";
import usePosts from "hooks/usePosts";
import usePagination from "hooks/usePagination";

function Home() {
  const { currentPage, arrPages, changePage, nextPage, prevPage } = usePagination();
  const posts = usePosts(currentPage);

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
          onClick={prevPage}
        />
        {arrPages.map((num) =>
          num === currentPage ? (
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
              onClick={() => changePage(num)}
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
          onClick={nextPage}
        />
      </Flex>
    </Box>
  );
}

export default Home;
