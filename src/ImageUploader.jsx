import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import useFormState from "./hooks/useFormState";
import { storage, db } from "./firebase";
import firebase from "firebase";

// STATICS
import "./ImageUploader.css";

const ImageUploader = ({ username }) => {
  // STATES
  const [caption, handleCaption, resetCaption] = useFormState("");
  const [progress, setProgress] = useState(0);
  const [image, setImage] = useState(null);

  // HOOKS

  // FUNCTIONS
  const handleImageFiles = (e) => setImage(e.target.files[0]);

  // upload functions
  const handleUploads = () => {
    // Cool DB && Storage Stuffs
    const uploadTask = storage.ref(`images/${image.name}`).put(image); // image.name is filename
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // progress functions...
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (err) =>
        // Error function
        alert(err.message),
      () => {
        // Complete Function ...
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            // POST functions
            db.collection("posts").add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              imageUrl: url,
              caption,
              username,
            });
          });

        resetCaption();
        setImage(null);
        setProgress(0);
      }
    );
  };

  return (
    <div className="imageupload">
      {/* Progress Bar */}
      <progress className="imageupload__progress" value={progress} max={100} />
      {/* Caption Input */}
      <TextField
        label="Caption Your Day"
        value={caption}
        onChange={handleCaption}
      />
      {/* FilePicker */}
      <input type="file" onChange={handleImageFiles} />
      {/* post button */}
      <Button variant="contained" color="secondary" onClick={handleUploads}>
        Post
      </Button>
    </div>
  );
};

export default ImageUploader;
