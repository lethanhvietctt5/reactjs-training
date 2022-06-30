import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { postApi } from "api";
import { Post } from "types";
import { useAuthentication, useCustomToast } from ".";

export function usePost(post_id?: string) {
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

  async function editPost(title: string, content: string, tags: string[]) {
    if (currentUser && post) {
      try {
        await postApi.editPost(post, title, content, tags);
        toastSuccess("Edited post successful.");
        navigate("/posts");
      } catch (err) {
        toastError("Failed to edit post.");
      }
    }
  }

  return { post, editPost };
}
