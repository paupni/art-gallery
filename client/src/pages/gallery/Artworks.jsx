import React, { useEffect, useState } from "react";
import Artwork from "./Artwork";
import Loader from "../../components/Loader";
import axios from "axios";

const Artworks = () => {
  const [artworks, setArtworks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchArtworks = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/artworks`
        );
        setArtworks(response?.data);
      } catch (err) {
        console.log(err);
      }

      setIsLoading(false);
    };

    fetchArtworks();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="page">
      {artworks.length > 0 ? (
        <div className="container artworks">
          {artworks.map(
            ({
              _id: id,
              thumb,
              category,
              title,
              description,
              creator,
              createdAt,
            }) => (
              <Artwork
                key={id}
                artworkId={id}
                thumb={thumb}
                category={category}
                title={title}
                desc={description}
                artistId={creator}
                createdAt={createdAt}
              />
            )
          )}
        </div>
      ) : (
        <h2 className="container">No artworks found</h2>
      )}
    </div>
  );
};

export default Artworks;
