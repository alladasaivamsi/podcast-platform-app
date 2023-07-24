import React from "react";
import Podcasts from "../components/Podcasts/Podcasts";

const createPodcast = () => {
  return (
    <div>
      <div className="input-wrapper">
        <h1>Create A Podcast</h1>
        <Podcasts />
      </div>
    </div>
  );
};

export default createPodcast;
