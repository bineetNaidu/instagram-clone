import React from "react";
import Modal from "@material-ui/core/Modal";
import ImageUploader from "./ImageUploader";

import { useStyles, getModalStyle } from "./utils";
getModalStyle();

function AddPostSurface({ open, handleClose, username }) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <div style={modalStyle} className={classes.paper}>
        <ImageUploader username={username} />
      </div>
    </Modal>
  );
}

export default AddPostSurface;
