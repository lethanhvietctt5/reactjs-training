import { TimeIcon } from "@chakra-ui/icons";
import { Badge, Box, Flex, Heading, Text, Tooltip } from "@chakra-ui/react";
import { AiOutlineUser } from "react-icons/ai";
import { FiEdit2 } from "react-icons/fi";
import { useParams, Link } from "react-router-dom";
import { BsBookmark, BsFillBookmarkFill } from "react-icons/bs";
import { addBookmark, removeBookmark } from "redux/slices/bookmark";
import { useAppDispatch, useAppSelector } from "hooks";
import useCustomToast from "hooks/useCustomToast";
import useAuthentication from "hooks/useAuthentication";
import usePost from "hooks/usePost";

function PostDetail() {
  const { post_id } = useParams();
  const { post } = usePost({ post_id: post_id });
  const { toastSuccess } = useCustomToast();

  const { currentUser } = useAuthentication();
  const dispatch = useAppDispatch();
  const bookmarks = useAppSelector((state) => state.bookmark.bookmarks);

  function handleBookmark(post_id: string) {
    if (bookmarks.includes(post_id)) {
      dispatch(removeBookmark(post_id));
      toastSuccess("Post has removed from bookmark.");
    } else {
      if (currentUser) {
        dispatch(addBookmark(post_id));
        toastSuccess("Post has added to bookmark.");
      }
    }
  }

  const arr_color = ["orange.400", "blue.400", "green.400", "yellow.400"];

  return (
    <Box w="80%" mx="auto" py="10" px="20" my="10" minH="80vh" backgroundColor="white" rounded="md">
      <Flex justify="space-between" align="center">
        <Heading size="lg" fontWeight="900">
          {post?.title}
        </Heading>
        <Flex gap="4">
          {post && bookmarks.includes(post.id) ? (
            <Tooltip shouldWrapChildren hasArrow label="Remove from bookmark">
              <BsFillBookmarkFill
                color="yellow"
                fill="orange"
                cursor="pointer"
                size="25"
                onClick={() => post && handleBookmark(post?.id)}
              />
            </Tooltip>
          ) : (
            <Tooltip shouldWrapChildren hasArrow label="Add to bookmark">
              <BsBookmark
                color="gray"
                cursor="pointer"
                size="25"
                onClick={() => post && handleBookmark(post?.id)}
              />
            </Tooltip>
          )}

          {post && currentUser?.id === post?.author_id && (
            <Tooltip shouldWrapChildren hasArrow label="Edit this post">
              <Link to={`/edit/${post.id}`}>
                <FiEdit2 color="gray" cursor="pointer" size="25" />
              </Link>
            </Tooltip>
          )}
        </Flex>
      </Flex>
      <Text mt="4" fontWeight="bold">
        {post?.tags.map((tag, index) => (
          <Badge
            key={index}
            my="1"
            mr="1"
            backgroundColor={arr_color[index % arr_color.length]}
            color="white"
          >
            {tag}
          </Badge>
        ))}
      </Text>
      <Flex mt="4" align="center" gap="1">
        <TimeIcon color="gray" w="3" />
        <Text color="gray" fontSize="xs">
          Created at:{" "}
        </Text>
        <Text color="gray" fontSize="xs">
          {post ? new Date(post?.created_at).toLocaleDateString() : ""}
        </Text>
      </Flex>
      <Flex mb="4" py="2" fontSize="xs" gap="1" align="center">
        <AiOutlineUser />
        Author <Text color="green">{post?.author_name}</Text>
      </Flex>

      <Text>{post?.content}</Text>
    </Box>
  );
}

export default PostDetail;
