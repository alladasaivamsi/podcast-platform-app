import React from "react";
import { useSelector } from "react-redux";
import "./Profile.css";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";
import Loader from "../Loader/Loader";

function Profile() {
  const user = useSelector((state) => state.user.user);

  console.log("user", user);
  if (!user) {
    return <Loader />;
  }

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        toast.success("User Logged Out!");
      })
      .catch((error) => {
        // An error happened.
        toast.error(error.message);
      });
  };
  return (
    <div>
      <div className="profileData">
        <h1>Name : {user.name}</h1>
        <h1>Email : {user.email}</h1>
        <h1>User uid : {user.uid}</h1>
        <button onClick={handleLogout} className="logoutBtn">
          LogOut
        </button>
      </div>
    </div>
  );
}

export default Profile;
