import { ArrowRightIcon } from "@chakra-ui/icons";
import { Box, Flex } from "@chakra-ui/react";
import ListPosts from "components/ListPosts";
import Loading from "components/Loading";
import SomethingWrong from "components/SomethingWrong";
import usePosts from "hooks/usePosts";
import { Link } from "react-router-dom";

function Home() {
  const { posts, fetching, failed } = usePosts(1);

  if (fetching) return <Loading />;
  if (failed) return <SomethingWrong message="Some errors occured when fetching posts" />;

  return (
    <Box py="10">
      <ListPosts posts={posts} />
      <Link to="/posts">
        <Flex justify="center" align="center" gap="2" mt="5" color="green.500">
          See all
          <ArrowRightIcon />
        </Flex>
      </Link>
    </Box>
  );
}

export default Home;
