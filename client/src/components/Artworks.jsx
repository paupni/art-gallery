import React, { useState } from 'react'
import ArtworkDetails from '../pages/gallery/ArtworkDetails'

import Thumb1 from '../assets/artwork-1.jpg';
import Thumb2 from '../assets/artwork-2.jpg';
import Thumb3 from '../assets/artwork-3.jpg';

const artworks = [
    {
        id: '1',
        thumb: Thumb1,
        category: 'painting',
        title: 'title1',
        desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        artistID: 1,
    },
    {
        id: '2',
        thumb: Thumb2,
        category: 'sculpture',
        title: 'title2',
        desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        artistID: 2,
    },
    {
        id: '3',
        thumb: Thumb3,
        category: 'video',
        title: 'title3',
        desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        artistID: 3,
    },
]


const Artworks = () => {
    const [artwork, setArtwork] = useState(artworks);

    return (
        <div className='artworks'>
            {
                artworks.map(({id, thumb, category, title, desc, authorID}) => 
                    <ArtworkDetails key={id} artworkID={id} thumb={thumb} category={category} title={title} desc={desc} authorID={authorID} />)
            }
        </div>
    )
    }

export default Artworks
