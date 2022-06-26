import postApi from "api/postApi";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Post from "types/post";
import useAuthentication from "./useAuthentication";
import useCustomToast from "./useCustomToast";

type PostProps = {
  post_id?: string;
};

function usePost({ post_id }: PostProps) {
  const [post, setPost] = useState<Post | undefined>(undefined);
  const { currentUser } = useAuthentication();
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
    if (currentUser) {
      try {
        await postApi.createPost(title, content, tags, currentUser);
        toastSuccess("Created new post successful.");
        navigate("/posts");
      } catch (err) {
        toastError("Failed to create new post.");
      }
    }
    return navigate("/login");
  }

  async function editPost(title: string, content: string, tags: string[]) {
    if (currentUser && post) {
      try {
        await postApi.editPost(post, title, content, tags);
        toastSuccess("Created new post successful.");
        navigate("/posts");
      } catch (err) {
        toastError("Failed to create new post.");
      }
    }
  }

  return { post, createNewPost, editPost };
}

export default usePost;
