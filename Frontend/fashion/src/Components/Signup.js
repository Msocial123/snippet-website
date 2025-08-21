
// import React, { useState } from 'react';
// import './Signup.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faGoogle, faFacebookF } from '@fortawesome/free-brands-svg-icons';
// import {
//   auth,
//   googleProvider,
//   facebookProvider,
//   signInWithPopup
// } from "../firebase";

// const Signup = () => {
//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     contact: '',
//     password: '',
//     confirmPassword: ''
//   });

//   const [message, setMessage] = useState('');
//   const [success, setSuccess] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const validatePassword = (password) => {
//     return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^])[A-Za-z\d@$!%*?&#^]{8,}$/.test(password);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setSuccess(false);
//     setMessage('');

//     const { password, confirmPassword } = formData;

//     if (password !== confirmPassword) {
//       setMessage('Passwords do not match.');
//       return;
//     }

//     if (!validatePassword(password)) {
//       setMessage('Password must be 8+ characters and include uppercase, lowercase, number, and symbol.');
//       return;
//     }

//     try {
//       const res = await fetch('http://localhost:5000/api/signup', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(formData)
//       });

//       const result = await res.json();
//       setMessage(result.message);

//       if (res.ok) {
//         setSuccess(true);
//         setFormData({
//           firstName: '',
//           lastName: '',
//           email: '',
//           contact: '',
//           password: '',
//           confirmPassword: ''
//         });
//       }
//     } catch (err) {
//       setMessage('Signup failed. Please try again.');
//     }
//   };

//   const handleGoogleSignup = async () => {
//     try {
//       const result = await signInWithPopup(auth, googleProvider);
//       const user = result.user;

//       await fetch('http://localhost:5000/api/google-signup', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           firstName: user.displayName?.split(' ')[0],
//           lastName: user.displayName?.split(' ')[1] || '',
//           email: user.email,
//           contact: '',
//           googleUid: user.uid
//         })
//       });

//       setSuccess(true);
//       setMessage(`Signed up with Google as ${user.displayName}`);
//     } catch (err) {
//       console.error("Google signup error:", err);
//       setMessage('Google signup failed. Please try again.');
//     }
//   };

//   const handleFacebookSignup = async () => {
//     if (loading) return;
//     setLoading(true);

//     try {
//       const result = await signInWithPopup(auth, facebookProvider);
//       const user = result.user;

//       await fetch('http://localhost:5000/api/facebook-signup', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           firstName: user.displayName?.split(' ')[0],
//           lastName: user.displayName?.split(' ')[1] || '',
//           email: user.email,
//           contact: '',
//           facebookUid: user.uid
//         })
//       });

//       setSuccess(true);
//       setMessage(`Signed up with Facebook as ${user.displayName}`);
//     } catch (error) {
//       console.error("Facebook login error:", error);
//       if (error.code !== "auth/cancelled-popup-request") {
//         setMessage("Facebook login failed.");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="signup-container">
//       {message && (
//         <div className={`popup-message ${success ? 'success' : 'error'}`}>
//           {message}
//         </div>
//       )}
//       <h2>Sign Up</h2>
//       <form onSubmit={handleSubmit} className="signup-form">
//         <input name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} required />
//         <input name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} required />
//         <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
//         <input name="contact" placeholder="Contact" value={formData.contact} onChange={handleChange} required />
//         <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
//         <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} required />
//         <button type="submit">Sign Up</button>

//         <div className="social-buttons">
//           <button type="button" onClick={handleGoogleSignup}>
//             <FontAwesomeIcon icon={faGoogle} style={{ marginRight: '8px' }} />
//             Sign Up with Google
//           </button>

//           <button type="button" onClick={handleFacebookSignup} disabled={loading}>
//             <FontAwesomeIcon icon={faFacebookF} style={{ marginRight: '8px' }} />
//             Sign Up with Facebook
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default Signup;


import React, { useState, useEffect } from 'react';
import './Signup.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faFacebookF } from '@fortawesome/free-brands-svg-icons';
import {
  auth,
  googleProvider,
  facebookProvider,
  signInWithPopup
} from "../firebase";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    contact: '',
    password: '',
    confirmPassword: ''
  });

  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validatePassword = (password) => {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^])[A-Za-z\d@$!%*?&#^]{8,}$/.test(password);
  };

  const redirectWithMessage = (msg) => {
    localStorage.setItem("signupMessage", msg); // store message temporarily
    navigate("/landing"); // redirect
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(false);
    setMessage('');

    const { password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      setMessage('Passwords do not match.');
      return;
    }

    if (!validatePassword(password)) {
      setMessage('Password must be 8+ characters and include uppercase, lowercase, number, and symbol.');
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const result = await res.json();
      if (res.ok) {
        setSuccess(true);
        redirectWithMessage("Signup successful! Welcome to Snippet 🎉");
      } else {
        setMessage(result.message || "Signup failed. Please try again.");
      }
    } catch (err) {
      setMessage('Signup failed. Please try again.');
    }
  };

  const handleGoogleSignup = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      await fetch('http://localhost:5000/api/google-signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: user.displayName?.split(' ')[0],
          lastName: user.displayName?.split(' ')[1] || '',
          email: user.email,
          contact: '',
          googleUid: user.uid
        })
      });

      setSuccess(true);
      redirectWithMessage(`Signed up with Google as ${user.displayName}`);
    } catch (err) {
      console.error("Google signup error:", err);
      setMessage('Google signup failed. Please try again.');
    }
  };

  const handleFacebookSignup = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const result = await signInWithPopup(auth, facebookProvider);
      const user = result.user;

      await fetch('http://localhost:5000/api/facebook-signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: user.displayName?.split(' ')[0],
          lastName: user.displayName?.split(' ')[1] || '',
          email: user.email,
          contact: '',
          facebookUid: user.uid
        })
      });

      setSuccess(true);
      redirectWithMessage(`Signed up with Facebook as ${user.displayName}`);
    } catch (error) {
      console.error("Facebook login error:", error);
      if (error.code !== "auth/cancelled-popup-request") {
        setMessage("Facebook login failed.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      {message && (
        <div className={`popup-message ${success ? 'success' : 'error'}`}>
          {message}
        </div>
      )}
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit} className="signup-form">
        <input name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} required />
        <input name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <input name="contact" placeholder="Contact" value={formData.contact} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
        <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} required />
        <button type="submit">Sign Up</button>

        <div className="social-buttons">
          <button type="button" onClick={handleGoogleSignup}>
            <FontAwesomeIcon icon={faGoogle} style={{ marginRight: '8px' }} />
            Sign Up with Google
          </button>

          <button type="button" onClick={handleFacebookSignup} disabled={loading}>
            <FontAwesomeIcon icon={faFacebookF} style={{ marginRight: '8px' }} />
            Sign Up with Facebook
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
