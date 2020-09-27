import React, { useState, useEffect } from "react";
import Post from "./Post";
import { db } from "./firebase";

// STATICS
import "./App.css";

function App() {
  // STATES
  const [posts, setPosts] = useState([]);

  // HOOKS && CONTEXT
  useEffect(() => {
    db.collection("posts").onSnapshot((snapshot) => {
      // retrieving datas from DB
      setPosts(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          post: doc.data(),
        }))
      );
    });
    // eslint-disable-next-line
  }, []);
  // FUNCTIONS
  return (
    <div className="app">
      {/* Header */}
      <div className="app__header">
        <img
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          alt="Instagram Logo"
          className="app__headerImage"
        />
      </div>

      {/* Posts */}
      {posts.map(({ id, post }) => (
        <Post key={id} {...post} />
      ))}
    </div>
  );
}

export default App;
