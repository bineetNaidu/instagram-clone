import React, { useState, useEffect } from "react";
import Post from "./Post";
import { db, auth } from "./firebase";
import useToggle from "./hooks/useToggle";
import useFormState from "./hooks/useFormState";
import Button from "@material-ui/core/Button";
import SignInModal from "./SignInModal";
import SignUpModal from "./SignUpModal";
import ImageUploader from "./ImageUploader";

// STATICS
import "./App.css";

function App() {
  // STATES
  const [posts, setPosts] = useState([]);
  const [open, toggleOpen] = useToggle(false);
  const [openSignin, toggleSignin] = useToggle(false);
  const [email, handleEmail, resetEmail] = useFormState("");
  const [password, handlePassword, resetPassword] = useFormState("");
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
      <SignInModal
        email={email}
        handleEmail={handleEmail}
        resetEmail={resetEmail}
        password={password}
        handlePassword={handlePassword}
        resetPassword={resetPassword}
        openSignin={openSignin}
        toggleSignin={toggleSignin}
      />
      <SignUpModal
        email={email}
        handleEmail={handleEmail}
        resetEmail={resetEmail}
        password={password}
        resetPassword={resetPassword}
        handlePassword={handlePassword}
        username={username}
        resetUsername={resetUsername}
        handleUsername={handleUsername}
        open={open}
        toggleOpen={toggleOpen}
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
          <Post key={id} {...post} />
        ))}
      </div>

      {user && <ImageUploader username={user.displayName} />}
    </div>
  );
}

export default App;
