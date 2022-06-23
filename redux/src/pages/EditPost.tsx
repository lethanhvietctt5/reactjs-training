import {
  Box,
  Button,
  Flex,
  Input,
  Tag,
  TagCloseButton,
  TagLabel,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "../hooks";
import api from "../api";

function EditPost() {
  const [tags, setTags] = useState<string[]>([]);
  const tagRef = useRef<HTMLInputElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLTextAreaElement>(null);
  const auth = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const { post_id } = useParams();
  const toast = useToast();
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    async function fetchPost() {
      const res = await api.get(`/posts/${post_id}`);
      const post = res.data;
      setTags(post.tags);
      if (titleRef.current) {
        titleRef.current.value = post.title;
      }

      if (bodyRef.current) {
        bodyRef.current.value = post.body;
      }

      setPost(post);
    }

    fetchPost();
  }, [post_id]);

  function addTag(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (tagRef.current && tagRef.current?.value.length > 0) {
      setTags([...tags, tagRef.current.value]);
      tagRef.current.value = "";
    }
  }

  async function handeEdit() {
    await api.put("posts/" + post_id, {
      id: post?.id,
      author_id: auth.currentUser.id,
      title: titleRef.current?.value,
      body: bodyRef.current?.value,
      tags: tags,
      author_name: auth.currentUser.name,
      created_at: post?.created_at,
      updated_at: new Date().getTime(),
    });

    toast({
      title: "Edit have saved successful.",
      description: "Let check again.",
      status: "success",
      duration: 2000,
      isClosable: true,
      position: "top",
    });

    navigate("/");
  }

  const arr_color = [
    "orange",
    "blue",
    "green",
    "yellow",
    "red",
    "purple",
    "teal",
  ];

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
        <Input
          ref={titleRef}
          placeholder="Title of post"
          focusBorderColor="green.200"
        />
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
                  let newTags = [...tags];
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
