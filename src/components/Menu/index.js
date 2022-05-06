import React, { useState, useContext, useEffect } from 'react'
import Button from '@mui/material/Button';
import FilterListIcon from '@mui/icons-material/FilterList';

import AllPostsContext from '../../contexts/AllPostsContext'
import PostsContext from '../../contexts/PostsContext'
import UserContext from '../../contexts/UserContext';
import { sort } from '../../hooks/sort'
import { useApi } from '../../hooks/useApi';
import './index.css';

export const Menu = () => {
  const api = useApi();
  const { sortByDatehook, sortByLikeshook, sortByTitlehook, sortByFavorites, sortByMyPosts } = sort();
  const { posts, setPosts } = useContext(AllPostsContext);
  const { setPostsOnPage } = useContext(PostsContext);
  const { myUser } = useContext(UserContext);
  const [sortDate, setSortDate] = useState(true); //имеет значения up, down, false
  const [sortLikes, setSortLikes] = useState(); //имеет значения up, down, false
  const [sortTitle, setSortTitle] = useState(); //имеет значения up, down, false
  const [allPostsLocal, setAllPostsLocal] = useState(posts);

  useEffect(() => {
    sortByDate();
  }, [posts])

  const sortByDate = () => {
    setSortDate((prevState) => prevState === 'down' ? 'up' : 'down')
    setSortLikes(false);
    setSortTitle(false);
    setPosts((prevState) => {
      let newSort = sortByDatehook(sortDate, prevState)
      setPostsOnPage(newSort?.slice(0, 12));
      return newSort
    })
  }

  const sortByLikes = () => {
    setSortLikes((prevState) => prevState === 'up' ? 'down' : 'up')
    setSortDate(false);
    setSortTitle(false);
    setPosts((prevState) => {
      let newSort = sortByLikeshook(sortLikes, prevState)
      setPostsOnPage(newSort?.slice(0, 12));
      return newSort
    })
  }

  const sortByTitle = () => {
    setSortTitle((prevState) => prevState === 'up' ? 'down' : 'up')
    setSortDate(false);
    setSortLikes(false);
    setPosts((prevState) => {
      let newSort = sortByTitlehook(sortTitle, prevState)
      setPostsOnPage(newSort?.slice(0, 12));
      return newSort
    })
  }

  const favoritePosts = () => {
    setSortDate('down');
    console.log(allPostsLocal)
    setPosts((prevState) => {
      let newSort = sortByFavorites(prevState)
      setPostsOnPage(newSort?.slice(0, 12));
      return newSort
    })
  }

  const myPosts = () => {
    setSortDate('down');
    setPosts((prevState) => {
      let newSort = sortByMyPosts(prevState, myUser)
      setPostsOnPage(newSort?.slice(0, 12));
      return newSort
    })
  }

  const allPosts = () => {
    return api.getData('posts')
      .then((value) => {
        setPosts(value);
      })
      .catch((err) => console.log(err))
  }

  return (
    <div className='menu'>
      <div className='sort'>
        <Button onClick={sortByDate}>{sortDate && <FilterListIcon className={('sort__icon-' + sortDate)} />}По дате</Button>
        <Button onClick={sortByLikes}>{sortLikes && <FilterListIcon className={('sort__icon-' + sortLikes)} />}По популярности</Button>
        <Button onClick={sortByTitle}>{sortTitle && <FilterListIcon className={('sort__icon-' + sortTitle)} />}По заголовку</Button>

      </div>
      <div>
        <Button onClick={myPosts}>Мои посты</Button>
        <Button onClick={favoritePosts}>Избранное</Button>
        <Button onClick={allPosts}>Все посты</Button>

      </div>
    </div>
  )
}
