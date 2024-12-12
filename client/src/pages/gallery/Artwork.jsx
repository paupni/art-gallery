import React from "react";
import { Link } from "react-router-dom";
import Artist from "../artists/Artist";
import TextTruncate from "react-text-truncate";

const Artwork = ({ artworkId, thumb, title, desc, artistId, createdAt }) => {
  const regex = /(<([^>]+)>)/gi;

  return (
    <div className="artwork">
      <Link to={`/artworks/${artworkId}`}>
        <div>
          <img
            className="artwork-thumb"
            src={`${process.env.REACT_APP_ASSETS_URL}/uploads/${thumb}`}
            alt={title}
          />
        </div>
        <div className="artwork-desc">
          <TextTruncate
            line={1}
            element="h3"
            truncateText="…"
            text={title}
            // textTruncateChild={<a href="#">Read on</a>}
          />

          <TextTruncate
            line={1}
            element="span"
            truncateText="…"
            // text={desc}
            text={desc.replace(regex, " ")}
            // textTruncateChild={<a href="#">Read on</a>}
          />
        </div>
      </Link>
      {/* <div className='category'>{category}</div> */}
      <div className="artwork-artist">
        <Artist artistId={artistId} createdAt={createdAt} />
      </div>
    </div>
  );
};

export default Artwork;
