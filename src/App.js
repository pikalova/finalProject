import React, { useState, useEffect } from 'react'

import './App.css';
import './assets/index.less';

import { Header } from './components/Header';
import { Search } from './components/Search';
import { Logo } from './components/Logo';
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
  const [userValue, setUserValue] = useState('');
  const [myUser, setMyUser] = useState();


  const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem('favorites')) || []);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setUserValue(value);

  };

  const filterPostList = (userValue) => {
    const filteredList = posts?.filter(({ title }) => title.includes(userValue));
    setPosts(filteredList);
  };


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

  useEffect(() => {
    filterPostList(userValue);
    api.searchPost(userValue)
  }, [userValue]);

  return (
    <div className="App">
      <div>
        <Header>
          <Logo />
          <Search handleChange={handleChange} />
        </Header>
      </div>
      <AllPostsContext.Provider value={{ posts, setPosts }}>
        <PostsContext.Provider value={{ postsOnPage, setPostsOnPage }}>
          <UserContext.Provider value={{ myUser, setMyUser }}>
            <Routes>
              <Route path="/" element={
                (
                  <div>
                    <Menu />
                    <Pagination onChange={(page) => { setPageNumber(page) }} current={pageNumber} pageSize={12} showTotal={total => `Total ${total} items`} total={posts.length} />
                    <List favorites={favorites} setFavorites={setFavorites} />
                    <Pagination onChange={(page) => { setPageNumber(page) }} current={pageNumber} pageSize={12} showTotal={total => `Total ${total} items`} total={posts.length} />
                  </div>
                )
              } />
              <Route path="auth" element={<UserAuth />} />
            </Routes>
          </UserContext.Provider>
        </PostsContext.Provider>
      </AllPostsContext.Provider>
      <Footer />
    </div>

  );
}

export default App;
