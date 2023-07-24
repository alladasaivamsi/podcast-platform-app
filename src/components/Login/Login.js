import React, { useState } from "react";
import "./Login.css";
import { auth, db } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from "react-redux";
import { setUser } from "../../slices/userSlice";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("Handling Login!");
    setLoading(true);
    if (email && password) {
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

        const user = userCredential.user;

        const userDoc = await getDoc(doc(db, "users", user.uid));
        const userData = userDoc.data();
        console.log("userData", userData);

        dispatch(
          setUser({
            name: userData.name,
            email: user.email,
            uid: user.uid,
          })
        );
        toast.success("Login Successful!");
        setLoading(false);
        navigate("/profile");
      } catch (error) {
        console.error("Error signing in:", error);
        setLoading(false);
        toast.error(error.message);
      }
    } else {
      toast.error("Make sure email and password are not empty!");
      setLoading(false);
    }
  };
  return (
    <div className="loginForm">
      <form>
        <h1>Login</h1>
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
        <button
          className="loginBtn"
          type="submit"
          disabled={loading}
          onClick={handleLogin}
        >
          {loading ? "Loading..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
