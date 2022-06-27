import { TimeIcon } from "@chakra-ui/icons";
import { Badge, Box, Flex, Heading, Text } from "@chakra-ui/react";
import { TAG_COLORS } from "constants/colors";
import { Link } from "react-router-dom";
import Post from "types/post";

type Props = {
  post: Post;
};

function BlogItem({ post }: Props) {
  return (
    <Link to={`/posts/${post.id}`}>
      <Box backgroundColor="white" borderRadius="lg" p="5" cursor="pointer" h="full">
        <Heading noOfLines={2} size="lg" fontWeight="900">
          {post.title}
        </Heading>
        <Text fontWeight="bold">
          {post.tags.map((tag, index) => (
            <Badge
              key={index}
              my="1"
              mr="1"
              bgColor={TAG_COLORS[index % TAG_COLORS.length]}
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
          {post.content}
        </Text>
      </Box>
    </Link>
  );
}

export default BlogItem;
