import React, { useContext } from 'react'
import { Card } from '../Card'
import PostsContext from '../../contexts/PostsContext'


export const List = () => {
  const { postsOnPage } = useContext(PostsContext);

  return (
    <div>
      {postsOnPage && postsOnPage?.map((item) => (
        <Card
          key={item._id}
        post={item}
        />
      ))}
    </div>
  )
}
