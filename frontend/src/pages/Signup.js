import React, { useState } from "react";
import "./Signup.css";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/api/Auth/Register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      setMessage("Signup successful! You can login now.");
    } else {
      setMessage(data.message || "Signup failed.");
    }
  };

  return (
    <div className="signup-container">
      <h2>Create Account</h2>

      <form onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Create Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Signup</button>
      </form>

      <p className="message">{message}</p>
    </div>
  );
}

export default Signup;