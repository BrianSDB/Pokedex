import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();
  function handleSubmit(e) {
    e.preventDefault();
    axios
      .post("http://localhost:8000/signup", { name, email, password })
      .then((result) => {
        navigate("/login");
        console.log(result);
        alert("Account created successfully!");
      })
      .catch((err) => console.error(err));
  }

  return (
    <>
      <div className="signup-container">
        <div className="signup-header">
          <h2>Sign Up</h2>
        </div>
        <div className="signup-content">
          <input
            type="text"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
          />
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

        <input type="submit" className="signup-button" onClick={handleSubmit} />
        <div className="signup-redirect">
          <p>
            Already have an account? <Link to="/login">Login here!</Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignUp;
