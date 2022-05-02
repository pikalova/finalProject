import React, { useState, useEffect } from 'react'

import './App.css';
import './assets/index.less';

import { Header } from './components/Header';
import { Search } from './components/Search';
import { Menu } from './components/Menu';
import { List } from './components/List';
import { Footer } from './components/Footer';

import { useApi } from './hooks/useApi'

import PostsContext from './contexts/PostsContext';

import Pagination from 'rc-pagination';

function App() {
  const api = useApi();
  const [posts, setPosts] = useState([]);
  const [postsOnPage, setPostsOnPage] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);

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

  return (
    <div className="App">
      <Header>
        <Search />
      </Header>
      <PostsContext.Provider value={{ postsOnPage, setPostsOnPage }}>
        <Menu />
        <Pagination onChange={(page) => { setPageNumber(page) }} current={pageNumber} pageSize={12} showTotal={total => `Total ${total} items`} total={posts.length} />
        <List />
      </PostsContext.Provider>
      <Footer />
    </div>
  );
}

export default App;
