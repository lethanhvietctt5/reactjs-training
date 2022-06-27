import { Avatar, Box, Flex, Grid } from "@chakra-ui/react";
import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";
import BlogItem from "components/BlogItem";
import usePosts from "hooks/usePosts";
import usePagination from "hooks/usePagination";
import Loading from "components/Loading";
import SomethingWrong from "components/SomethingWrong";

function Posts() {
  const { currentPage, arrPages, changePage, nextPage, prevPage } = usePagination();
  const { posts, fetching, failed, totalRecord, limit } = usePosts(currentPage);

  if (fetching) return <Loading />;
  if (failed) return <SomethingWrong message="Some errors occured when fetching posts" />;

  function checkLastPage(page: number) {
    return page * limit >= totalRecord;
  }

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
                bg: checkLastPage(num > 0 ? num - 1 : num) ? "gray.300" : "green.300",
              }}
              icon={<Box color="gray.600">{num}</Box>}
              onClick={() => {
                if (checkLastPage(num > 0 ? num - 1 : num)) return;
                changePage(num);
              }}
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
          onClick={(e) => {
            if (checkLastPage(currentPage)) return;
            nextPage();
          }}
        />
      </Flex>
    </Box>
  );
}

export default Posts;
