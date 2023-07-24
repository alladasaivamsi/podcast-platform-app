import React, { useState } from "react";
import "./FileInput.css";

const FileInput = ({ accept, id, fileHandleFunc, text }) => {
  const [fileSelected, setFileSelected] = useState(false);
  const onChange = (e) => {
    console.log(e.target.files);
    setFileSelected(e.target.files[0].name);
    fileHandleFunc(e.target.files[0]);
  };
  return (
    <div className="fileInput">
      <label
        htmlFor={id}
        className={`custom-input ${!fileSelected ? "label-input" : "active1"}`}
      >
        {fileSelected ? `The File ${fileSelected} was Selected` : text}
      </label>
      <input
        type="file"
        accept={accept}
        id={id}
        style={{ display: "none" }}
        onChange={onChange}
      />
    </div>
  );
};

export default FileInput;
