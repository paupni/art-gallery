import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ArtistContext } from "../../context/ArtistContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const ArtworkEdit = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("unclassified");
  const [desc, setDesc] = useState("");
  const [thumb, setThumb] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const { currentArtist } = useContext(ArtistContext);
  const token = currentArtist?.token;

  const { id } = useParams();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [navigate, token]);

  const categories = ["unclassified", "painting", "sculpture", "video"];

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
  ];

  useEffect(() => {
    const getArtwork = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/artworks/${id}`
        );
        setTitle(response.data.title);
        setDesc(response.data.description);
        setCategory(response.data.category);
      } catch (err) {
        console.log(err);
      }
    };

    getArtwork();
  }, [id]);

  const editArtwork = async (e) => {
    e.preventDefault();

    const artworkData = new FormData();
    artworkData.set("title", title);
    artworkData.set("category", category);
    artworkData.set("description", desc);
    artworkData.set("thumb", thumb);

    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_BASE_URL}/artworks/${id}`,
        artworkData,
        { withCredentials: true, headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.status === 200) {
        navigate("/");
      }
    } catch (err) {
      setError(err?.response?.data?.message);
    }
  };

  return (
    <section className="page">
      <div className="container artwork-upload">
        <h2>Edit artwork</h2>
        {error && <p className="form-error-msg">{error}</p>}
        <form onSubmit={editArtwork}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoFocus
          />
          <select
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((cat) => (
              <option key={cat}>{cat}</option>
            ))}
          </select>
          <input
            type="file"
            onChange={(e) => setThumb(e.target.files[0])}
            accept="image/*"
          />
          <p>Description of your artwork</p>
          <div>
            <ReactQuill
              modules={modules}
              formats={formats}
              value={desc}
              onChange={setDesc}
            />
          </div>
          {/* <textarea
            type="text"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          ></textarea> */}
          <button type="submit" className="btn">
            Update
          </button>
        </form>
      </div>
    </section>
  );
};

export default ArtworkEdit;
