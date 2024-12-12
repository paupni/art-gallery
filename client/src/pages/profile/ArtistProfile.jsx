import React, { useState, useContext, useEffect } from "react";
import { ArtistContext } from "../../context/ArtistContext";
import { Link, useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import axios from "axios";

const ArtistProfile = () => {
  const [avatar, setAvatar] = useState(undefined);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [bio, setBio] = useState("");
  const [email, setEmail] = useState("");
  const [changePassword, setChangePassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword1, setNewPassword1] = useState("");
  const [newPassword2, setNewPassword2] = useState("");
  const [error, setError] = useState("");

  const [isAvatarTouched, setIsAvatarTouched] = useState(false);

  const { currentArtist } = useContext(ArtistContext);
  const navigate = useNavigate();
  const token = currentArtist?.token;

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [navigate, token]);

  useEffect(() => {
    const getArtist = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/artists/${currentArtist.id}`
      );
      const { name, surname, bio, email, avatar } = response.data;
      setName(name);
      setSurname(surname);
      setBio(bio);
      setEmail(email);
      setAvatar(avatar);
      // console.log(response);
    };

    getArtist();
  }, [currentArtist.id]);

  const changeAvatarHandler = async () => {
    if (avatar === undefined) {
      return;
    }

    setIsAvatarTouched(false);
    try {
      const artistData = new FormData();
      artistData.set("avatar", avatar);

      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/artists/change-avatar`,
        artistData,
        { withCredentials: true, headers: { Authorization: `Bearer ${token}` } }
      );
      setAvatar(response?.data.avatar);
    } catch (err) {
      console.log(err);
    }
  };

  const updateArtistDetails = async (e) => {
    e.preventDefault();

    try {
      const artistData = new FormData();
      artistData.set("name", name);
      artistData.set("surname", surname);
      artistData.set("bio", bio);
      artistData.set("email", email);
      artistData.set("currentPassword", currentPassword);
      artistData.set("newPassword1", newPassword1);
      artistData.set("newPassword2", newPassword2);
      artistData.set("changePassword", changePassword);

      const response = await axios.patch(
        `${process.env.REACT_APP_BASE_URL}/artists/edit-artist`,
        artistData,
        { withCredentials: true, headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 200 && changePassword) {
        navigate("/logout");
      } else if (response.status === 200 && !changePassword) {
        navigate(0);
      }
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  return (
    <section className="page">
      <div className="container artist-profile">
        <form className="artist-profile-avatar-form">
          {avatar && typeof avatar !== "object" ? (
            <img
              className="artist-profile-avatar"
              src={`${process.env.REACT_APP_ASSETS_URL}/uploads/${avatar}`}
              alt=""
            />
          ) : (
            <div className="artist-profile-no-avatar" />
          )}

          <div className="artist-profile-avatar-form-buttons">
            <input
              type="file"
              name="avatar"
              id="avatar"
              onChange={(e) => setAvatar(e.target.files[0])}
              accept="image/*"
              className="artist-profile-file-input"
            />
            <label htmlFor="avatar" onClick={() => setIsAvatarTouched(true)}>
              <div className="btn btn-profile">
                <FaEdit /> Edit Avatar
              </div>
            </label>
            {isAvatarTouched && (
              <div
                className="btn btn-profile btn-profile-confirm"
                onClick={changeAvatarHandler}
              >
                <FaCheck /> Confirm Upload
              </div>
            )}

            <Link
              to={`/myartworks/${currentArtist.id}`}
              className="btn  btn-profile"
            >
              <FaEdit /> View my posts
            </Link>
          </div>
        </form>

        <form onSubmit={updateArtistDetails}>
          {error && <p className="form-error-mgs">{error}</p>}
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoFocus
          />
          <input
            type="text"
            placeholder="Surname"
            name="surname"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
          />
          <input
            type="text"
            placeholder="Email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <textarea
            type="text"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={changePassword}
              onChange={() => {
                setChangePassword(!changePassword);
              }}
            />
            {"   "}Change Password
          </label>
          <input
            type="password"
            placeholder="Current Password"
            name="currentPassword"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="New Password"
            name="newPassword1"
            value={newPassword1}
            onChange={(e) => setNewPassword1(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            name="newPassword2"
            value={newPassword2}
            onChange={(e) => setNewPassword2(e.target.value)}
          />
          <button type="submit" className="btn btn-form">
            Update
          </button>
        </form>
      </div>
    </section>
  );
};

export default ArtistProfile;
