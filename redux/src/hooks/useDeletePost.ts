import postApi from "api/postApi";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import useCustomToast from "./useCustomToast";

function useDeletePost() {
  const [params, setParams] = useSearchParams();
  const [isConfirming, setIsConfirming] = useState<boolean>(Boolean(params.get("confirming")));
  const { toastError, toastSuccess } = useCustomToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (isConfirming) {
      setParams({ confirming: "true" });
    } else {
      params.delete("confirming");
      setParams(params);
    }
  }, [isConfirming, params, setParams]);

  function deletePost(postId: string) {
    try {
      postApi.deletePost(postId);
      toastSuccess("Post has deleted successfull!");
      navigate("/");
    } catch (e) {
      toastError("Some errors occurred when deleting post.");
    }
    setIsConfirming(!isConfirming);
  }

  return { isConfirming, setIsConfirming, deletePost };
}

export default useDeletePost;
