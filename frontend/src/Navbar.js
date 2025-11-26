import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={styles.nav}>
      <h2 style={styles.logo}>QuizVerse✨</h2>
      <div style={styles.links}>
        <Link to="/" style={styles.link}>Home</Link>
        <Link to="/login" style={styles.link}>Login</Link>
        <Link to="/signup" style={styles.link}>Signup</Link>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    background: "#333",
    padding: "10px 20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  logo: {
    color: "white",
    margin: 0
  },
  links: {
    display: "flex",
    gap: "15px"
  },
  link: {
    color: "white",
    textDecoration: "none",
    fontSize: "16px"
  }
};

export default Navbar;