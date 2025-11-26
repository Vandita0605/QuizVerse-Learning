import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const userName = localStorage.getItem("name");

  const [stats, setStats] = useState({
    level: 0,
    points: 0,
    streak: 0,
  });

  const [modules, setModules] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        // ✅ Fetch user stats
        const statsRes = await axios.get(
          "http://localhost:5000/api/Auth/user",
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );

        setStats({
          level: statsRes.data.level,
          points: statsRes.data.points,
          streak: statsRes.data.streak,
        });

        // ✅ Fetch modules (NO CAPS IN ROUTE)
        const modulesRes = await axios.get(
          "http://localhost:5000/api/modules"
        );

        setModules(modulesRes.data);

      } catch (err) {
        console.error("Failed to fetch dashboard data:", err);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="dashboard-container">
      <h1 className="welcome-title">Welcome Back, {userName}! 👋</h1>

      <div className="stats-container">
        <div className="stat-box">
          <h3>Level</h3>
          <p>{stats.level}</p>
        </div>

        <div className="stat-box">
          <h3>Total Score</h3>
          <p>{stats.points}</p>
        </div>

        <div className="stat-box">
          <h3>Streak</h3>
          <p>{stats.streak}🔥</p>
        </div>
      </div>

      <h2 className="modules-title">Programming Modules</h2>

      <div className="modules-grid">
        {modules.map((module) => (
          <div key={module._id} className="module-card">
            <h3>{module.title}</h3>
            <p>{module.description}</p>
            <p><strong>{module.difficulty}</strong></p>

            <button
              className="start-btn"
              onClick={() => navigate(`/module/${module._id}`)}
            >
              Start Module
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;