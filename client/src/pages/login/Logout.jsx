import React, {useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import { ArtistContext } from '../../context/ArtistContext'

const Logout = () => {
  const {setCurrentArtist} = useContext(ArtistContext);
  const navigate = useNavigate();

  setCurrentArtist(null)
  navigate('/login')

  return (
    <></>
  )
}

export default Logout
