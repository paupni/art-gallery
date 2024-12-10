import React from 'react'
import { Link } from 'react-router-dom'
import Artist from '../artists/Artist'

const Artwork = ({artworkId, thumb, category, title, desc, artistId, createdAt}) => {
  
  return (
    <div className='artwork'>
      <Link to={`/artworks/${artworkId}`}>
        <div>
          <img src={`${process.env.REACT_APP_ASSETS_URL}/uploads/${thumb}`} alt={title} />
        </div>
        <div>
            <h3>{title}</h3>
        </div>
        <p>{desc}</p>
        <p>{category}</p>
      </Link>
      <Artist artistId={artistId} createdAt={createdAt}/>
    </div>
  )
}

export default Artwork

