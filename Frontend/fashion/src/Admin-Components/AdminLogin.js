import React, { useState } from "react";
import axios from "axios";
import "./AdminLogin.css";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
  e.preventDefault();
  try {
    console.log("📤 Sending login request:", { email, password });
    const res = await axios.post(
      "http://localhost:5000/api/admin/login",
      { email, password },
      { withCredentials: true }
    );
    console.log("📥 Response:", res.data);

    if (res.data.admin) {
      window.location.href = "/admin";
    }
  } catch (err) {
    console.error("❌ Login error:", err.response?.data || err.message);
    setMessage("Login failed! Only admin can login.");
  }
};


  return (
    <div className="admin-login-wrapper">
      <form onSubmit={handleLogin} className="admin-login-form">
        <h2>Admin Login</h2>
        <input
          type="email"
          placeholder="Admin Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Admin Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
        {message && <p className="error">{message}</p>}
      </form>
    </div>
  );
}

export default AdminLogin;
