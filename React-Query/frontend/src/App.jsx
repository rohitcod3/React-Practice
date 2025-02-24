import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import Home from "./components/Home";
import PostsTraditional from "./components/PostsTraditional";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import PostsRQ from "./components/PostsRQ";
import PostDetailsRQ from "./components/PostDetailsRQ";

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
        </ul>
      </nav>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/posts" element={<PostsTraditional />} />
        <Route exact path="/rq-posts" element={<PostsRQ />} />
        <Route exact path="/rq-posts/:postId" element={<PostDetailsRQ />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
