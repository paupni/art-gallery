import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaBars } from "react-icons/fa6";
import { IoCloseOutline } from "react-icons/io5";

import { ArtistContext } from '../context/ArtistContext';


const Header = () => {
  const [isNavShowing, setIsNavShowing] = useState(window.innerWidth > 800 ? true : false);
  const {currentArtist} = useContext(ArtistContext)

  const closeNavHandler = () => {
    if(window.innerWidth < 800) {
      setIsNavShowing(false);
    } else {
      setIsNavShowing(true)
    }
  }

  return (
    <nav>
      <div className='nav-container'>
        <Link to="/" onClick={closeNavHandler}>
          Art Gallery
        </Link>
        {currentArtist?.id && isNavShowing && <ul className="nav-menu">
          <li><Link to="/artists" onClick={closeNavHandler}>Artists</Link></li>
          <li><Link to="/categories" onClick={closeNavHandler}>Categories</Link></li>
          <li><Link to={`/profile/${currentArtist.id}`} onClick={closeNavHandler}>Edit profile</Link></li>
          <li><Link to="/upload" onClick={closeNavHandler}>Upload artwork</Link></li>
          <li><Link to="/logout" onClick={closeNavHandler}>Logout</Link></li>
        </ul>}
        {!currentArtist?.id && isNavShowing && <ul className="nav-menu">
          <li><Link to="/artists" onClick={closeNavHandler}>Artists</Link></li>
          <li><Link to="/categories" onClick={closeNavHandler}>Categories</Link></li>
          <li><Link to="/login" onClick={closeNavHandler}>Login</Link></li>
        </ul>}
        <button className="nav-toggle-btn" onClick={() => setIsNavShowing(!isNavShowing)}>
          {isNavShowing ? <IoCloseOutline /> : <FaBars/>}
        </button>
      </div>
    </nav>
  )
}

export default Header
