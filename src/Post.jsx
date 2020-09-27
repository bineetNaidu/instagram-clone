import Avatar from "@material-ui/core/Avatar";
import React from "react";

// STATICS
import "./Post.css";

const Post = () => {
  return (
    <div className="post">
      {/* header -> avatar + username */}
      <div className="post__header">
        <Avatar
          className="post__avatar"
          alt="username"
          src="/static/images/avatar/1.jpg"
        />
        <h3>Username</h3>
      </div>
      {/* image || post */}
      <img
        className="post__image"
        src="https://www.andreasreiterer.at/wp-content/uploads/2017/11/react-logo-825x510.jpg"
      />
      {/* username + caption */}
      <h4 className="post__text">
        <strong>Username:</strong> Caption
      </h4>
    </div>
  );
};

export default Post;
