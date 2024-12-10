import React, { useContext, useEffect, useState } from 'react'
import { ArtistContext } from '../../context/ArtistContext'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'
import Loader from '../../components/Loader'

const ArtworkDelete = ({artworkId: id}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  const {currentArtist} = useContext(ArtistContext);
  const token = currentArtist?.token;

  useEffect(() => {
    if(!token) {
      navigate('/login')
    }
  }, [navigate, token])

  const removeArtwork = async () => {
    setIsLoading(true);
    try {
      const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/artworks/${id}`, {withCredentials: true, headers: {Authorization: `Bearer ${token}`}});
      
      if (response.status === 204) {
        if(location.pathname === `/myartworks/${currentArtist.id}`) {
          navigate(0)
        } else {
          navigate('/')
        }
      }
      setIsLoading(false)
    } catch (err) {
      console.log(err);
      
    }
  }

  if (isLoading) {
    return <Loader/>
  }

  return (
    <Link className='btn btn-artwork-delete' onClick={() => removeArtwork(id)}>Delete</Link>
  )
}

export default ArtworkDelete
