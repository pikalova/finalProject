import React, { useContext } from 'react'
import { Card } from '../Card'
import PostsContext from '../../contexts/PostsContext'
import AllPostsContext from '../../contexts/AllPostsContext'
import './index.css';

export const List = ({favorites, setFavorites}) => {
  const { postsOnPage } = useContext(PostsContext);
  const {posts} = useContext(AllPostsContext)
  //console.log(posts)

  return (
    <div className='list'>
      {postsOnPage && postsOnPage?.map((item) => (
        <Card
          key={item._id}
          post={item}
          isInFavorites={favorites.includes(item._id)}
          setFavorites={setFavorites}
        />
      ))}
    </div>
  )
}
