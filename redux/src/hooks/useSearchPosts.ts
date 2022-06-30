import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { postApi } from "api";
import { Post } from "types";
import { useDebounce } from ".";

export function useSearchPosts() {
  const [params, setParams] = useSearchParams();
  const [keyword, setKeyword] = useState<string>(
    typeof params.get("q") === "string" ? (params.get("q") as string) : ""
  );
  const debounceSearch = useDebounce(keyword, 500);
  const [posts, setPosts] = useState<Post[]>([]);
  const [failed, setFailed] = useState<boolean>(false);

  useEffect(() => {
    if (debounceSearch.length > 0) {
      setParams({ q: debounceSearch });
    } else {
      params.delete("q");
      setParams(params);
    }

    try {
      postApi.searchPosts(debounceSearch).then((posts) => {
        setPosts(posts);
        setFailed(false);
      });
    } catch (err) {
      setFailed(true);
    }
  }, [debounceSearch, setParams, params]);

  return { keyword, setKeyword, posts, failed };
}
