import "./App.css";
import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Profile from "./components/Profile/Profile";
import Navigate from "./components/Navigate/Navigate";
import SignInSignUp from "./pages/SignInSignUp";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import { auth, db } from "./firebase";
import { setUser } from "./slices/userSlice";
import PrivateRoutes from "./components/PrivateRoutes";
import createPodcast from "./pages/CreatePodcast";
import PodcastPage from "./pages/PodcastPage";
import PodcastDetails from "./pages/PodcastDetails";
import CreateAnEpisode from "./pages/CreateAnEpisode";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        const unSubscribeSnapshot = onSnapshot(
          doc(db, "users", user.uid),
          (userDoc) => {
            if (userDoc.exists()) {
              const userData = userDoc.data();
              dispatch(
                setUser({
                  name: userData.name,
                  email: userData.email,
                  uid: user.uid,
                })
              );
            }
          },
          (error) => {
            console.error("Error fetching user data:", error);
          }
        );
        return () => {
          unSubscribeSnapshot();
        };
      }
    });
    return () => {
      unsubscribeAuth();
    };
  }, []);

  return (
    <div className="App">
      <ToastContainer />
      <BrowserRouter>
        <Navigate />
        <Routes>
          <Route exact path="/" Component={SignInSignUp}></Route>
          <Route element={<PrivateRoutes />}>
            <Route path="/podcasts" Component={PodcastPage}></Route>
            <Route path="/create-a-podcast" Component={createPodcast}></Route>
            <Route path="/profile" Component={Profile}></Route>
            <Route path="/podcast/:id" Component={PodcastDetails}></Route>
            <Route
              path="/podcast/:id/create-episode"
              Component={CreateAnEpisode}
            ></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
