import "./App.css";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import CandidateDashboard from "./components/CandidateDashboard";
import EmployerDashboard from "./components/EmployerDashboard";
import AdminDashboard from "./components/AdminDashboard";
import ContactUs from "./components/ContactUs";
import ClientInquiry from "./components/ClientInquiry";
import HeroBackground from "./components/HeroBackground";
import Feedback from "./components/Feedback";
import Rating from "./components/Rating";
import Blacklist from "./components/Blacklist";
import PricingPlans from "./components/PricingPlans";
import Chat from "./components/Chat";
import HRDashboard from "./components/HRDashboard";
import API_BASE_URL from "./config";
import Swal from "sweetalert2";

import {
  FaGlobe,
  FaDatabase,
  FaLayerGroup,
  FaCode,
  FaChartBar,
  FaCube,
  FaMicrochip,
  FaBriefcase,
  FaShieldAlt,
  FaPaperPlane,
  FaPalette,
  FaVideo,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhone,
  FaLinkedin,
  FaGithub,
  FaSearch,
  FaFileAlt,
  FaRoute,
  FaTwitter,
  FaUserTie,
  FaUsers,
  FaBell,
  FaComments,
  FaStar,
  FaMoneyBillWave,
  FaCog
} from "react-icons/fa";

import CountUp from "react-countup";

function App() {

  const [currentPage, setCurrentPage] = useState("home");

  const dropdownRef = useRef(null);
  useEffect(() => {

    const handleClickOutside = (event) => {

      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setActiveMenu(null);
      }

    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };

  }, []);

  const [activeMenu, setActiveMenu] = useState(null);

  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });


  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    role: ""
  });


  const [message, setMessage] = useState("");


  const [isSuccess, setIsSuccess] = useState(false);


  const [showRegister, setShowRegister] = useState(false);


  const [loggedInUser, setLoggedInUser] = useState(null);

  const logout = () => {

    setLoggedInUser(null);

    setMessage("");

    setIsSuccess(false);

    setShowRegister(false);

  };

  const handleProtectedClick = (featureName) => {

    if (!loggedInUser) {

      Swal.fire({
        icon: "warning",
        title: "Login Required",
        text: `Please login first to access ${featureName}`,
        confirmButtonText: "Login Now"
      });

      return;
    }

  };

  const handleChange = (e) => {

    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    });

  };


  const handleRegisterChange = (e) => {

    setRegisterData({
      ...registerData,
      [e.target.name]: e.target.value
    });

  };

  const handleLogin = () => {

    axios.post(
      `${API_BASE_URL}/users/login`,
      loginData
    )

      .then(response => {


        if (response.data === "User not registered") {

          setMessage("User not registered");
          setIsSuccess(false);

        }


        else if (response.data === "Invalid Password") {

          setMessage("Invalid Password");
          setIsSuccess(false);

        }


        else {

          setMessage("Login Success");
          setIsSuccess(true);

          setLoggedInUser(response.data);

        }

      })

      .catch(error => {

        console.log(error);

      });

  };


  const handleRegister = () => {

    axios.post(
      `${API_BASE_URL}/users/register`,
      registerData
    )

      .then(response => {

        alert("Registration Successful. Please Login.");

        setRegisterData({
          name: "",
          email: "",
          password: "",
          role: ""
        });

        setLoginData({
          email: "",
          password: ""
        });

        setMessage("");

        setIsSuccess(false);

        setShowRegister(false);

        // Refresh page automatically
        window.location.reload();

      })

      .catch(error => {

        console.log(error);

        alert("Registration Failed");

      });

  };


  if (
    loggedInUser &&
    loggedInUser.role === "candidate"
  ) {

    return (

      <CandidateDashboard
        user={loggedInUser}
        logout={logout}
      />

    );

  }


  if (
    loggedInUser &&
    loggedInUser.role === "employer"
  ) {

    return (

      <EmployerDashboard
        user={loggedInUser}
        logout={logout}
      />

    );

  }

  if (
    loggedInUser &&
    loggedInUser.role === "admin"
  ) {

    return (

      <AdminDashboard
        user={loggedInUser}
        logout={logout}
      />

    );

  }



  return (

    <div className="container">

      <div className="overlay">

        { }

        <nav className="navbar">

          <div
            className="sidebar-logo"
            onClick={() => {
              setCurrentPage("home");
              setActiveMenu(null);
            }}
          >

            <img
              src="/logo.png"
              alt="Ardhnarishwar Logo"
              className="logo-img"
            />

            <h1 className="mobile-logo">
              Ardhnarishwar
            </h1>

          </div>

          <ul
            className="nav-links"
            ref={dropdownRef}
          >

            <li
              onClick={() => {
                setCurrentPage("home");
                setActiveMenu(null);
              }}
            >
              Home
            </li>

            <li
              onClick={() => handleProtectedClick("Jobs")}
            >
              Jobs
            </li>

            {/* FOR CANDIDATES */}

            <li className="dropdown">

              <div
                className="dropdown-title"
                onClick={() =>
                  setActiveMenu(
                    activeMenu === "candidate"
                      ? null
                      : "candidate"
                  )
                }
              >
                For Candidates {activeMenu === "candidate" ? "▲" : "▼"}
              </div>

              {activeMenu === "candidate" && (

                <div className="dropdown-menu">

                  <div
                    className="dropdown-item"
                    onClick={() => handleProtectedClick("Find Job")}
                  >
                    <div className="icon-box-menu">
                      <FaSearch />
                    </div>
                    <span>Find Job</span>
                  </div>

                  <div
                    className="dropdown-item"
                    onClick={() => handleProtectedClick("CV Builder")}
                  >
                    <div className="icon-box-menu">
                      <FaFileAlt />
                    </div>
                    <span>CV Builder</span>
                  </div>

                  <div
                    className="dropdown-item"
                    onClick={() => handleProtectedClick("AI Job Matching")}
                  >
                    <div className="icon-box-menu">
                      <FaMicrochip />
                    </div>
                    <span>AI Job Matching</span>
                  </div>

                  <div
                    className="dropdown-item"
                    onClick={() => handleProtectedClick("Resume Scanner")}
                  >
                    <div className="icon-box-menu">
                      <FaFileAlt />
                    </div>
                    <span>Resume Scanner</span>
                  </div>

                </div>

              )}

            </li>

            {/* TOOLS */}

            <li className="dropdown">

              <div
                className="dropdown-title"
                onClick={() =>
                  setActiveMenu(
                    activeMenu === "tools"
                      ? null
                      : "tools"
                  )
                }
              >
                Tools {activeMenu === "tools" ? "▲" : "▼"}
              </div>

              {activeMenu === "tools" && (

                <div className="dropdown-menu">

                  <div
                    className="dropdown-item"
                    onClick={() => handleProtectedClick("JD Maker")}
                  >
                    <div className="icon-box-menu">
                      <FaBriefcase />
                    </div>

                    <span>JD Maker</span>
                  </div>

                  <div
                    className="dropdown-item"
                    onClick={() => handleProtectedClick("AI Interview")}
                  >
                    <div className="icon-box-menu">
                      <FaMicrochip />
                    </div>

                    <span>AI Interview</span>
                  </div>

                  <div
                    className="dropdown-item"
                    onClick={() => handleProtectedClick("CV Shortlisted")}
                  >
                    <div className="icon-box-menu">
                      <FaFileAlt />
                    </div>

                    <span>CV Shortlisted</span>
                  </div>

                  <div
                    className="dropdown-item"
                    onClick={() => handleProtectedClick("Resume Matching")}
                  >
                    <div className="icon-box-menu">
                      <FaSearch />
                    </div>

                    <span>Resume Matching</span>
                  </div>

                  <div
                    className="dropdown-item"
                    onClick={() => handleProtectedClick("AI Recruiter")}
                  >
                    <div className="icon-box-menu">
                      <FaUsers />
                    </div>

                    <span>AI Recruiter</span>
                  </div>

                </div>

              )}

            </li>

            {/* MORE */}

            <li className="dropdown">

              <div
                className="dropdown-title"
                onClick={() =>
                  setActiveMenu(
                    activeMenu === "more"
                      ? null
                      : "more"
                  )
                }
              >
                More {activeMenu === "more" ? "▲" : "▼"}
              </div>

              {activeMenu === "more" && (

                <div className="dropdown-menu">

                  <div className="dropdown-item">
                    <div className="icon-box-menu">
                      <FaBell />
                    </div>
                    <span>Notifications</span>
                  </div>

                  <div
                    className="dropdown-item"
                    onClick={() => {
                      setCurrentPage("contact");
                      setActiveMenu(null);
                    }}
                  >
                    <div className="icon-box-menu">
                      <FaPhone />
                    </div>

                    <span>Contact Us</span>
                  </div>

                  <div
                    className="dropdown-item"
                    onClick={() => {
                      setCurrentPage("clientInquiry");
                      setActiveMenu(null);
                    }}
                  >
                    <div className="icon-box-menu">
                      <FaComments />
                    </div>

                    <span>Client Inquiry</span>
                  </div>

                  <div
                    className="dropdown-item"
                    onClick={() => {
                      setCurrentPage("feedback");
                      setActiveMenu(null);
                    }}
                  >
                    <div className="icon-box-menu">
                      <FaComments />
                    </div>

                    <span>Feedback</span>
                  </div>

                  <div
                    className="dropdown-item"
                    onClick={() => {
                      setCurrentPage("rating");
                      setActiveMenu(null);
                    }}
                  >
                    <div className="icon-box-menu">
                      <FaStar />
                    </div>

                    <span>Rating</span>
                  </div>

                  <div
                    className="dropdown-item"
                    onClick={() => {
                      setCurrentPage("blacklist");
                      setActiveMenu(null);
                    }}
                  >
                    <div className="icon-box-menu">
                      <FaShieldAlt />
                    </div>

                    <span>Blacklist</span>
                  </div>

                  <div
                    className="dropdown-item"
                    onClick={() => {
                      setCurrentPage("pricing");
                      setActiveMenu(null);
                    }}
                  >
                    <div className="icon-box-menu">
                      <FaMoneyBillWave />
                    </div>

                    <span>Pricing Plans</span>
                  </div>

                  <div
                    className="dropdown-item"
                    onClick={() => {
                      setCurrentPage("chat");
                      setActiveMenu(null);
                    }}
                  >
                    <div className="icon-box-menu">
                      <FaComments />
                    </div>

                    <span>Chat</span>
                  </div>

                  <div className="dropdown-item">
                    <div className="icon-box-menu">
                      <FaCog />
                    </div>
                    <span>Auto Reply</span>
                  </div>

                  <div
                    className="dropdown-item"
                    onClick={() => {

                      setCurrentPage("hrDashboard");
                      setActiveMenu(null);

                    }}
                  >

                    <div className="icon-box-menu">
                      <FaChartBar />
                    </div>

                    <span>HR Dashboard</span>

                  </div>

                </div>

              )}

            </li>

          </ul>

          <div></div>

        </nav>



        {
          currentPage === "home" ? (

            <HeroBackground>
              <div className="hero-section">

                <div className="left">

                  <span className="badge">
                    🚀 AI Powered Career Platform
                  </span>

                  <h1>
                    Empowering Careers Through
                    <span className="highlight">
                      {" "}AI & Human Potential
                    </span>
                  </h1>

                  <p>
                    Discover jobs, connect with recruiters,
                    build resumes and accelerate your career
                    with intelligent tools.
                  </p>

                  <div className="hero-buttons">

                    <button className="primary-btn">
                      Explore Jobs
                    </button>

                    <button className="secondary-btn">
                      Learn More
                    </button>

                  </div>

                  <div className="stats">

                    <div>
                      <h3>
                        <CountUp end={10} duration={3} />k+
                      </h3>
                      <p>Candidates</p>
                    </div>

                    <div>
                      <h3>
                        <CountUp end={500} duration={3} />+
                      </h3>
                      <p>Companies</p>
                    </div>

                    <div>
                      <h3>
                        <CountUp end={95} duration={3} />%
                      </h3>
                      <p>Success Rate</p>
                    </div>

                  </div>

                </div>

                { }

                <div className="right">

                  <div className="login-card">

                    {
                      showRegister ?

                        // REGISTER FORM

                        <>

                          <h2>Register</h2>

                          <input
                            type="text"
                            name="name"
                            placeholder="Enter Name"
                            onChange={handleRegisterChange}
                          />

                          <input
                            type="email"
                            name="email"
                            placeholder="Enter Email"
                            onChange={handleRegisterChange}
                          />

                          <input
                            type="password"
                            name="password"
                            placeholder="Enter Password"
                            onChange={handleRegisterChange}
                          />

                          <select
                            name="role"
                            onChange={handleRegisterChange}
                          >

                            <option value="">
                              Select Role
                            </option>

                            <option value="candidate">
                              Candidate
                            </option>

                            <option value="employer">
                              Employer
                            </option>

                          </select>

                          <button
                            className="login-btn"
                            onClick={handleRegister}
                          >
                            Register
                          </button>

                          <p className={
                            isSuccess
                              ? "success-message"
                              : "message"
                          }>
                            {message}
                          </p>

                          <p>

                            Already have an account?

                            <span onClick={() => setShowRegister(false)}>
                              Login
                            </span>

                          </p>

                        </>

                        :

                        // LOGIN FORM

                        <>

                          <h2>Login</h2>

                          <input
                            type="email"
                            name="email"
                            placeholder="Enter Email"
                            onChange={handleChange}
                          />

                          <input
                            type="password"
                            name="password"
                            placeholder="Enter Password"
                            onChange={handleChange}
                          />

                          <button
                            className="login-btn"
                            onClick={handleLogin}
                          >
                            Login
                          </button>

                          <p className={
                            isSuccess
                              ? "success-message"
                              : "message"
                          }>
                            {message}
                          </p>

                          <p>

                            Don’t have an account?

                            <span onClick={() => setShowRegister(true)}>
                              Register
                            </span>

                          </p>

                        </>
                    }

                  </div>

                </div>

              </div>
            </HeroBackground>
          ) : currentPage === "contact" ? (

            <ContactUs
              goBack={() => setCurrentPage("home")}
            />

          ) : null
        }

      </div>


      {currentPage === "home" && (
        <section className="categories-section">

          <div className="category-header">
            <span className="category-badge">
              Browse by Category
            </span>

            <h2>
              Explore <span>Top Job Categories</span>
            </h2>

            <p>
              Find opportunities across the most in-demand tech and creative fields
            </p>
          </div>

          <div className="categories-grid">

            <div className="category-card blue">
              <div className="icon-box"><FaGlobe /></div>
              <h4>Frontend Developer</h4>
            </div>

            <div className="category-card green">
              <div className="icon-box"><FaDatabase /></div>
              <h4>Backend Developer</h4>
            </div>

            <div className="category-card purple">
              <div className="icon-box"><FaLayerGroup /></div>
              <h4>Full Stack Developer</h4>
            </div>

            <div className="category-card indigo">
              <div className="icon-box"><FaCode /></div>
              <h4>MERN Developer</h4>
            </div>

            <div className="category-card orange">
              <div className="icon-box"><FaChartBar /></div>
              <h4>Data Scientist</h4>
            </div>

            <div className="category-card dark">
              <div className="icon-box"><FaCube /></div>
              <h4>DevOps Engineer</h4>
            </div>

            <div className="category-card pink">
              <div className="icon-box"><FaMicrochip /></div>
              <h4>Machine Learning</h4>
            </div>

            <div className="category-card violet">
              <div className="icon-box"><FaBriefcase /></div>
              <h4>AI Engineer</h4>
            </div>

            <div className="category-card red">
              <div className="icon-box"><FaShieldAlt /></div>
              <h4>Cyber Security</h4>
            </div>

            <div className="category-card cyan">
              <div className="icon-box"><FaPaperPlane /></div>
              <h4>Product Manager</h4>
            </div>

            <div className="category-card magenta">
              <div className="icon-box"><FaPalette /></div>
              <h4>UI/UX Designer</h4>
            </div>

            <div className="category-card yellow">
              <div className="icon-box"><FaVideo /></div>
              <h4>Video Editor</h4>
            </div>

          </div>

        </section>
      )}



      {/* Client Inquiry */}

      {currentPage === "clientInquiry" && (
        <ClientInquiry />
      )}

      {currentPage === "feedback" && (
        <Feedback />
      )}

      {currentPage === "rating" && (
        <Rating />
      )}

      {currentPage === "blacklist" && (
        <Blacklist />
      )}

      {currentPage === "pricing" && (
        <PricingPlans />
      )}

      {currentPage === "chat" && (
        <Chat />
      )}

      {currentPage === "hrDashboard" && (
        <HRDashboard />
      )}
      <footer className="footer">

        <div className="footer-container">

          <div className="footer-section">

            <img
              src="/logo.png"
              alt="Ardhnarishwar"
              className="footer-logo"
            />

            <h2>Ardhnarishwar</h2>

            <p>
              Empowering careers through AI and human potential.
              Connect talent with opportunities.
            </p>

          </div>

          <div className="footer-section">

            <h3>Quick Links</h3>

            <ul>
              <li>Home</li>
              <li>Jobs</li>
              <li>Candidates</li>
              <li>Recruiters</li>
              <li>AI Tools</li>
            </ul>

          </div>

          <div className="footer-section">

            <h3>For Employers</h3>

            <ul>
              <li>Post Job</li>
              <li>Manage Jobs</li>
              <li>Applications</li>
              <li>Candidate Search</li>
            </ul>

          </div>

          <div className="footer-section">

            <h3>CONTACT</h3>

            <p>
              <FaMapMarkerAlt className="footer-icon" />
              Noida Sector 63, Uttar Pradesh, India
            </p>

            <p>
              <FaEnvelope className="footer-icon" />
              support@ardhnarishwar.com
            </p>

            <p>
              <FaPhone className="footer-icon" />
              +91 XXXXX XXXXX
            </p>

          </div>

          <div className="social-icons">

            <a href="#">
              <FaGithub />
            </a>

            <a href="#">
              <FaLinkedin />
            </a>

            <a href="#">
              <FaTwitter />
            </a>

          </div>

          <hr />

          <div className="footer-bottom">

            © 2026 Ardhnarishwar. All Rights Reserved.

          </div>

        </div>

      </footer>

    </div>


  );
}



export default App;