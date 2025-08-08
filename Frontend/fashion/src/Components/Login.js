// import React, { useState } from "react";
// import axios from "axios";
// import "./Login.css";

// function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false); // 👈 NEW STATE

//   // const login = async (e) => {
//   //   e.preventDefault();
//   //   try {
//   //     const res = await axios.post("http://localhost:5000/login", {
//   //       email,
//   //       password,
//   //     });
//   //     alert(res.data.message);
//   //   } catch (err) {
//   //     alert(err.response?.data?.message || "Login failed");
//   //     console.error("Login error:", err);
//   //   }
//   // };

//   const login = async (e) => {
//   e.preventDefault();
//   try {
//     const res = await axios.post("http://localhost:5000/login", {
//       email,
//       password,
//     });
//     const user = { UID: res.data.UID }; // or whatever your backend returns
// localStorage.setItem("user", JSON.stringify(user));
// window.location.reload();
//     // Store login details (excluding password)
//     // Example in Login.js after successful login:
// // localStorage.setItem("user", JSON.stringify({ UID: res.data.UID }));
// // // assuming backend sends user info
// //     localStorage.setItem("token", res.data.token); // if JWT token sent

//     alert(res.data.message);
//     // Optionally redirect
//     window.location.href = "/"; // redirect to homepage or dashboard
//   } catch (err) {
//     alert(err.response?.data?.message || "Login failed");
//     console.error("Login error:", err);
//   }
// };


//   return (
//     <>
//       <header className="login-header">Snippet</header>
//       <div className="login-wrapper">
//         <div className="login-image">
//           <div className="login-box">
//             <h2>Login</h2>
//             <p>Welcome Happy to See U!!!!</p>
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
//                   type={showPassword ? "text" : "password"} // 👈 Toggle type
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
//                 <button>Sign up</button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Login;
// import React, { useState } from "react";
// import axios from "axios";
// import "./Login.css";

// function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);

//   const login = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post("http://localhost:5000/login", {
//         email,
//         password,
//       });

//       console.log("Login response:", res.data); // For debugging

//       // Access UID from different possible response formats
//       const UID = res.data.UID || res.data.user?.UID;

//       if (UID) {
//         const user = { UID };
//         localStorage.setItem("user", JSON.stringify(user));

//         // Optional: store JWT token if available
//         if (res.data.token) {
//           localStorage.setItem("token", res.data.token);
//         }

//         alert(res.data.message || "Login successful");
//         window.location.href = "/";
//       } else {
//         alert("Invalid login response: UID missing");
//       }
//     } catch (err) {
//       alert(err.response?.data?.message || "Login failed");
//       console.error("Login error:", err);
//     }
//   };

//   return (
//     <>
//       <header className="login-header">Snippet</header>
//       <div className="login-wrapper">
//         <div className="login-image">
//           <div className="login-box">
//             <h2>Login</h2>
//             <p>Welcome Happy to See U!!!!</p>
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
//                 <button onClick={() => (window.location.href = "/signup")}>
//                   Sign up
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Login;

// import React, { useState } from "react";
// import axios from "axios";
// import "./Login.css";

// function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false); // 👈 NEW STATE

//   // const login = async (e) => {
//   //   e.preventDefault();
//   //   try {
//   //     const res = await axios.post("http://localhost:5000/login", {
//   //       email,
//   //       password,
//   //     });
//   //     alert(res.data.message);
//   //   } catch (err) {
//   //     alert(err.response?.data?.message || "Login failed");
//   //     console.error("Login error:", err);
//   //   }
//   // };

//  const login = async (e) => {
//   e.preventDefault();
//   try {
//     const res = await axios.post("http://localhost:5000/login", {
//       email,
//       password,
//     });

//     console.log("Login response:", res.data);

//     if (res.data?.UID) {
//       localStorage.setItem("user", JSON.stringify({ UID: res.data.UID }));

//       alert(res.data.message);
//       window.location.href = "/"; // Navigate instead of reload
//     } else {
//       alert("Login failed: UID not found.");
//     }
//   } catch (err) {
//     alert(err.response?.data?.message || "Login failed");
//     console.error("Login error:", err);
//   }
// };



//   return (
//     <>
//       <header className="login-header">Snippet</header>
//       <div className="login-wrapper">
//         <div className="login-image">
//           <div className="login-box">
//             <h2>Login</h2>
//             <p>Welcome Happy to See U!!!!</p>
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
//                   type={showPassword ? "text" : "password"} // 👈 Toggle type
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
//                 <button>Sign up</button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
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

      if (res.data?.UID) {
        localStorage.setItem("user", JSON.stringify({ UID: res.data.UID }));
        alert(res.data.message);
        navigate("/"); // 👈 Better than window.location.href
      } else {
        alert("Login failed: UID not found.");
      }
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
                <button onClick={() => navigate("/signup")}>Sign up</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
