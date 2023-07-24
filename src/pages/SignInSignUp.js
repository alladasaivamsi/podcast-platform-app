import React, { useState } from "react";
import Signup from "../components/Signup/Signup";
import Login from "../components/Login/Login";

const SignInSignUp = () => {
  const [flag, setFlag] = useState(false);

  return (
    <div>
      <div className="input-wrapper">
        {!flag ? <Signup /> : <Login />}
        {!flag ? (
          <h3 style={{ cursor: "pointer" }} onClick={() => setFlag(!flag)}>
            Already have an Account? Click here to Login.
          </h3>
        ) : (
          <h3 style={{ cursor: "pointer" }} onClick={() => setFlag(!flag)}>
            Don't have an account? Click here to Signup.
          </h3>
        )}
      </div>
    </div>
  );
};

export default SignInSignUp;
