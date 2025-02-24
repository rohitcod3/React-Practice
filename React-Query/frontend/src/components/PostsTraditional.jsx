import { useEffect, useState } from "react";
import axios from "axios";

const PostsTraditional = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const fetchPosts = async () => {
    try {
      const response = await axios("/api/products");
      setProducts(response.data);
      console.log(response);
    } catch (error) {
      setIsError(true);
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchPosts();
  }, []);

  if (isLoading) {
    return <div>Page is Loading</div>;
  }
  if (isError) {
    return <div>Error has occurred</div>;
  }

  return (
    <div className="post-list">
      {products.map((product) => (
        <div className="post-item" key={product.id}>
          <h1 className="post-title">{product.name}</h1>
          <p className="post-body">{product.price}</p>
          <img src={product.image} height={200} />
        </div>
      ))}
    </div>
  );
};

export default PostsTraditional;
