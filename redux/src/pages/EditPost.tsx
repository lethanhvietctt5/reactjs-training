import {
  Box,
  Button,
  Flex,
  Input,
  Tag,
  TagCloseButton,
  TagLabel,
  Text,
  Textarea
} from "@chakra-ui/react";
import useCustomToast from "hooks/useCustomToast";
import usePost from "hooks/usePost";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditPost() {
  const [tags, setTags] = useState<string[]>([]);
  const tagRef = useRef<HTMLInputElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLTextAreaElement>(null);
  const navigate = useNavigate();
  const { post_id } = useParams();
  const { toastSuccess } = useCustomToast();
  const { post, editPost } = usePost({ post_id: post_id });

  useEffect(() => {
    if (post) {
      setTags(post.tags);
      if (titleRef.current) {
        titleRef.current.value = post.title;
      }

      if (bodyRef.current) {
        bodyRef.current.value = post.body;
      }
    }
  }, [post]);

  function addTag(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (tagRef.current && tagRef.current?.value.length > 0) {
      setTags([...tags, tagRef.current.value]);
      tagRef.current.value = "";
    }
  }

  async function handeEdit() {
    if (titleRef.current && bodyRef.current) {
      editPost(titleRef.current.value, bodyRef.current.value, tags);
    }
    toastSuccess("Edit have saved successful.");
    navigate("/posts");
  }

  const arr_color = ["orange", "blue", "green", "yellow", "red", "purple", "teal"];

  return (
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
        <Input ref={titleRef} placeholder="Title of post" focusBorderColor="green.200" />
      </Box>
      <Box>
        <Text fontWeight={800}>Content : </Text>
        <Textarea
          ref={bodyRef}
          placeholder="Content for your post"
          focusBorderColor="green.200"
          h="40"
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
              colorScheme={arr_color[index % arr_color.length]}
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

      <Button colorScheme="green" onClick={handeEdit}>
        Edit post
      </Button>
    </Flex>
  );
}

export default EditPost;
