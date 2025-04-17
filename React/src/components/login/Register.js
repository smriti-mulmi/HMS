import React, { useState } from "react";
import { useNavigate } from "react-router-dom";  // Import useNavigate instead of useHistory
import HeadTitle from "../../common/HeadTitle/HeadTitle";
import axios from "axios";
import "./design.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [error, setError] = useState("");  // To handle error messages
  const navigate = useNavigate();  // Use navigate instead of history

  const submitForm = async (e) => {
    e.preventDefault();

    // Validate if passwords match
    if (password !== cpassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const newUser = { name, email, password,cpassword };

      // Make a POST request to register the user
      const response = await axios.post("http://localhost:5000/register", newUser);

      if (response.status === 201) {
        // Redirect to login page after successful registration
        navigate("/sign-in");  // Use navigate for redirection
      }
    } catch (err) {
      setError(err.response.data.message || "Something went wrong.");
    }

    // Clear input fields after submitting
    setName("");
    setEmail("");
    setPassword("");
    setCpassword("");
  };

  return (
    <>
      <HeadTitle />
      <section className="forms top">
        <div className="container">
          <div className="sign-box">
            <p>
              Don't have an account? Create your account, it takes less than a
              minute.
            </p>
            <form action="" onSubmit={submitForm}>
              <input
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                required
              />
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
              />
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
              />
              <input
                type="password"
                name="cpassword"
                value={cpassword}
                onChange={(e) => setCpassword(e.target.value)}
                placeholder="Confirm Password"
                required
              />

              {error && <p className="error">{error}</p>} {/* Show error message */}

              <button type="submit" className="primary-btn">
                Create an Account
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Register;
