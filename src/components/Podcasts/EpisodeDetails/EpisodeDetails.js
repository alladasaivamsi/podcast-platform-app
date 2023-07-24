import React from "react";

function EpisodesDetails({ index, title, description, audioFile, onClick }) {
  return (
    <div style={{ width: "100%" }}>
      <h1 style={{ textAlign: "left", marginBottom: "0" }}>
        {index}. {title}
      </h1>
      <p className="podcast-description" style={{ textAlign: "left" }}>
        {description}
      </p>
      <button
        className="signUpbtn"
        onClick={() => onClick(audioFile)}
        width={"100px"}
      >
        Play
      </button>
    </div>
  );
}

export default EpisodesDetails;
