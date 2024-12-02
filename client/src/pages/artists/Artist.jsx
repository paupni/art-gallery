import React from 'react'
import { Link } from 'react-router-dom'
import Avatar from '../../assets/1.jpg'

const Artist = () => {
  return (
    <Link to={`/posts/users/`}>
        <div className='artist-avatar'>
            <img className='avatar' src={Avatar} alt='' />
            <h5>Artist: Jane Doe</h5>
        </div>
    </Link>
  )
}

export default Artist
