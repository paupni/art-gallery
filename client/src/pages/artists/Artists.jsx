import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Loader from "../../components/Loader";

const Artists = () => {
  const [artists, setArtists] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getArtists = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/artists`
        );
        setArtists(response.data);
      } catch (err) {
        console.log(err);
      }
      setIsLoading(false);
    };
    getArtists();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="page ">
      {artists.length > 0 ? (
        <div className="container artists">
          {artists.map(({ _id: id, avatar, name, surname, artworks }) => {
            return (
              <div className="artist" key={id}>
                <Link className="artist-card" to={`/artists/${id}`}>
                  <div>
                    {avatar ? (
                      <img
                        className="artist-avatar-2"
                        src={`${process.env.REACT_APP_ASSETS_URL}/uploads/${avatar}`}
                        alt={`This is ${name}`}
                      />
                    ) : (
                      <div class="artist-avatar-no-image" />
                    )}
                  </div>
                  <h3>
                    {name} {surname}
                  </h3>
                  <p>Uploaded artworks: {artworks}</p>
                </Link>
                <Link className="btn" to={`/artworks/artists/${id}`}>
                  Artworks
                </Link>
              </div>
            );
          })}
        </div>
      ) : (
        <h2>No artists found</h2>
      )}
    </div>
  );
};

export default Artists;
