import { TimeIcon } from "@chakra-ui/icons";
import { Badge, Box, Flex, Heading, Text, Tooltip } from "@chakra-ui/react";
import { TAG_COLORS } from "constant";
import { AiOutlineUser } from "react-icons/ai";
import { BsBookmark, BsFillBookmarkFill } from "react-icons/bs";
import { FiEdit2 } from "react-icons/fi";
import { Link, useParams } from "react-router-dom";
import { RiDeleteBin6Line } from "react-icons/ri";
import ConfirmModal from "components/ConfirmModal";
import { useAuthentication, useBookmark, useDeletePost, usePost } from "hooks";

function PostDetail() {
  const { post_id } = useParams();
  const { post } = usePost(post_id);
  const { currentUser } = useAuthentication();
  const { bookmarks, handleBookmark } = useBookmark();
  const { deletePost, isConfirming, setIsConfirming } = useDeletePost();

  return (
    <>
      <Box
        w="80%"
        mx="auto"
        py="10"
        px="20"
        my="10"
        minH="80vh"
        backgroundColor="white"
        rounded="md"
      >
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
              <Flex gap="4">
                <Tooltip shouldWrapChildren hasArrow label="Edit this post">
                  <Link to={`/edit/${post.id}`}>
                    <FiEdit2 color="gray" cursor="pointer" size="25" />
                  </Link>
                </Tooltip>
                <Tooltip shouldWrapChildren hasArrow label="Delete this post">
                  <RiDeleteBin6Line
                    color="red"
                    cursor="pointer"
                    size="25"
                    onClick={() => setIsConfirming(!isConfirming)}
                  />
                </Tooltip>
              </Flex>
            )}
          </Flex>
        </Flex>
        <Text mt="4" fontWeight="bold">
          {post?.tags.map((tag, index) => (
            <Badge
              key={index}
              my="1"
              mr="1"
              backgroundColor={TAG_COLORS[index % TAG_COLORS.length]}
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
      <ConfirmModal
        isOpen={isConfirming}
        title={"Confirm to delete this post?"}
        onConfirm={() => deletePost(post_id as string)}
        onCancel={() => setIsConfirming(!isConfirming)}
      />
    </>
  );
}

export default PostDetail;
