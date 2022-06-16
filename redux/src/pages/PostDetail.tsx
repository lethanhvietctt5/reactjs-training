import { TimeIcon } from "@chakra-ui/icons";
import { Badge, Box, Flex, Heading, Text, Tooltip } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { FiEdit2 } from "react-icons/fi";
import { useParams } from "react-router-dom";
import { BsBookmark } from "react-icons/bs";
import api from "../service";
import { useAppSelector } from "../hooks";
import { Link } from "react-router-dom";

function PostDetail() {
  const { post_id } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const auth = useAppSelector((state) => state.auth);

  useEffect(() => {
    async function fetchPost() {
      const res = await api.get("/posts/" + post_id);
      setPost(res.data);
    }

    fetchPost();
  }, [post_id]);

  const arr_color = ["orange.400", "blue.400", "green.400", "yellow.400"];

  return (
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
          <Tooltip shouldWrapChildren hasArrow label="Add to bookmark">
            <BsBookmark color="gray" cursor="pointer" size="25" />
          </Tooltip>
          {auth.id === post?.author_id && (
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

      <Text>{post?.body}</Text>
    </Box>
  );
}

export default PostDetail;
