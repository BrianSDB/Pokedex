import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

/* eslint-disable react/jsx-no-comment-textnodes */
const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  function handleSubmit(e) {
    e.preventDefault();
    window.localStorage.setItem("isLoggedIn", true);
    axios
      .post("http://localhost:8000/login", { email, password })
      .then((result) => {
        console.log(result);
        if (result.data === "Success") {
          navigate("/Pokemon", { state: { id: email } });
          alert("Login Successful");
        } else {
          alert("Password or Email is incorrect");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }
  return (
    <>
      <div className="login-container">
        <div className="login-header">
          <h2>Login</h2>
        </div>
        <div className="login-content">
          <input
            type="email"
            placeholder="Email address"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit" className="login-button" onClick={handleSubmit}>
          Submit
        </button>
        <div className="login-redirect">
          <p>
            Do not have an account? <Link to="/signup">Create on here!</Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
