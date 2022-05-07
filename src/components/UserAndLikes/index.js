import React from 'react'
import './index.css'

export const UserAndLikes = ({favorites, userName}) => {
   
    return (
        <div className='userContainer'>
            <div>Likes {favorites.length}</div>
            <div>Привет, {userName}!</div>
        </div>
    )
}
