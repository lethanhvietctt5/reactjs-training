import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

function usePagination() {
  const [params, setParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(parseInt(params.get("page") as string) ?? 1);
  const [arrPages, setArrPages] = useState([1, 2, 3, 4, 5]);

  useEffect(() => {
    if (params.has("page")) {
      setCurrentPage(parseInt(params.get("page") as string));
    }
  }, [params, currentPage]);

  useEffect(() => {
    if (currentPage > Math.max(...arrPages)) {
      setArrPages(arrPages.map((num, index) => index + currentPage));
    }

    if (currentPage < Math.min(...arrPages) && currentPage > 1) {
      setArrPages(arrPages.map((num, index) => num - currentPage));
    }
  }, [currentPage, arrPages]);

  function prevPage() {
    if (currentPage > 1) setParams({ page: String(currentPage - 1) });
  }

  function changePage(page_number: number) {
    setParams({ page: String(page_number) });
  }

  function nextPage() {
    setParams({ page: String(currentPage + 1) });
  }

  return { currentPage, arrPages, changePage, prevPage, nextPage };
}

export default usePagination;
