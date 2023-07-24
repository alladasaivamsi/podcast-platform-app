import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import "./Podcasts.css";
import { toast } from "react-toastify";
import FileInput from "../Input/FileInput";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { auth, db, storage } from "../../firebase";
import { addDoc, collection } from "firebase/firestore";

const Podcasts = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [displayImage, setDisplayImage] = useState();
  const [bannerImage, setBannerImage] = useState();

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    if (title && description && bannerImage && displayImage) {
      setLoading(true);
      //1. Upload Files => get downloadable links
      try {
        const bannerImageRef = ref(
          storage,
          `podcasts/${auth.currentUser.uid}/${Date.now()}`
        );
        await uploadBytes(bannerImageRef, bannerImage);

        const bannerImageUrl = await getDownloadURL(bannerImageRef);

        const displayImageRef = ref(
          storage,
          `podcasts/${auth.currentUser.uid}/${Date.now()}`
        );
        await uploadBytes(displayImageRef, displayImage);

        const displayImageUrl = await getDownloadURL(displayImageRef);

        const podcastData = {
          title: title,
          description: description,
          bannerImage: bannerImageUrl,
          displayImage: displayImageUrl,
          createdBy: auth.currentUser.uid,
        };

        const docRef = await addDoc(collection(db, "podcasts"), podcastData);

        setTitle("");
        setDescription("");
        setBannerImage(null);
        setDisplayImage(null);

        toast.success("Podcast Created!");
        setLoading(false);
      } catch (e) {
        toast.error(e.message);
        console.log(e);
        setLoading(false);
      }

      //2. Create a New Doc in a New Collection called Podcasts
      //3. Save this New Podcast Episodes States in our Podcasts
    } else {
      toast.error("Please Enter All Values");
      setLoading(false);
    }
  };

  const displayImageHandle = (file) => {
    setDisplayImage(file);
  };

  const bannerImageHandle = (file) => {
    setBannerImage(file);
  };

  return (
    <div className="podcastForm">
      <input
        className="title"
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required={true}
      />
      <input
        className="description"
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required={true}
      />
      <br />
      <FileInput
        accept={"image/*"}
        id="display-image-input"
        fileHandleFunc={displayImageHandle}
        text={"Display Image Upload"}
      />
      <br />
      <br />
      <FileInput
        accept={"image/*"}
        id="banner-image-input"
        fileHandleFunc={bannerImageHandle}
        text={"Banner Image Upload"}
      />
      <br />
      <button
        className="podcastBtn"
        type="submit"
        disabled={loading}
        onClick={handleSubmit}
      >
        {loading ? "Loading..." : "Create A Podcast"}
      </button>
    </div>
  );
};

export default Podcasts;
