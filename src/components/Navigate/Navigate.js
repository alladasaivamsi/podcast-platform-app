import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import { clearUser } from "../../slices/userSlice";
import "./Navigate.css";

const Navigate = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  console.log(currentPath);
  const dispatch = useDispatch();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      dispatch(clearUser());
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div className="navigation">
      <div className="gradient"></div>
      <div className="links">
        <Link to="/" className={currentPath === "/" ? "active" : "link"}>
          Signup
        </Link>
        <Link
          to="/podcasts"
          className={currentPath === "/podcasts" ? "active" : "link"}
        >
          Podcasts
        </Link>
        <Link
          to="/create-a-podcast"
          className={currentPath === "/create-a-podcast" ? "active" : "link"}
        >
          Start A Podcast
        </Link>
        <Link
          to="/profile"
          className={currentPath === "/profile" ? "active" : "link"}
        >
          Profile
        </Link>
      </div>
    </div>
  );
};

export default Navigate;
