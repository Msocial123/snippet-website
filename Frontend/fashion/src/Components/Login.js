import React, { useState } from "react";
import axios from "axios";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // 👈 NEW STATE

  const login = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/login", {
        email,
        password,
      });
      alert(res.data.message);
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
      console.error("Login error:", err);
    }
  };

  return (
    <>
      <header className="login-header">Snippet</header>
      <div className="login-wrapper">
        <div className="login-image">
          <div className="login-box">
            <h2>Login</h2>
            <p>Welcome Happy to See U!!!!</p>
            <form onSubmit={login}>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <div className="password-wrapper">
                <input
                  type={showPassword ? "text" : "password"} // 👈 Toggle type
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <label className="show-password">
                  <input
                    type="checkbox"
                    onChange={() => setShowPassword(!showPassword)}
                  />{" "}
                  Show Password
                </label>
              </div>

              <button type="submit">Login</button>
            </form>

            <div className="login-links">
              <a href="/forgot-password">Forgot password?</a>
              <div className="signup">
                <span>New User?</span>
                <button>Sign up</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
