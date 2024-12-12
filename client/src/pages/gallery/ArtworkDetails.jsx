import React, { useContext, useEffect, useState } from "react";
import Artist from "../artists/Artist";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import { ArtistContext } from "../../context/ArtistContext";
import ArtworkDelete from "../profile/ArtworkDelete";
import Loader from "../../components/Loader";
import axios from "axios";

const ArtworkDetails = () => {
  const { id } = useParams();
  const [artwork, setArtwork] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { currentArtist } = useContext(ArtistContext);

  useEffect(() => {
    const getArtwork = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/artworks/${id}`
        );
        setArtwork(response.data);
      } catch (err) {
        setError(err);
      }
      setIsLoading(false);
    };

    getArtwork();
  }, [id]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section className="page artwork-details">
      {error && <p className="form-error-mgs">{error}</p>}
      {artwork && (
        <>
          <div className="artwork-details-left">
            <div className="artwork-details-left-inner">
              <img
                className="artwork-details-image"
                src={`${process.env.REACT_APP_ASSETS_URL}/uploads/${artwork.thumb}`}
                alt=""
              />
            </div>
          </div>
          <div className="artwork-details-right">
            <div className="artwork-details-right-inner">
              <div className="artwork-details-content">
                <h1>{artwork.title}</h1>
                {/* <p>{artwork.description}</p> */}
                <p
                  dangerouslySetInnerHTML={{ __html: artwork.description }}
                ></p>
                <Artist
                  artistId={artwork.creator}
                  createdAt={artwork.createdAt}
                />

                {currentArtist?.id === artwork?.creator && (
                  <div>
                    <Link
                      to={`/artworks/${artwork?._id}/edit`}
                      className="btn btn-artwork-edit"
                    >
                      Edit
                    </Link>
                    <ArtworkDelete artworkId={id} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default ArtworkDetails;
