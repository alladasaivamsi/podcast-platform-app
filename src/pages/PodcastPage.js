import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { collection, onSnapshot, query } from "firebase/firestore";
import { setPodcasts } from "../slices/podcastSlice";
import { db } from "../firebase";
import PodcastCard from "../components/Podcasts/PodcastCard/PodcastCard";

const PodcastPage = () => {
  const dispatch = useDispatch();
  const podcasts = useSelector((state) => state.podcasts.podcasts);

  const [search, setSearch] = useState("");

  useEffect(() => {
    const unSubscribe = onSnapshot(
      query(collection(db, "podcasts")),
      (querySnapshot) => {
        const podcastsData = [];
        querySnapshot.forEach((doc) => {
          podcastsData.push({ id: doc.id, ...doc.data() });
        });
        dispatch(setPodcasts(podcastsData));
      },
      (error) => {
        console.error("Error fetching podcasts:", error);
      }
    );

    return () => {
      unSubscribe();
    };
  }, [dispatch]);

  console.log(podcasts);

  var filteredPodcasts = podcasts.filter((item) =>
    item.title.trim().toLowerCase().includes(search.trim().toLowerCase())
  );

  return (
    <div className="input-wrapper">
      <h1>Discover Podcasts</h1>
      <input
        className="search"
        type="text"
        placeholder="Search By Title"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        required={true}
      />
      {filteredPodcasts.length > 0 ? (
        <div className="podcasts-flex">
          {filteredPodcasts.map((item) => {
            return (
              <PodcastCard
                key={item.id}
                id={item.id}
                title={item.title}
                displayImage={item.displayImage}
              />
            );
          })}
        </div>
      ) : (
        <p>{search ? "Podcast Not Found" : "No Podcasts On The Platform"}</p>
      )}
    </div>
  );
};

export default PodcastPage;
