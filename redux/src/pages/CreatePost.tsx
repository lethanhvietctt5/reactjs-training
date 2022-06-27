import { Box, Button, Flex, Input, Tag, TagCloseButton, TagLabel, Text } from "@chakra-ui/react";

import Form from "components/Form";
import FormInput from "components/FormInput";
import { TAG_COLORS } from "constants/colors";
import { POST_SCHEMA } from "constants/schemas";
import usePost from "hooks/usePost";
import useTags from "hooks/useTags";
import FormInputValues from "types/formInput";

function CreatePost() {
  const { tags, tagRef, addTag, setTags } = useTags();
  const { createNewPost } = usePost();

  function onSubmit(data: FormInputValues) {
    const { title, content } = data;
    if (title && content) createNewPost(title, content, tags);
  }

  return (
    <Form onSubmit={onSubmit} schema={POST_SCHEMA}>
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
          <FormInput name="title" type="text" placeHolder="Title of post" />
        </Box>
        <Box>
          <Text fontWeight={800}>Content : </Text>
          <FormInput name="content" type="textarea" placeHolder="Title of post" />
        </Box>
        <Box>
          <Text fontWeight={800}>Tags : </Text>
          <Text fontWeight="bold" my="2">
            {tags.map((tag, index) => (
              <Tag
                key={index}
                borderRadius="md"
                variant="solid"
                bgColor={TAG_COLORS[index % TAG_COLORS.length]}
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
          Create post
        </Button>
      </Flex>
    </Form>
  );
}

export default CreatePost;
