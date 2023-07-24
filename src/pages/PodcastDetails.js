import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { auth, db } from "../firebase";
import { collection, doc, getDoc, onSnapshot, query } from "firebase/firestore";
import { toast } from "react-toastify";
import EpisodeDetails from "../components/Podcasts/EpisodeDetails/EpisodeDetails";
import AudioPlayer from "../components/Podcasts/AudioPlayer/AudioPlayer";

const PodcastDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [podcast, setPodcast] = useState({});
  const [episodes, setEpisodes] = useState([]);
  const [playingFile, setPlayingFile] = useState("");
  console.log("ID:", id);
  useEffect(() => {
    if (id) {
      getData();
    }
  }, [id]);

  const getData = async () => {
    try {
      const docRef = doc(db, "podcasts", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        setPodcast({ id: id, ...docSnap.data() });
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such Podacst!");
        toast.error("No such Podacst!");
        navigate("/podcasts");
      }
    } catch (e) {
      toast.error(e.message);
    }
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, "podcasts", id, "episodes")),
      (querySnapshot) => {
        const episodesData = [];
        querySnapshot.forEach((doc) => {
          episodesData.push({ id: doc.id, ...doc.data() });
        });
        setEpisodes(episodesData);
      },
      (error) => {
        console.error("Error fetching episodes:", error);
      }
    );
    return () => {
      unsubscribe();
    };
  }, [id]);

  return (
    <div>
      <div style={{ marginLeft: "6rem" }}>
        {podcast.id && (
          <div className="podcast-details">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <h1 className="podcast-title-heading">{podcast.title}</h1>
              {podcast.createdBy === auth.currentUser.uid && (
                <button
                  className="podcastBtn"
                  style={{ width: "250px !important" }}
                  onClick={() => {
                    navigate(`/podcast/${id}/create-episode`);
                  }}
                >
                  Create Episode
                </button>
              )}
            </div>
            <div className="banner-wrapper">
              <img src={podcast.bannerImage} />
            </div>
            <p className="podcast-description">{podcast.description}</p>
            <h1 className="podcast-title-heading">Episodes</h1>
            {episodes.length > 0 ? (
              <div style={{ width: "100%" }}>
                {episodes.map((episode, index) => {
                  return (
                    <EpisodeDetails
                      key={index}
                      index={index + 1}
                      title={episode.title}
                      description={episode.description}
                      audioFile={episode.audioFile}
                      onClick={(file) => setPlayingFile(file)}
                    />
                  );
                })}
              </div>
            ) : (
              <p>No Episodes</p>
            )}
          </div>
        )}
      </div>
      {playingFile && (
        <AudioPlayer audioSrc={playingFile} image={podcast.displayImage} />
      )}
    </div>
  );
};

export default PodcastDetails;
