import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";

const fetchPostsDetails = async (postId) => {
  const response = await axios.get(`/api/products/${postId}`);
  return response.data;
};

const PostDetailsRQ = () => {
  const { postId } = useParams();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["posts", postId],
    queryFn: () => fetchPostsDetails(postId),
  });
  if (isLoading) {
    return <>Page is loading...</>;
  }

  if (isError) {
    return <div>{error.message}</div>;
  }

  //   const { name, price } = data?.data || {};
  console.log(data[0].name, "name is ");
  return (
    <div>
      {data.map((d) => (
        <div className="post-details-container" key={d.id}>
          <div className="post-details-container">
            {" "}
            <h1> {d?.name}</h1>
          </div>
          <div className="post-details-container">
            <img src={d?.image} height={200} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostDetailsRQ;
