import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import Loader from "../../components/Loader";
import axios from "axios";

const ArtistBio = () => {
  const { id } = useParams();
  const [artist, setArtist] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getArtist = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/artists/${id}`
        );
        setArtist(response.data);
      } catch (err) {
        setError(err);
      }
      setIsLoading(false);
    };

    getArtist();
  }, [id]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section className="page artist-bio">
      {error && <p className="form-error-mgs">{error}</p>}
      {artist && (
        <>
          <div className="artist-bio-left">
            <div className="artist-bio-left-inner">
              {artist.avatar ? (
                <img
                  className="artist-bio-image"
                  src={`${process.env.REACT_APP_ASSETS_URL}/uploads/${artist.avatar}`}
                  alt=""
                />
              ) : (
                <div className="artist-bio-no-image" />
              )}
            </div>
          </div>

          <div className="artist-bio-right">
            <div className="artist-bio-right-inner">
              <div className="artist-bio-content">
                <h1>
                  {artist.name} {artist.surname}
                </h1>
                <p>{artist.bio}</p>
                <Link className="btn" to={`/artworks/artists/${id}`}>
                  {artist.name}'s artworks: {artist.artworks}
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default ArtistBio;
