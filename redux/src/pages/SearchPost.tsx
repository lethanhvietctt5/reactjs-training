import { Box, Flex, Input } from "@chakra-ui/react";
import ListPosts from "components/ListPosts";
import SomethingWrong from "components/SomethingWrong";
import { useSearchPosts } from "hooks";

function SearchPost() {
  const { keyword, setKeyword, posts, failed } = useSearchPosts();

  return (
    <Box py="10">
      <Box w="50%" bg="white" mx="auto" rounded="md">
        <Input
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          type="text"
          placeholder="Enter keyword"
          focusBorderColor="green.200"
        />
      </Box>

      {failed ? (
        <SomethingWrong message="Some error occurred when searching post" />
      ) : (
        <Box mt="5">
          <ListPosts posts={posts} />
        </Box>
      )}

      {posts.length === 0 ? (
        <Flex direction="column" h="70vh" w="full" justify="center" align="center">
          No match result
        </Flex>
      ) : null}
    </Box>
  );
}

export default SearchPost;
