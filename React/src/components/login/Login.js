import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import HeadTitle from "../../common/HeadTitle/HeadTitle";
import axios from "axios";
import "./design.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [recValue, setRecValue] = useState([]);
  const [error, setError] = useState(""); // To hold error messages

  const navigate = useNavigate(); // React Router v6 hook to navigate

  const submitForm = async (e) => {
    e.preventDefault();
    
    const loginData = { email, password };

    try {
      const response = await axios.post("http://localhost:5000/login", loginData);
      // Assuming backend sends a success message and token
      console.log(response.data);
      setRecValue([...recValue, response.data.user]); // Store user info (without password)
      localStorage.setItem("authToken", response.data.token); // Store JWT token in localStorage

      alert("Login successful");
      navigate("/room");
    } catch (error) {
      if (error.response) {
        // Backend error
        setError(error.response.data.message || "Login failed");
      } else {
        // Network error
        setError("Network error, please try again later.");
      }
    }

    setEmail("");
    setPassword("");
  };

  return (
    <>
      <HeadTitle />
      <section className="forms top">
        <div className="container">
          <div className="sign-box">
            <p>
              Enter your e-mail and password below to log in to your account
              and use the benefits of our website.
            </p>
            <form action="" onSubmit={submitForm}>
              <input
                type="text"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
              />
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />

              <div className="flex_space">
                <div className="flex">
                  <input type="checkbox" />
                  <label>Remember Me</label>
                </div>
                <div className="flex">
                  <span>I forgot my password</span>
                </div>
              </div>

              <button type="submit" className="primary-btn">
                Sign In
              </button>
              <p>
                Don't have an account? <Link to="/register">Signup!</Link>
              </p>
            </form>

            {/* Display error if login fails */}
            {error && <p className="error-message">{error}</p>}
          </div>
        </div>
      </section>

      <section className="show-data">
        {recValue.map((currentValue, index) => {
          return (
            <div className="sign-box" key={index}>
              <h1>Sign-In Successfully</h1>
              <h3>
                Email: <p>{currentValue.email}</p>
              </h3>
            </div>
          );
        })}
      </section>
    </>
  );
};

export default Login;
