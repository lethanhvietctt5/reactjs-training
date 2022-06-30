import { useRef, useState } from "react";

export function useTags() {
  const [tags, setTags] = useState<string[]>([]);
  const tagRef = useRef<HTMLInputElement>(null);

  function addTag() {
    if (tagRef.current && tagRef.current?.value.length > 0) {
      setTags([...tags, tagRef.current.value]);
      tagRef.current.value = "";
    }
  }
  return { tags, tagRef, setTags, addTag };
}
