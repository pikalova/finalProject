import React, { useEffect, useState, useContext } from 'react';
import './indexInfo.css';
import { useApi } from '../../hooks/useApi';
import { useParams, useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import { Card as CardMUI, Button } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import UserContext from '../../contexts/UserContext';
import DayJS from 'react-dayjs';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';

import { useLocalStorage } from '../../hooks/useLocalStorage';
import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';

export const PostInfo = ({ changePost, favorites, setFavorites }) => {
    const api = useApi();

    const { writeLS } = useLocalStorage();
    const { removeLS } = useLocalStorage();

    const addToFavorite = () => {
        writeLS('favorites', post._id);
        ++post.likes.length
        setFavorites((prevState) => [...prevState, post._id]);
        api.addLikes(post._id)
            .then((added) => {
                console.log('успешно добавил в избранное');
            })
            .catch(() => {
                alert('Не удалось добавить')
            });
    };

    const removeFavorite = () => {
        removeLS('favorites', post._id);
        --post.likes.length
        setFavorites((prevState) => prevState.filter((postId) => post._id !== postId));
        api.deleteLikes(post._id)
            .then((remove) => {
                console.log('успешно удалил из избранного');
            })
            .catch(() => {
                alert('Не удалось удалить')
            });
    };

    const [post, setPost] = useState();
    const navigate = useNavigate();
    const params = useParams();
    const handleClik = () => {
        api.deletePost(params.itemId)
            .then((data) => {
                alert('Вы удалили пост')
                changePost((prevState) => {
                    return prevState.filter((post) => post._id !== params.itemId);
                })
                navigate('/')
            })
            .catch((err) => alert(err));
    }
    useEffect(() => {
        api.getPosts(params.itemId)
            .then((data) => setPost(data))
            .catch((err) => alert(err));
    }, []);

    //для удаления поста
    const { myUser, setMyUser } = useContext(UserContext);
    const button = <Button onClick={handleClik} variant="contained" color='primary' size='small'>Удалить пост</Button>

    console.log(favorites?.includes(post?._id))

    return (
        <form className='form'>
            <div className='formAutor'>
                <Avatar src={post?.author.avatar} /> <h1>{post?.author.name}</h1>
            </div>
            <h2> {post?.title} </h2>
            <CardMUI className='cardInfo' sx={{ width: '1200px', height: 'auto', background: 'rgba(248, 240, 241, 0.987)' }}>
                <CardContent className='cardImg'>
                    <img src={post?.image} width="500" alt="картинка" />
                </CardContent>
                <h4> {post?.text} </h4>
            </CardMUI >
            <div>
                <br />
                <FavoriteBorderOutlinedIcon />
                {post?.likes.length}
                <br />
                Комментарии:
                {post?.comments.map(data => (data.text + ', '))}
                <br />
                Дата создания: <DayJS format="DD.MM.YYYY" >{post?.created_at}</DayJS>
            </div>
            {myUser?.name == post?.author.name && button}

            {/* {favorites?.includes(post?._id) ? (
                <IconButton aria-label='add to favorites' onClick={removeFavorite}>
                    <FavoriteIcon /> {post?.likes.length}
                </IconButton>
            ) : (
                <IconButton aria-label='add to favorites' onClick={addToFavorite}>
                    <FavoriteBorderOutlinedIcon /> {post?.likes.length}
                </IconButton>
            )} */}



                <IconButton aria-label='add to favorites' onClick={removeFavorite}>
                    <FavoriteIcon /> {post?.likes.length}
                </IconButton>
         
                <IconButton aria-label='add to favorites' onClick={addToFavorite}>
                    <FavoriteBorderOutlinedIcon /> {post?.likes.length}
                </IconButton>
          



        </form >
    )
};