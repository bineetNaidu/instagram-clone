import React, { useState } from "react";
import Modal from "@material-ui/core/Modal";
import TextField from "@material-ui/core/TextField";
import { auth } from "./firebase";
import Button from "@material-ui/core/Button";

import { useStyles, getModalStyle } from "./utils";
getModalStyle();

const SignInModal = ({
  email,
  handleEmail,
  resetEmail,
  password,
  handlePassword,
  resetPassword,
  openSignin,
  toggleSignin,
}) => {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = useState(getModalStyle);

  const handleSignIn = (e) => {
    e.preventDefault();
    // cool db stuffs
    auth
      .signInWithEmailAndPassword(email, password)
      .catch((err) => alert(err.message));
    // cool db stuffs
    toggleSignin();
    resetEmail();
    resetPassword();
  };
  return (
    <Modal
      open={openSignin}
      onClose={toggleSignin}
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
            value={email}
            onChange={handleEmail}
            margin="normal"
            label="Email"
          />
          <TextField
            type="password"
            margin="normal"
            value={password}
            onChange={handlePassword}
            label="Password"
          />
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            style={{ marginTop: "10px" }}
            onClick={handleSignIn}
          >
            Sign IN
          </Button>
        </form>
      </div>
    </Modal>
  );
};

export default SignInModal;
