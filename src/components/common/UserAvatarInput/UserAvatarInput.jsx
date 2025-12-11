import React, { useEffect, useState } from "react";
import styles from "./UserAvatarInput.module.css";

export default function UserAvatarInput() {
  const isCurrentUser = true; //TODO: need to take from storage
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const inputRef = React.useRef();
  console.log(inputRef);
  useEffect(() => {
    console.log(selectedFile);

    previewImage && URL.revokeObjectURL(previewImage);
    selectedFile && setPreviewImage(URL.createObjectURL(selectedFile));
  }, [selectedFile]);

  const handleAddButton = () => {
    inputRef.current.click();
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  return (
    <div className={styles["wrapper"]}>
      {previewImage && <img className={styles["avatar"]} src={previewImage} />}
      {isCurrentUser && (
        <>
          {" "}
          <button
            type="button"
            className={styles["add-button"]}
            onClick={handleAddButton}
          >
            +
          </button>
          <input
            className={styles["input"]}
            type="file"
            ref={inputRef}
            accept="image/*"
            onChange={handleFileChange}
          />
        </>
      )}
    </div>
  );
}
