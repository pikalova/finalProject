import React, { useState, useEffect } from 'react'
import { useApi } from './hooks/useApi'
import { Routes, Route, useNavigate } from "react-router-dom";

import './App.css';
import './assets/pagination.css';
import Pagination from 'rc-pagination';

import { EditUser } from './components/EditUser';
import { CreatePost } from './components/CreatePost/index.js';
import { CreateUser } from './components/CreateUser';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { List } from './components/List';
import { Logo } from './components/Logo';
import { Menu } from './components/Menu';
import { PostInfo } from './components/PostInfo';
import { Search } from './components/Search';
import { UserAndLikes } from './components/UserAndLikes';
import { UserAuth } from './components/UserAuth';
import { useLocalStorage } from './hooks/useLocalStorage';
import { AboutUs } from './components/AboutUs';
import { Contact } from './components/Contact';

import PostsContext from './contexts/PostsContext';
import AllPostsContext from './contexts/AllPostsContext';
import UserContext from './contexts/UserContext';
//import { padding } from '@mui/system';
import Button from '@mui/material/Button';
import AddCardIcon from '@mui/icons-material/AddCard';
//import { Margin } from '@mui/icons-material';

function App() {
  const api = useApi();
  const navigate = useNavigate();
  const { readLS, writeLS, clearLS } = useLocalStorage();
  const [posts, setPosts] = useState([]);
  const [postsOnPage, setPostsOnPage] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');// поиск/запрос на бэк по постам
  const [myUser, setMyUser] = useState();
  const [userToken, setUserToken] = useState(readLS('token'));
  const [favorites, setFavorites] = useState(readLS('favorites') || []); // избранное

  useEffect(() => {
    if (userToken) {
      setUserToken(userToken);
      api.getData('posts')
        .then((value) => {
          setPosts(value);
          api.getData('users/me')
            .then((user) => {
              setMyUser(user);
              clearLS('favorites')
              value.map((item) => { if (item.likes.includes(user._id)) writeLS('favorites', item._id) });
            })
            .catch((err) => console.log(err))
        })
        .catch((err) => console.log(err))
    } else {
      navigate('auth')
    }
  }, [userToken])

  useEffect(() => {
    let data = posts?.slice((pageNumber - 1) * 12, pageNumber * 12);
    setPostsOnPage(data);
  }, [pageNumber, posts]);

  useEffect(() => {
    api.searchPost(searchQuery)
      .then((list) => setPosts(list))
      .catch((err) => console.log(err))
  }, [searchQuery]);

  const navigatToCreatePage = () => {
    navigate('posts/create')
  };

  return (
    <div className="appContainer">
      <AllPostsContext.Provider value={{ posts, setPosts }}>
        <PostsContext.Provider value={{ postsOnPage, setPostsOnPage }}>
          <UserContext.Provider value={{ myUser, setMyUser }}>
            <Header>
              <Logo />
              <Search handleChange={setSearchQuery} />
              <Button onClick={navigatToCreatePage}>New post <AddCardIcon /></Button>
              <div>
                <UserAndLikes favorites={favorites} userName={myUser?.name} />
              </div>
            </Header>
            <Routes>
              <Route path="/" element={
                <div>
                  <Menu />
                  <Pagination onChange={(page) => { setPageNumber(page) }} current={pageNumber} pageSize={12} showTotal={total => `Всего ${total} постов:`} total={posts.length}
                    style={{ display: 'flex', flexWrap: 'nowrap', justifyContent: 'center' }} />
                  <List favorites={favorites} setFavorites={setFavorites} />
                  <Pagination onChange={(page) => { setPageNumber(page) }} current={pageNumber} pageSize={12} showTotal={total => `Всего ${total} постов:`} total={posts.length}
                    style={{ display: 'flex', flexWrap: 'nowrap', justifyContent: 'center', marginTop: '10px', marginBottom: '10px' }} />
                </div>
              } />
              <Route path="posts/create" element={<CreatePost changePost={setPosts} />} />
              <Route path="posts/:itemId" element={<PostInfo changePost={setPosts} favorites={favorites} setFavorites={setFavorites} />} />
              <Route path="auth" element={<UserAuth setUserToken={setUserToken} />} />
              <Route path="createuser" element={<CreateUser setUserToken={setUserToken} />} />
              <Route path='user/edit' element={<EditUser />} />
              <Route path='about' element={<AboutUs />} />
              <Route path='contact' element={<Contact />} />
            </Routes>
          </UserContext.Provider>
        </PostsContext.Provider>
      </AllPostsContext.Provider>
      <Footer />
    </div>
  );
}

export default App;
