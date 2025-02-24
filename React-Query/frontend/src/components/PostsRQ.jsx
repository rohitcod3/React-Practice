import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";
const PostsRQ = () => {
  const fetchProducts = async () => {
    const response = await axios.get("/api/products");
    return response.data;
  };

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchProducts,
  });
  if (isLoading) {
    return <div>Page is Loading</div>;
  }
  if (isError) {
    return <div>{error.message}</div>;
  }
  return (
    <div className="post-list">
      <button onClick={refetch}>Fetch Posts</button>
      {data?.map((product) => (
        <Link to={`/rq-posts/${product.id}`} key={product.id}>
          <div className="post-item">
            <h1 className="post-title">{product.name}</h1>
            <p className="post-body">{product.price}</p>
            <img src={product.image} height={200} />
          </div>
        </Link>
      ))}
    </div>
  );
};

export default PostsRQ;
