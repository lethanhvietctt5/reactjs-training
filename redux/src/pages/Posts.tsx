import { Box, Grid } from "@chakra-ui/react";
import BlogItem from "components/BlogItem";
import Loading from "components/Loading";
import Pagination from "components/Pagination";
import SomethingWrong from "components/SomethingWrong";
import { usePagination, usePosts } from "hooks";

function Posts() {
  const { currentPage, arrPages, changePage, nextPage, prevPage } = usePagination();
  const { posts, fetching, failed, totalRecord, limit } = usePosts(currentPage);

  if (fetching) return <Loading />;
  if (failed) return <SomethingWrong message="Some errors occured when fetching posts" />;

  function checkLastPage(pageNumber: number) {
    return pageNumber * limit >= totalRecord;
  }

  return (
    <Box py="10">
      <Grid templateColumns="repeat(4,1fr)" gap="6">
        {posts.map((post, index) => (
          <BlogItem key={index} post={post} />
        ))}
      </Grid>
      <Pagination
        currentPage={currentPage}
        arrPages={arrPages}
        changePage={changePage}
        nextPage={nextPage}
        prevPage={prevPage}
        checkLastPage={checkLastPage}
      />
    </Box>
  );
}

export default Posts;
