import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";

const PostRQ = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  //   const [posts, setPosts] = useState([]);

  const queryClient = useQueryClient();

  const fetchPosts = async () => {
    const response = await axios.get("api/getposts");
    return response.data;
  };

  const {
    data: posts,
    isLoading: postsLoading,
    isError: postsError,
    error: postsErrorMsg,
  } = useQuery({
    queryKey: ["fetchPosts"],
    queryFn: fetchPosts,
  });

  const addPost = async (post) => {
    const response = await axios.post("/api/posts", post);
    console.log("this is in add post", response.data.body);
    return response.data.body;
  };

  const { mutate, isLoading, isError, error } = useMutation({
    mutationFn: addPost,
    onSuccess: (newPost) => {
      // Update the cache for the query with key "fetchPosts"
      queryClient.setQueriesData(["fetchPosts"], (oldPosts) => {
        return oldPosts ? [...oldPosts, newPost] : [newPost];
      });
    },
  });
  //   console.log("value of posts is: ", posts);
  const handleSubmit = (e) => {
    e.preventDefault();

    const post = { title, content, imageUrl };
    mutate(post);
    setTitle("");
    setContent("");
    setImageUrl("");
  };

  if (isLoading || postsLoading) {
    return <div>Page is loading</div>;
  }

  if (isError) {
    return <div>{error.message}</div>;
  }
  console.log();
  return (
    <div className="post-list">
      <form onSubmit={handleSubmit}>
        <input
          placeholder="enter the title"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <input
          placeholder="enter the body"
          onChange={(e) => setContent(e.target.value)}
          value={content}
        />
        <input
          placeholder="enter your image url"
          onChange={(e) => setImageUrl(e.target.value)}
          value={imageUrl}
        />
        <button type="submit">Post</button>
      </form>
      <div className="post-list">
        <h2>Posted Data</h2>
        {posts.length > 0 ? (
          posts.map((post, index) => (
            <div className="post-item" key={index}>
              <h3 className="post-title">{post.title}</h3>
              <p>{post.content}</p>
              {post.image && <img src={post.image} alt="Post" width="300" />}
            </div>
          ))
        ) : (
          <p>No posts yet</p>
        )}
      </div>
    </div>
  );
};

export default PostRQ;
