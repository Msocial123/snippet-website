// src/components/ResetPassword.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Resetpassword.css";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [token, setToken] = useState("");
  const [message, setMessage] = useState("");
   const [showPassword, setShowPassword] = useState(false); // 👈 NEW STATE

  useEffect(() => {
     const urlParams = new URLSearchParams(window.location.search);
  const urlToken = urlParams.get("token");
  console.log("URL token:", urlToken);  // ✅ Log here
  setToken(urlToken || "");
  
  }, []);

  const handleReset = async () => {
  if (!token || !newPassword) {
    setMessage("Missing token or password");
    return;
  }

  // Password validation: 1 number, 1 special char, 1 uppercase letter, min 8 chars
  const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/;

  if (!passwordRegex.test(newPassword)) {
    setMessage("Password must be at least 8 characters, include 1 uppercase letter, 1 number, and 1 special character.");
    return;
  }

  try {
    const res = await axios.post("http://localhost:5000/reset-password", {
      token,
      newPassword,
    });
    setMessage(res.data.message || "Password changed successfully");
  } catch (err) {
    setMessage(err.response?.data?.message || "Reset failed");
  }
};

  return (
    <div>
       <header className="login-header">Snippet</header>
    <div className="auth-container">
      <h2>Reset Password</h2>
      <input
        type={showPassword ? "text" : "password"} // 👈 Toggle type
        placeholder="Enter new password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
        <label className="show-password">
                  <input
                    type="checkbox"
                    onChange={() => setShowPassword(!showPassword)}
                  />{" "}
                  Show Password
                </label>

      <button id="reset" onClick={handleReset}>Reset Password</button>
      <p>{message}</p>
      

    </div>
    </div>
  );
};

export default ResetPassword;
