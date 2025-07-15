// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import './App.css';
// import Header from './Components/Header';
// import Footer from './Components/Footer';
// import Signup from './Components/Signup';
// import LandingPage from './Components/Landingpage';

// function App() {
//   return (
//     <Router>
//       <div className="App">
//         <Header />
//         <div className="main-content">
//           <Routes>
//             <Route path="/" element={<LandingPage />} />
//             <Route path="/signup" element={<Signup />} />
//           </Routes>
//         </div>
//         <Footer />
//       </div>
//     </Router>
//   );
// }

// export default App;


import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Signup from './Components/Signup';
import LandingPage from './Components/Landingpage';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <div className="signup-wrapper">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/category/:categoryName" element={<LandingPage />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
