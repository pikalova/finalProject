import React, { useState, useEffect } from 'react'

import './App.css';
import './assets/pagination.css';

import { Header } from './components/Header';
import { Search } from './components/Search';
import { Menu } from './components/Menu';
import { List } from './components/List';
import { Footer } from './components/Footer';

import { useApi } from './hooks/useApi'

import PostsContext from './contexts/PostsContext';
import AllPostsContext from './contexts/AllPostsContext';

import Pagination from 'rc-pagination';

function App() {
  const api = useApi();
  const [posts, setPosts] = useState([]);
  const [postsOnPage, setPostsOnPage] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);


  const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem('favorites')) || []);



  useEffect(() => {
    api.getData('posts')
      .then((value) => {
        setPosts(value);
      })
      .catch((err) => console.log(err))
  }, [])

  useEffect(() => {
    let data = posts?.slice((pageNumber - 1) * 12, pageNumber * 12);
    setPostsOnPage(data);
  }, [pageNumber, posts]);
<<<<<<< HEAD

=======

>>>>>>> dfef35f129a0d503a16b1c707e73503516d213f4
  return (
    <div className="App">
      <Header>
        <Search />
      </Header>
      <AllPostsContext.Provider value={{ posts, setPosts }}>
      <PostsContext.Provider value={{ postsOnPage, setPostsOnPage }}>
        <Menu />


        <List favorites={favorites} setFavorites={setFavorites} />


        <Pagination onChange={(page) => { setPageNumber(page) }} current={pageNumber} pageSize={12} showTotal={total => `Total ${total} items`} total={posts.length} />
      </PostsContext.Provider>
      </AllPostsContext.Provider>
      <Footer />
    </div>
  );
}

export default App;
