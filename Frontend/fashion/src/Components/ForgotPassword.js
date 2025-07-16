import React, { useState } from "react";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
    

  const handleSendLink = async () => {
    try {
      const res = await axios.post("http://localhost:5000/forgot-password", { email });
      setMessage(res.data.message || "Reset link sent!");
    } catch (err) {
      setMessage(err.response?.data?.message || "Error sending reset link");
    }
  };
  

  return (
    <div>
       <header className="login-header">Snippet</header>
    <div className="auth-container">
      <h2>Forgot Password</h2>
      <input
        type="email"
        placeholder="Enter your registered email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleSendLink}>Send Reset Link</button>
      <p>{message}</p>
    </div>
    </div>
  );
};

export default ForgotPassword;
