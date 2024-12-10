import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { DateTime } from 'luxon'

const Artist = ({artistId, createdAt}) => {
  const [artist, setArtist] = useState({})
  
  
  useEffect(() => {
    const getArtist = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/artists/${artistId}`);
        setArtist(response?.data);
      } catch (err) {
        console.log(err);
        
      }
    }

    getArtist()
  }, [artistId])

  
  return (
    <Link to={`/artists/${artistId}`}>
        <div className='artist-avatar'>
            <img className='avatar' src={`${process.env.REACT_APP_ASSETS_URL}/uploads/${artist?.avatar}`} alt='' />
            <h5>Artist: {artist.name} {artist.surname}</h5>
            <p>Created at: {DateTime.now(createdAt).toFormat('MM-dd-yyyy')}</p>
        </div>
    </Link>
  )
}

export default Artist
