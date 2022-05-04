import React, { useContext } from 'react'
import { Card } from '../Card'
import PostsContext from '../../contexts/PostsContext'
import AllPostsContext from '../../contexts/AllPostsContext'


export const List = () => {
  const { postsOnPage } = useContext(PostsContext);
  const {posts} = useContext(AllPostsContext)
  //console.log(posts)

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
