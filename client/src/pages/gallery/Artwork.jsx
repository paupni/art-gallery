import React from 'react'
import { Link } from 'react-router-dom'
import Artist from '../artists/Artist'

const Artwork = ({id, thumb, category, title, desc, authorID}) => {
  return (
    <div className='artwork'>
      <div>
        <img src={thumb} alt={title} />
      </div>
      <div>
        <Link to={`/artwork/${id}`}>
          <h3>{title}</h3>
        </Link>
      </div>
      <p>{desc}</p>
      <div><Artist /></div>
    </div>
  )
}

export default Artwork