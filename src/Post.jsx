import React, { useEffect, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import { db } from "./firebase";
import useFormState from "./hooks/useFormState";
import firebase from "firebase";

// STATICS
import "./Post.css";

const Post = ({ username, imageUrl, caption, postId, user }) => {
  // STATES
  const [comments, setComments] = useState([]);
  const [comment, handleComment, resetComment] = useFormState("");

  // HOOKS
  useEffect(() => {
    let unsubscribe;
    if (postId) {
      unsubscribe = db
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          setComments(
            snapshot.docs.map((doc) => ({ id: doc.id, c: doc.data() }))
          );
        });
    }

    return () => unsubscribe();
  }, [postId]);

  // FUNCTIONS
  const handleCommentPost = (e) => {
    e.preventDefault();

    db.collection("posts").doc(postId).collection("comments").add({
      comment,
      username: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    resetComment();
  };

  return (
    <div className="post">
      {/* header -> avatar + username */}
      <div className="post__header">
        <Avatar
          className="post__avatar"
          alt={username}
          src={`${"/static/images/avatar/1.jpg"}`}
        />
        <h3>{username}</h3>
      </div>
      {/* image || post */}
      <img className="post__image" src={imageUrl} />
      {/* username + caption */}
      <h4 className="post__text">
        <strong>{username}: </strong> {caption}
      </h4>
      {/* Comments */}
      <div className="post__comments">
        {comments.map(({ id, c }) => (
          <p key={id}>
            <strong>{c.username}</strong>&nbsp;
            {c.comment}
          </p>
        ))}
      </div>

      {/* Comments inputs */}
      {user && (
        <form className="post__commentBox">
          <input
            type="text"
            className="post__input"
            value={comment}
            onChange={handleComment}
            placeholder="Add Comment"
          />
          <button
            type="submit"
            className="post__button"
            disabled={!comment}
            onClick={handleCommentPost}
          >
            Post
          </button>
        </form>
      )}
    </div>
  );
};

export default Post;
