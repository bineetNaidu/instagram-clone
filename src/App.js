import React, { useState, useEffect } from "react";
import Post from "./Post";
import { db, auth } from "./firebase";
import useToggle from "./hooks/useToggle";
import useFormState from "./hooks/useFormState";
import Button from "@material-ui/core/Button";
import SignInModal from "./SignInModal";
import SignUpModal from "./SignUpModal";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import IconButton from "@material-ui/core/IconButton";
import AddPostSurface from "./AddPostSurface";

// STATICS
import "./App.css";

function App() {
  // STATES
  const [posts, setPosts] = useState([]);
  const [open, toggleOpen] = useToggle(false);
  const [openUpload, toggleUpload] = useToggle(false);
  const [openSignin, toggleSignin] = useToggle(false);
  const [username, handleUsername, resetUsername] = useFormState("");
  const [user, setUser] = useState(null);

  // HOOKS && CONTEXT
  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
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

  useEffect(() => {
    const unsubscribed = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // user Has Logged in
        setUser(authUser);
      } else {
        // user has not logged in || logged out
        setUser(null);
      }
    });

    return () => {
      // perform some clean ups action
      unsubscribed();
    };
  }, [user, username]);

  return (
    <div className="app">
      <SignInModal openSignin={openSignin} toggleSignin={toggleSignin} />
      <SignUpModal
        username={username}
        resetUsername={resetUsername}
        handleUsername={handleUsername}
        open={open}
        toggleOpen={toggleOpen}
      />
      <AddPostSurface
        open={openUpload}
        handleClose={toggleUpload}
        username={user?.displayName}
      />
      {/* Header */}
      <div className="app__header">
        <img
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          alt="Instagram Logo"
          className="app__headerImage"
        />
        {user ? (
          <div className="app__loginContainer">
            <Button>@{user.displayName}</Button>
            <Button onClick={() => auth.signOut()}>Logout</Button>
          </div>
        ) : (
          <div className="app__loginContainer">
            <Button onClick={toggleSignin}>Sign in</Button>
            <Button onClick={toggleOpen}>Sign Up</Button>
          </div>
        )}
      </div>

      <div className="app__posts">
        {/* Posts */}
        {posts.map(({ id, post }) => (
          <Post key={id} {...post} postId={id} user={user} />
        ))}
      </div>

      {user && (
        <footer className="app__footer">
          <IconButton
            color="secondary"
            aria-label="Add Post"
            onClick={toggleUpload}
          >
            <CloudUploadIcon />
          </IconButton>
        </footer>
      )}
    </div>
  );
}

export default App;
