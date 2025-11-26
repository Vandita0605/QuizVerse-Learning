import React, { useState } from "react";
import axios from "axios";
import "./Login.css";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/Auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("name", res.data.user.name);

      navigate("/dashboard");
    } catch (err) {
      setError("Invalid email or password ❌");
    }
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <h1 className="brand-title">✨ QuizVerse ✨</h1>

        <h2 className="login-title">Welcome Back!</h2>

        {error && <p className="error-msg">{error}</p>}

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            className="input-field"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="input-field"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="login-btn" type="submit">
            🩵Login🩵
          </button>
        </form>

        <p className="signup-link">
          New here? <Link to="/signup">Create an account</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;