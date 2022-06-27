import { Box, Button, Flex, Input, Tag, TagCloseButton, TagLabel, Text } from "@chakra-ui/react";
import Form from "components/Form";
import FormInput from "components/FormInput";
import Loading from "components/Loading";
import { TAG_COLORS } from "constants/colors";
import { POST_SCHEMA } from "constants/schemas";
import useCustomToast from "hooks/useCustomToast";
import usePost from "hooks/usePost";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FormInputValues from "types/formInput";

function EditPost() {
  const [tags, setTags] = useState<string[]>([]);
  const tagRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { post_id } = useParams();
  const { toastSuccess } = useCustomToast();
  const { post, editPost } = usePost({ post_id: post_id });

  useEffect(() => {
    if (post) {
      setTags(post.tags);
    }
  }, [post]);

  function addTag(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (tagRef.current && tagRef.current?.value.length > 0) {
      setTags([...tags, tagRef.current.value]);
      tagRef.current.value = "";
    }
  }

  function onSubmit(data: FormInputValues) {
    const { title, content } = data;
    if (title && content) {
      editPost(title, content, tags);
    }
    toastSuccess("Edit have saved successful.");
    navigate("/posts");
  }

  if (typeof post === "undefined") {
    return <Loading />;
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
          <FormInput
            name="title"
            type="text"
            defaultValue={post?.title}
            // placeHolder="Title of post"
          />
        </Box>
        <Box>
          <Text fontWeight={800}>Content : </Text>
          <FormInput
            name="content"
            type="textarea"
            defaultValue={post?.content}
            placeHolder="Title of post"
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
          <form onSubmit={addTag}>
            <Input
              ref={tagRef}
              placeholder="ex. javascript, react, nodejs"
              focusBorderColor="green.200"
            />
          </form>
        </Box>

        <Button colorScheme="green" type="submit">
          Edit post
        </Button>
      </Flex>
    </Form>
  );
}

export default EditPost;
