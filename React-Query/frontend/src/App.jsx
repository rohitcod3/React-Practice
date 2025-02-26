import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import Home from "./components/Home";
import PostsTraditional from "./components/PostsTraditional";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import PostsRQ from "./components/PostsRQ";
import PostDetailsRQ from "./components/PostDetailsRQ";
import PaginatedQueries from "./components/PagincatedQuries";
import PostRQ from "./components/PostRQ";

function App() {
  return (
    <BrowserRouter>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/posts">Traditional Posts</Link>
          </li>
          <li>
            <Link to="/rq-posts">RQ Posts</Link>
          </li>
          <li>
            <Link to="/pg-query">Paginated query</Link>
          </li>
          <li>
            <Link to="/rq-post">Submit Post</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/posts" element={<PostsTraditional />} />
        <Route exact path="/rq-posts" element={<PostsRQ />} />
        <Route exact path="/rq-posts/:postId" element={<PostDetailsRQ />} />
        <Route exact path="/pg-query" element={<PaginatedQueries />} />
        <Route exact path="/rq-post" element={<PostRQ />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
