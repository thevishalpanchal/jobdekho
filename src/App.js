import "./App.css";
import axios from "axios";
import { useState } from "react";
import CandidateDashboard from "./components/CandidateDashboard";
import EmployerDashboard from "./components/EmployerDashboard";
import AdminDashboard from "./components/AdminDashboard";

function App() {

  
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
      "http://localhost:8085/users/login",
      loginData
    )

    .then(response => {

     
      if(response.data === "User not registered"){

        setMessage("User not registered");
        setIsSuccess(false);

      }

     
      else if(response.data === "Invalid Password"){

        setMessage("Invalid Password");
        setIsSuccess(false);

      }

      
      else{

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
      "http://localhost:8085/users/register",
      registerData
    )

    .then(response => {

      setMessage("Registration Successful");

      setIsSuccess(true);

      setShowRegister(false);

       setRegisterData({
        name:"",
        email:"",
        password:"",
        role:""
    });

    })

    .catch(error => {

      console.log(error);

    });

  };

  
  if(
    loggedInUser &&
    loggedInUser.role === "candidate"
){

    return (

        <CandidateDashboard
            user={loggedInUser}
            logout={logout}
        />

    );

}


if(
    loggedInUser &&
    loggedInUser.role === "employer"
){

    return (

        <EmployerDashboard
            user={loggedInUser}
            logout={logout}
        />

    );

}

if(
    loggedInUser &&
    loggedInUser.role === "admin"
){

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

        {}

        <nav className="navbar">

          <h2>JobDekho</h2>

        </nav>

        {}

        <div className="hero-section">

          {}

          <div className="left">

            <h1>
              Find Your Dream Job
            </h1>

            <p>
              Connect with top companies and build your future.
            </p>

          </div>

          {}

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

      </div>

    </div>

  );
}

export default App;