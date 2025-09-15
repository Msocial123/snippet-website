

// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import "./Login.css";

// function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const navigate = useNavigate();

//   const login = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post("http://localhost:5000/login", {
//         email,
//         password,
//       });

//       console.log("Login response:", res.data);

//       if (res.data?.UID) {
//         localStorage.setItem("user", JSON.stringify({ UID: res.data.UID }));
//         alert(res.data.message);
//         navigate("/"); // 👈 Better than window.location.href
//       } else {
//         alert("Login failed: UID not found.");
//       }
//     } catch (err) {
//       alert(err.response?.data?.message || "Login failed");
//       console.error("Login error:", err);
//     }
//   };

//   return (
//     <div className="login-page-container">
//       <header className="login-header">Snippet</header>
//       <div className="login-wrapper">
//         <div className="login-image">
//           <div className="login-box">
//             <h2>Login</h2>
//             <p>Welcome Happy to See YOU!!!!</p>
//             <form onSubmit={login}>
//               <input
//                 type="email"
//                 placeholder="Email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//               />

//               <div className="password-wrapper">
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   placeholder="Password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   required
//                 />
//                 <label className="show-password">
//                   <input
//                     type="checkbox"
//                     onChange={() => setShowPassword(!showPassword)}
//                   />{" "}
//                   Show Password
//                 </label>
//               </div>

//               <button type="submit">Login</button>
//             </form>

//             <div className="login-links">
//               <a href="/forgot-password">Forgot password?</a>
//               <div className="signup">
//                 <span>New User?</span>
//                 <button onClick={() => navigate("/signup")}>Sign up</button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Login;

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/login", {
        email,
        password,
      });

      console.log("Login response:", res.data);

     if (res.data?.user) {
  localStorage.setItem("user", JSON.stringify(res.data.user));
  alert(res.data.message || "Login successful!");
  navigate("/landing"); // Redirect to landing page
} else {
  alert("Login failed: User not found.");
}


    } catch (err) {
      console.error("Login error:", err);
      alert(err.response?.data?.message || "Login failed due to server error.");
    }
  };

  return (
    <div className="login-page-container">
      <header className="login-header">Snippet</header>
      <div className="login-wrapper">
        <div className="login-image">
          <div className="login-box">
            <h2>Login</h2>
            <p>Welcome Happy to See YOU!!!!</p>
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
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <label className="show-password">
                  <input
                    type="checkbox"
                    onChange={() => setShowPassword(!showPassword)}
                  />
                  Show Password
                </label>
              </div>

              <button type="submit">Login</button>
            </form>

            <div className="login-links">
              <a href="/forgot-password">Forgot password?</a>
              <div className="signup">
                <span>New User?</span>
                <button onClick={() => navigate("/signup")}>Sign up</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

