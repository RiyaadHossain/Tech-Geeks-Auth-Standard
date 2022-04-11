import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import GoogleLogo from "../../Assets/Image/google.svg";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { app } from "../../Firebase/Firebase.init";

const Signup = () => {
  const navigate = useNavigate();
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const [confirmPassword, setConfirmPassword] = useState({
    value: "",
    error: "",
  });
  const onEmailBlur = (e) => {
    const email = e.target.value;
    if (/\S+@\S+\.\S+/.test(email)) {
      setEmail({ value: email, error: "" });
    } else {
      setEmail({ value: "", error: "Invalid Email" });
    }
  };
  const onPasswordBlur = (e) => {
    const password = e.target.value;
    if (password.length > 6) {
      setPassword({ value: password, error: "" });
    } else {
      setPassword({ value: "", error: "Too Short" });
    }
  };

  const onConfirmPasswordBlur = (e) => {
    const confirmPassword = e.target.value;
    
    if (confirmPassword === password.value) {
      setConfirmPassword({ value: confirmPassword, error: "" });
    } else {
      setConfirmPassword({ value: "", error: "Password didn't match" });
    }
  };

  const emailSignUP = (e) => {
    e.preventDefault();

    if (email.value === '') {
      setEmail({value: "", error:"Email is Required"})
    }
    if (password.value === '') {
      setPassword({value: "", error:"Password is Required"})
    }
    if (confirmPassword.value === '') {
      setConfirmPassword({value: "", error:"Confirm Password is Required"})
    }

    if (
      email.value &&
      password.value &&
      confirmPassword.value === password.value
    ) {
      createUserWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredential) => {
          const user = userCredential.user;
          navigate("/");
        })
        .catch((error) => {
          const errorMessage = error.message;
        });
    }
  };

  const googleSignUp = (e) => {
    e.preventDefault();

    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        navigate("/");
        console.log(user);
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  };

  return (
    <div className="auth-form-container ">
      <div className="auth-form">
        <h1>Sign Up</h1>
        <form onSubmit={emailSignUP}>
          <div className="input-field">
            <label htmlFor="email">Email</label>
            <div className="input-wrapper">
              <input
                onBlur={onEmailBlur}
                type="email"
                name="email"
                id="email"
              />
            </div>
            {email?.error && <p className="error">⚠️ {email.error}</p>}
          </div>
          <div className="input-field">
            <label htmlFor="password">Password</label>
            <div className="input-wrapper">
              <input
                onBlur={onPasswordBlur}
                type="password"
                name="password"
                id="password"
              />
            </div>
            {password?.error && <p className="error">⚠️ {password.error}</p>}
          </div>
          <div className="input-field">
            <label htmlFor="confirm-password">Confirm Password</label>
            <div className="input-wrapper">
              <input
                type="password"
                name="confirmPassword"
                id="confirm-password"
                onBlur={onConfirmPasswordBlur}
              />
            </div>
            {confirmPassword?.error && (
              <p className="error">⚠️ {confirmPassword.error}</p>
            )}
          </div>
          <button type="submit" className="auth-form-submit">
            Sign Up
          </button>
        </form>
        <p className="redirect">
          Already have an account?{" "}
          <span onClick={() => navigate("/login")}>Login</span>
        </p>
        <div className="horizontal-divider">
          <div className="line-left" />
          <p>or</p>
          <div className="line-right" />
        </div>
        <div className="input-wrapper">
          <button onClick={googleSignUp} className="google-auth">
            <img src={GoogleLogo} alt="" />
            <p> Continue with Google </p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
