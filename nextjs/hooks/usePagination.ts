import { useRouter } from "next/router";
import { useState } from "react";

function usePagination(initPage: number) {
  const [pageNumber, setPageNumber] = useState(initPage);
  const router = useRouter();

  function next() {
    router.push({
      pathname: router.pathname,
      query: {
        page: pageNumber + 1,
      },
    });

    setPageNumber(pageNumber + 1);
  }

  function prev() {
    router.push({
      pathname: router.pathname,
      query: {
        page: pageNumber - 1,
      },
    });
    setPageNumber(pageNumber - 1);
  }

  return { pageNumber, next, prev };
}

export default usePagination;
