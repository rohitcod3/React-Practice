import { keepPreviousData, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
const PaginatedQueries = () => {
  const fetchFruits = async (pageId) => {
    return axios.get(`/api/fruits?_limit=4&_page=${pageId}`);
  };
  const [page, setPage] = useState(1);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["fruits", page],
    queryFn: () => fetchFruits(page),
    placeholderData: keepPreviousData,
  });

  if (isLoading) {
    return <h2>Page is Loading...</h2>;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  return (
    <div className="container flex justify-center items-center">
      {data?.data?.map((res) => (
        <div className="flex flex-col justify-center " key={res.id}>
          <h2>{res.name}</h2>
        </div>
      ))}
      <button
        onClick={() => setPage((prev) => prev - 1)}
        disabled={page == 1 ? true : false}
      >
        Prev Page
      </button>
      <button
        onClick={() => setPage((prev) => prev + 1)}
        disabled={page == 5 ? true : false}
      >
        Next Page
      </button>
    </div>
  );
};

export default PaginatedQueries;
