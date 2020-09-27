import React, { useState } from "react";
import Modal from "@material-ui/core/Modal";
import TextField from "@material-ui/core/TextField";
import { auth } from "./firebase";
import Button from "@material-ui/core/Button";

import { useStyles, getModalStyle } from "./utils";
getModalStyle();

const SignUpModal = ({
  email,
  handleEmail,
  resetEmail,
  password,
  resetPassword,
  handlePassword,
  username,
  resetUsername,
  handleUsername,
  open,
  toggleOpen,
}) => {
  // FUNCTIONS
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = useState(getModalStyle);

  const handleSignUp = (e) => {
    e.preventDefault();
    // cool db stuffs
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((user) => user.user.updateProfile({ displayName: username }))
      .catch((err) => alert(err.message));
    // cool db stuffs
    toggleOpen();
    resetEmail();
    resetPassword();
    resetUsername();
  };

  return (
    <Modal
      open={open}
      onClose={toggleOpen}
      aria-labelledby="auth-modal-title"
      aria-describedby="auth-modal-description"
    >
      <div style={modalStyle} className={classes.paper}>
        <form className="app__signUp">
          <center>
            <img
              src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
              alt="Instagram Logo"
              className="app__headerImage"
            />
          </center>
          <TextField
            type="text"
            value={username}
            onChange={handleUsername}
            label="Username"
          />
          <TextField
            type="text"
            value={email}
            onChange={handleEmail}
            label="Email"
          />
          <TextField
            type="password"
            value={password}
            onChange={handlePassword}
            label="Password"
          />
          <Button type="submit" onClick={handleSignUp}>
            Login
          </Button>
        </form>
      </div>
    </Modal>
  );
};

export default SignUpModal;
