import React, { useContext, useEffect, useState } from "react";
import { ArtistContext } from "../../context/ArtistContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const ArtworkUpload = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("unclassified");
  const [desc, setDesc] = useState("");
  const [thumb, setThumb] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { currentArtist } = useContext(ArtistContext);
  const token = currentArtist?.token;

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

  const uploadArtwork = async (e) => {
    e.preventDefault();

    const artworkData = new FormData();
    artworkData.set("title", title);
    artworkData.set("category", category);
    artworkData.set("description", desc);
    artworkData.set("thumb", thumb);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/artworks`,
        artworkData,
        { withCredentials: true, headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.status === 200) {
        navigate("/");
      }
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  return (
    <section className="page">
      <div className="container artwork-upload">
        <h2>Upload your artwork</h2>
        <form onSubmit={uploadArtwork}>
          {error && <p className="form-error-mgs">{error}</p>}
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
          <p>Description of your artwork:</p>
          <div>
            <ReactQuill
              modules={modules}
              formats={formats}
              value={desc}
              onChange={setDesc}
            />
            {/* <textarea
              type="text"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            ></textarea> */}
          </div>
          <button type="submit" className="btn btn-form">
            Upload
          </button>
        </form>
      </div>
    </section>
  );
};

export default ArtworkUpload;
