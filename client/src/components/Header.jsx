import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { ArtistContext } from "../context/ArtistContext";

const Header = () => {
  const { currentArtist } = useContext(ArtistContext);

  return (
    <nav>
      <div className="nav-container">
        <Link to="/" className="logo">
          <span
            style={{
              fontWeight: 700,
            }}
          >
            PA
          </span>{" "}
          Art Gallery
        </Link>
        {currentArtist?.id && (
          <ul className="nav-menu">
            <li>
              <Link to="/artists">Artists</Link>
            </li>
            <li>
              <Link to="/categories">Categories</Link>
            </li>
            <li>
              <Link to={`/profile/${currentArtist.id}`}>Edit profile</Link>
            </li>
            <li>
              <Link to="/upload">Upload artwork</Link>
            </li>
            <li>
              <Link to="/logout">Logout</Link>
            </li>
          </ul>
        )}
        {!currentArtist?.id && (
          <ul className="nav-menu">
            <li>
              <Link to="/artists">Artists</Link>
            </li>
            <li>
              <Link to="/categories">Categories</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Header;
