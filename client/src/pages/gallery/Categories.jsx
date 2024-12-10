import React from 'react'
import { Link } from "react-router"


const Categories = () => {
    const categories = ['unclassyfied', 'painting', 'sculpture', 'video']

  return (
    <div className='container'>
        {
            categories.map((cat) => {
                return(
                    <div>
                        <Link to={`/artworks/categories/${cat}`}>{cat}</Link>
                    </div>
                )
            })
        }
    </div>
  )
}

export default Categories
