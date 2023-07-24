import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import FileInput from "../components/Input/FileInput";
import { useParams } from "react-router";
import { addDoc, collection } from "firebase/firestore";
import { auth, db, storage } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const CreateAnEpisode = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [audioFile, setAudioFile] = useState();
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const audioFileHandle = (file) => {
    setAudioFile(file);
  };
  const handleSubmit = async () => {
    setLoading(true);
    if ((title, description, audioFile, id)) {
      try {
        const audioRef = ref(
          storage,
          `podcast-episodes/${auth.currentUser.uid}/${Date.now()}`
        );
        await uploadBytes(audioRef, audioFile);
        const audioURL = await getDownloadURL(audioRef);
        const episodeData = {
          title: title,
          description: description,
          audioFile: audioURL,
        };

        await addDoc(collection(db, "podcasts", id, "episodes"), episodeData);
        toast.success("Episode Created Successfully");
        setLoading(false);
        navigate(`/podcast/${id}`);
        setTitle("");
        setDescription("");
        setAudioFile("");
      } catch (e) {
        toast.error(e.mesage);
        setLoading(false);
      }
    } else {
      toast.error("All Files Should be there");
      setLoading(false);
    }
  };

  return (
    <div className="input-wrapper">
      <h1>Crate An Episode</h1>
      <input
        className="title"
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required={true}
      />
      <br />
      <input
        className="description"
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required={true}
      />
      <FileInput
        accept={"audio/*"}
        id="audio-file-input"
        fileHandleFunc={audioFileHandle}
        text={"Upload Audio File"}
      />
      <br />
      <button
        className="podcastBtn"
        type="submit"
        disabled={loading}
        onClick={handleSubmit}
      >
        {loading ? "Loading..." : "Create Episode"}
      </button>
    </div>
  );
};

export default CreateAnEpisode;
