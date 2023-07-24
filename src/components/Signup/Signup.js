import React, { useState } from "react";
import "./Signup.css";
import { auth, db } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from "react-redux";
import { setUser } from "../../slices/userSlice";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("handle signUp");
    setLoading(true);
    if (password === confirmPassword && password.length >= 6 && name && email) {
      try {
        //creating user's account
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;
        console.log("user", user);

        //Saving user's details
        await setDoc(doc(db, "users", user.uid), {
          name: name,
          email: user.email,
          uid: user.uid,
        });

        //save data in the redux, call the redux action
        dispatch(
          setUser({
            name: name,
            email: user.email,
            uid: user.uid,
          })
        );
        toast.success("User has been created!");
        setLoading(false);
        navigate("/profile");
      } catch (e) {
        console.log("error", e);
        toast.error(e.message);
        setLoading(false);
      }
    } else {
      if (password !== confirmPassword) {
        toast.error(
          "Please Make Sure your Password and confirm Password matches!"
        );
      } else if (password.length < 6) {
        toast.error(
          "Please Make Sure your Password is more than 6 digits long!"
        );
      }
      setLoading(false);
    }
  };

  return (
    <div className="signupform">
      <form onSubmit={handleSubmit} className="formData">
        <h1>Signup</h1>
        <input
          className="name"
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required={true}
        />
        <br />
        <input
          className="email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required={true}
        />
        <br />
        <input
          className="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required={true}
        />
        <br />
        <input
          className="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required={true}
        />
        <br />
        <button className="signUpbtn" type="submit" disabled={loading}>
          {loading ? "Loading..." : "Signup"}
        </button>
      </form>
    </div>
  );
};

export default Signup;
