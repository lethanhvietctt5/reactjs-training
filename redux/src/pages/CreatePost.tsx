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
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import usePost from "hooks/usePost";

type InputType = {
  title: string;
  content: string;
};

const schema = yup
  .object({
    title: yup.string().required("Post's title is required"),
    content: yup.string().required("Post's content is required"),
  })
  .required();

function CreatePost() {
  const [tags, setTags] = useState<string[]>([]);
  const tagRef = useRef<HTMLInputElement>(null);
  const { createNewPost } = usePost({});

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputType>({
    resolver: yupResolver(schema),
  });

  function addTag(e: React.KeyboardEvent<HTMLInputElement>) {
    // e.preventDefault();
    if (e.key === "Enter") {
      if (tagRef.current && tagRef.current?.value.length > 0) {
        setTags([...tags, tagRef.current.value]);
        tagRef.current.value = "";
      }
    }
  }

  function checkKey(e: React.KeyboardEvent<HTMLFormElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  }

  async function create(data: InputType) {
    createNewPost(data.title, data.content, tags);
  }

  const arr_color = ["orange", "blue", "green", "yellow", "red", "purple", "teal"];

  return (
    <form
      onSubmit={handleSubmit(create)}
      onKeyDown={(e) => {
        checkKey(e);
      }}
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
          <Input {...register("title")} placeholder="Title of post" focusBorderColor="green.200" />
          <Text fontSize="sm" color="red" ml="2">
            {errors.title?.message}
          </Text>
        </Box>
        <Box>
          <Text fontWeight={800}>Content : </Text>
          <Textarea
            {...register("content")}
            placeholder="Content for your post"
            focusBorderColor="green.200"
            h="40"
          />
          <Text fontSize="sm" color="red" ml="2">
            {errors.content?.message}
          </Text>
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
          <Input
            ref={tagRef}
            placeholder="ex. javascript, react, nodejs"
            focusBorderColor="green.200"
            onKeyDown={addTag}
          />
        </Box>

        <Button colorScheme="green" type="submit">
          Create post
        </Button>
      </Flex>
    </form>
  );
}

export default CreatePost;
