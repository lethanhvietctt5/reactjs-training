import postApi from "api/postApi";
import { useNavigate } from "react-router-dom";
import useAuthentication from "./useAuthentication";
import useCustomToast from "./useCustomToast";

function useCreatePost() {
  const { currentUser } = useAuthentication();
  const { toastSuccess, toastError } = useCustomToast();
  const navigate = useNavigate();

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

  return createNewPost;
}

export default useCreatePost;
