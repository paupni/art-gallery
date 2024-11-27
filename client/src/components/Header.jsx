import React from 'react'
import { Link } from 'react-router-dom'
import { FaBars } from "react-icons/fa6";
import { IoCloseOutline } from "react-icons/io5";


const Header = () => {
  return (
    <nav>
      <div className='nav-container'>
        <Link to="/">
          Art Gallery
        </Link>
        <ul className="nav-menu">
          <li><Link to="/profile">Jane Doe</Link></li>
          <li><Link to="/upload">Upload artwork</Link></li>
          <li><Link to="/artists">Artists</Link></li>
          <li><Link to="/logout">Logout</Link></li>
        </ul>
        <button className="nav-toggle-btn">
          <IoCloseOutline />
        </button>
      </div>
    </nav>
  )
}

export default Header
