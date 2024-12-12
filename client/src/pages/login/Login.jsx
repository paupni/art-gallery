import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import { ArtistContext } from "../../context/ArtistContext";

const Login = () => {
  const [artistData, setArtistData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { setCurrentArtist } = useContext(ArtistContext);

  const changeInputHandler = (e) => {
    setArtistData((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  const loginArtist = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/artists/login`,
        artistData
      );
      const artist = await response.data;
      setCurrentArtist(artist);
      navigate("/");
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  return (
    <section className="page">
      <div className="container login">
        <h2>Sign In</h2>
        <form className="form-login" onSubmit={loginArtist}>
          {error && <p className="form-error-mgs">{error}</p>}
          <input
            type="text"
            placeholder="Email"
            name="email"
            value={artistData.email}
            onChange={changeInputHandler}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={artistData.password}
            onChange={changeInputHandler}
          />
          <button type="submit" className="btn btn-form">
            Login
          </button>
        </form>
        <p>
          Don't have an account? <Link to="/register">Sign up</Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
