import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArtistContext } from "../../context/ArtistContext";
import axios from "axios";
import Loader from "../../components/Loader";
import ArtworkDelete from "./ArtworkDelete";

const AdminPanel = () => {
  const [artworks, setArtworks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const { currentArtist } = useContext(ArtistContext);
  const token = currentArtist?.token;

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [navigate, token]);

  useEffect(() => {
    const fetchArtworks = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/artworks/artists/${id}`
        );
        setArtworks(response.data);
      } catch (err) {
        console.log(err);
      }

      setIsLoading(false);
    };

    fetchArtworks();
  }, [id]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section className="page">
      {artworks.length ? (
        <div className="container admin-panel">
          {artworks.map((artwork) => {
            return (
              <div key={artwork.id} className="admin-panel-item">
                <img
                  src={`${process.env.REACT_APP_ASSETS_URL}/uploads/${artwork.thumb}`}
                  alt=""
                  className="admin-panel-image"
                />
                <div className="admin-panel-desc">
                  <h5>{artwork.title}</h5>
                </div>
                <div className="admin-panel-buttons">
                  <Link to={`/artworks/${artwork._id}`} className="btn">
                    View
                  </Link>
                  <Link
                    to={`/artworks/${artwork._id}/edit`}
                    className="btn btn-artwork-edit"
                  >
                    Edit
                  </Link>
                  <ArtworkDelete artworkId={artwork._id} />
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <h2 className="container admin-panel">You have no artworks yet</h2>
      )}
    </section>
  );
};

export default AdminPanel;
