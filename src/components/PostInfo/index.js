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

export const PostInfo = ({ changePost }) => {
    const api = useApi();
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
        </form >
    )
};