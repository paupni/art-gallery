import React, { useContext, useEffect, useState } from "react";
import { ArtistContext } from "../../context/ArtistContext";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Modal from "react-modal";
import Loader from "../../components/Loader";

const ArtworkDelete = ({ artworkId: id }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);

  const { currentArtist } = useContext(ArtistContext);
  const token = currentArtist?.token;

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      width: "500px",
      height: "180px",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [navigate, token]);

  const removeArtwork = async () => {
    setIsLoading(true);
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/artworks/${id}`,
        { withCredentials: true, headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 204) {
        if (location.pathname === `/myartworks/${currentArtist.id}`) {
          navigate(0);
        } else {
          navigate("/");
        }
      }
      setIsLoading(false);
      closeModal();
    } catch (err) {
      console.log(err);
    }
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <button className="btn btn-artwork-delete" onClick={openModal}>
        Delete
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="modal-container">
          <h3 className="modal-title">
            Are you sure you want to delete this artwork?
          </h3>
          <div className="modal-buttons">
            <Link
              className="btn btn-artwork-delete"
              onClick={() => {
                removeArtwork(id);
              }}
            >
              Delete
            </Link>
            <div className="btn" onClick={closeModal}>
              Cancel
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ArtworkDelete;
