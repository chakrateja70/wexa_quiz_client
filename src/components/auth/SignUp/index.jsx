import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Signup.css"; // CSS file for styling

const Signup = () => {
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    if (e.target.name === "password") {
      validatePassword(e.target.value);
    }
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/;
    if (!passwordRegex.test(password)) {
      setPasswordError("Password must have at least 8 characters, one uppercase, one lowercase, and one special character.");
    } else {
      setPasswordError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwordError) {
    
      return;
    }
    try {
      await axios.post("http://127.0.0.1:8000/auth/register", formData);
      alert("Signup successful!");
      navigate("/");
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div className="signup-container">
      <div className="form-box">
        <h2 className="title">Create an Account</h2>
        <p className="subtitle">Join us today! It takes only a few steps.</p>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username">Full Name</label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Enter your full name"
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter a strong password"
              onChange={handleChange}
              required
            />
            {passwordError && <p className="error">{passwordError}</p>}
          </div>

          <button type="submit" className="signup-button">Sign Up</button>
        </form>
        <p className="footer-text">
          Already have an account? <a href="/" className="login-link">Log in</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
