import postApi from "api/postApi";
import { useAppSelector } from "hooks";
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Post from "types/post";
import useCustomToast from "./useCustomToast";

type PostProps = {
  post_id?: string;
};

function usePost({ post_id }: PostProps) {
  const [post, setPost] = useState<Post | undefined>(undefined);
  const auth = useAppSelector((state) => state.auth);
  const { toastSuccess, toastError } = useCustomToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (post_id) {
      postApi.getPostById(post_id).then((post: Post) => {
        setPost(post);
      });
    }
  }, [post_id]);

  async function createNewPost(title: string, content: string, tags: string[]) {
    const newPost: Post = {
      id: nanoid(),
      author_id: auth.currentUser.id,
      title: title,
      body: content,
      tags: tags,
      author_name: auth.currentUser.name,
      created_at: new Date().getTime(),
      updated_at: new Date().getTime(),
    };

    try {
      await postApi.createPost(newPost);
      toastSuccess("Created new post successful.");
      navigate("/posts");
    } catch (err) {
      toastError("Failed to create new post.");
    }
  }

  return [post, createNewPost];
}

export default usePost;
