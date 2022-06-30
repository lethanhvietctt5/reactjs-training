import { useAppDispatch, useAppSelector } from "hooks";
import { addBookmark, removeBookmark } from "redux/slices/bookmark";
import { useCustomToast, useAuthentication } from ".";

export function useBookmark() {
  const dispatch = useAppDispatch();
  const bookmarks = useAppSelector((state) => state.bookmark.collections);
  const { toastSuccess } = useCustomToast();
  const { currentUser } = useAuthentication();

  function handleBookmark(post_id: string) {
    if (bookmarks.includes(post_id)) {
      dispatch(removeBookmark(post_id));
      toastSuccess("Post has removed from bookmark.");
    } else {
      if (currentUser) {
        dispatch(addBookmark(post_id));
        toastSuccess("Post has added to bookmark.");
      }
    }
  }
  return { bookmarks, handleBookmark };
}
