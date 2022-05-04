import React, { useState, useContext } from 'react'
import Button from '@mui/material/Button';
import FilterListIcon from '@mui/icons-material/FilterList';

import AllPostsContext from '../../contexts/AllPostsContext'
import PostsContext from '../../contexts/PostsContext'

import './index.css';

export const Menu = () => {
  const { setPosts } = useContext(AllPostsContext);
  const { setPostsOnPage } = useContext(PostsContext);
  const [sortDate, setSortDate] = useState(); //имеет значения up, down, false
  const [sortLikes, setSortLikes] = useState(); //имеет значения up, down, false
  const [sortTitle, setSortTitle] = useState(); //имеет значения up, down, false

  function sort(sortType) {
    let type = "updated_at";
    if (sortType === 'date') {
      type = "updated_at";
      setSortDate((prevState) => prevState === 'up' ? 'down' : 'up')
      setSortLikes(false);
      setSortTitle(false);
    } else if (sortType === 'title') {
      type = "title";
      setSortTitle((prevState) => prevState === 'up' ? 'down' : 'up')
      setSortDate(false);
      setSortLikes(false);
    }
    setPosts((prevState) => {
      let newSort = prevState.sort((item1, item2) => {
        if (sortDate === 'up') {
          if (item1[type] < item2[type]) {
            return 1;
          } else {
            return -1;
          }
        } else {
          if (item1[type] > item2[type]) {
            return 1;
          } else {
            return -1;
          }
        }
      })
      setPostsOnPage(newSort?.slice(0, 12));
      console.log(newSort)
      return newSort
    })
  }

  const sortByDate = (e) => {
    //const type = "updated_at"
    const type = "title"
    setSortDate((prevState) => prevState === 'up' ? 'down' : 'up')
    setSortLikes(false);
    setSortTitle(false);
    setPosts((prevState) => {
      let newSort = prevState.sort((item1, item2) => {
        if (sortDate === 'up') {
          if (item1[type] < item2[type]) {
            return 1;
          } else {
            return -1;
          }
        } else {
          if (item1[type] > item2[type]) {
            return 1;
          } else {
            return -1;
          }
        }
      })
      setPostsOnPage(newSort?.slice(0, 12));
      return newSort
    })
  }

  const sortByLikes = () => {
    setSortLikes((prevState) => prevState === 'up' ? 'down' : 'up')
    setSortDate(false);
    setSortTitle(false);
  }

  const sortByTitle = () => {
    setSortTitle((prevState) => prevState === 'up' ? 'down' : 'up')
    setSortDate(false);
    setSortLikes(false);
  }

  return (
    <div className='menu'>
      <div className='sort'>
        <Button onClick={(e) => { sort('date') }}>{sortDate && <FilterListIcon className={('sort__icon-' + sortDate)} />}По дате</Button>
        <Button onClick={(e) => { sort('likes') }}>{sortLikes && <FilterListIcon className={('sort__icon-' + sortLikes)} />}По популярности</Button>
        <Button onClick={(e) => { sort('title') }}>{sortTitle && <FilterListIcon className={('sort__icon-' + sortTitle)} />}По заголовку</Button>

      </div>
      <div>
        <Button>Мои посты</Button>
        <Button>Избранное</Button>

      </div>
    </div>
  )
}
