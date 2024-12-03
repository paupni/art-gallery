import React from 'react'
import Artist from '../artists/Artist'
import { Link } from 'react-router-dom'
import Thumb from '../../assets/artwork-1.jpg'

const ArtworkDetails = () => {
  return (
    <section className='container artwork-details'>
      <img className='artwork-image' src={Thumb} alt=''/>
      <div className='artwork-desc'>
        <h1>Title</h1>
        <div>
        </div>
          <h3>Technique</h3>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil quos possimus quisquam repellat suscipit commodi consectetur eum provident incidunt quasi! Ab, fuga voluptas inventore praesentium repudiandae id dignissimos odit explicabo?</p>
          <div className='btn-artwork-details'>
          <Artist />
          <Link to={`/artwork/edit`} className='btn btn-artwork-edit'>Edit</Link>
          <Link to={`/artwork/delete`} className='btn btn-artwork-delete'>Delete</Link>
        </div>
      </div>
    </section>
  )
}

export default ArtworkDetails

