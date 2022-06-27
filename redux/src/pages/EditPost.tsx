import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Button, Flex, Input, Tag, TagCloseButton, TagLabel, Text } from "@chakra-ui/react";
import Form from "components/Form";
import FormInput from "components/FormInput";
import Loading from "components/Loading";
import { TAG_COLORS } from "constants/colors";
import { POST_SCHEMA } from "constants/schemas";
import usePost from "hooks/usePost";
import useTags from "hooks/useTags";
import FormInputValues from "types/formInput";

function EditPost() {
  const { post_id } = useParams();
  const { post, editPost } = usePost({ post_id: post_id });
  const { tags, tagRef, addTag, setTags } = useTags();

  useEffect(() => {
    if (post) {
      setTags(post.tags);
    }
  }, [post, setTags]);

  function onSubmit(data: FormInputValues) {
    const { title, content } = data;
    if (title && content) {
      editPost(title, content, tags);
    }
  }

  if (typeof post === "undefined") {
    return <Loading />;
  }

  return (
    <Form
      onSubmit={onSubmit}
      schema={POST_SCHEMA}
      defaultValues={{ title: post.title, content: post.content }}
    >
      <Flex
        direction="column"
        backgroundColor="white"
        w="80%"
        mx="auto"
        mt="10"
        p="5"
        rounded="20"
        gap="4"
      >
        <Box>
          <Text fontWeight={800}>Title : </Text>
          <FormInput
            name="title"
            type="text"
            defaultValue={post?.title}
            placeHolder="Title of post"
          />
        </Box>
        <Box>
          <Text fontWeight={800}>Content : </Text>
          <FormInput
            name="content"
            type="textarea"
            defaultValue={post?.content}
            placeHolder="Content of post"
          />
        </Box>
        <Box>
          <Text fontWeight={800}>Tags : </Text>
          <Text fontWeight="bold" my="2">
            {tags.map((tag, index) => (
              <Tag
                key={index}
                borderRadius="md"
                variant="solid"
                colorScheme={TAG_COLORS[index % TAG_COLORS.length]}
                mr="3"
                mb="2"
              >
                <TagLabel>{tag}</TagLabel>
                <TagCloseButton
                  onClick={() => {
                    const newTags = [...tags];
                    newTags.splice(index, 1);
                    setTags(newTags);
                  }}
                />
              </Tag>
            ))}
          </Text>
          <Flex>
            <Input
              ref={tagRef}
              placeholder="ex. javascript, react, nodejs"
              focusBorderColor="green.200"
            />
            <Button colorScheme="green" variant="outline" ml="2" onClick={addTag}>
              Add
            </Button>
          </Flex>
        </Box>

        <Button colorScheme="green" type="submit">
          Edit post
        </Button>
      </Flex>
    </Form>
  );
}

export default EditPost;
