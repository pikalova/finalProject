import React, { useEffect, useState, useContext } from 'react';
import './indexInfo.css';
import { useApi } from '../../hooks/useApi';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import UserContext from '../../contexts/UserContext';
import DayJS from 'react-dayjs';

import { Card as CardMUI, Button, CardHeader } from '@mui/material';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';


const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const PostInfo = ({ changePost, favorites, setFavorites }) => {
    const api = useApi();

    const { writeLS } = useLocalStorage();
    const { removeLS } = useLocalStorage();

    const [open, setOpen] = React.useState(false);
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const addToFavorite = () => {
        writeLS('favorites', post._id);
        ++post.likes.length
        setFavorites((prevState) => [...prevState, post._id]);
        api.addLikes(post._id)
            .then((added) => {
                setOpen(true);
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
                setOpen(true);
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

    return (
        <Stack>
            <div>
                <form className='form'>
                    <h2 style={{ fontFamily: 'cursive' }}> {post?.title} </h2>
                    <CardMUI className='cardInfo' sx={{ width: '1100px', height: 'auto', background: 'rgba(248, 240, 241, 0.987)' }}>
                        <CardContent className='cardImg'>
                            <img src={post?.image} width="500" alt="картинка" />
                        </CardContent>
                        <div className='card__about'>
                            <div className='card__author'>
                                <CardHeader
                                    avatar={<Avatar
                                        alt={post?.author.name}
                                        src={post?.author.avatar}
                                    />}
                                    title={post?.author.name}
                                    subheader={<DayJS format="DD.MM.YYYY" >{post?.updated_at}</DayJS>}
                                />
                            </div>
                            <div>
                                <h4> {post?.text} </h4>
                                {myUser?.name === post?.author.name && button}
                            </div>
                            <span className='card__likes'>
                                {favorites?.includes(post?._id) ? (
                                    <IconButton aria-label='add to favorites' onClick={removeFavorite}>
                                        <FavoriteIcon /> {post?.likes.length}
                                    </IconButton>
                                ) : (
                                    <IconButton aria-label='add to favorites' onClick={addToFavorite}>
                                        <FavoriteBorderOutlinedIcon /> {post?.likes.length}
                                    </IconButton>
                                )}
                            </span>
                            <div>
                                Комментарии: {post?.comments.map(data => (data.text + ', '))}
                            </div>
                        </div>
                    </CardMUI >
                </form >
                <Link to='/'><Button variant="contained" color='primary' size='small' style={{ margin: '20px' }}><KeyboardBackspaceIcon />назад</Button></Link>
            </div>
            {(favorites?.includes(post?._id)) ? (
                <Snackbar open={open} autoHideDuration={1500} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                        Пост "{post?.author?.name}" добавлен в избранное!
                    </Alert>
                </Snackbar>
            ) : (
                <Snackbar open={open} autoHideDuration={1500} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="warning" sx={{ width: '100%' }}>
                        Пост "{post?.author?.name}" удален из избранного!
                    </Alert>
                </Snackbar>
            )}
        </Stack>
    )
};