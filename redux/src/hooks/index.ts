import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export * from "./useAuthentication";
export * from "./useBookmark";
export * from "./useBookmarkPosts";
export * from "./useCreatePost";
export * from "./useCustomToast";
export * from "./useDebounce";
export * from "./useDeletePost";
export * from "./usePagination";
export * from "./usePost";
export * from "./usePosts";
export * from "./useSearchPosts";
export * from "./useTags";
