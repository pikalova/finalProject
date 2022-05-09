import React, { useEffect, useState, useContext } from 'react';
import './indexInfo.css';
import { useApi } from '../../hooks/useApi';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import { Card as CardMUI, Button, CardHeader, TextField, Typography, Grid } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import UserContext from '../../contexts/UserContext';
import DayJS from 'react-dayjs';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Comment } from '../Comment';

export const PostInfo = ({ changePost }) => {
    const api = useApi();
    const [post, setPost] = useState();
    const [comment, setComment] = React.useState('');
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

    const addComment = () => {
        console.log(params.itemId)
        api.addComment(params.itemId, comment)
            .then((data) => console.log(data))
            .catch((err) => alert(err));
    }

    //для удаления поста
    const { myUser, setMyUser } = useContext(UserContext);
    const button = <Button onClick={handleClik} variant="contained" color='primary' size='small'>Удалить пост</Button>

    return (
        <div>
            <Link to='/'><Button variant="contained" color='primary' size='small'>Назад</Button></Link>
            <form className='form'>
                {/* <div className='formAutor'>
                    <Avatar src={post?.author.avatar} /> <h1>{post?.author.name}</h1>
                </div> */}
                <h2> {post?.title} {myUser?.name === post?.author.name && button}</h2> 
                
                <Grid item container xs={16} className='grid' justifyContent='center'>
                    <Grid item xs={10}>
                <CardMUI className='cardInfo' sx={{ height: 'auto', background: 'rgba(248, 240, 241, 0.987)' }}>
                    <CardContent className='cardImg'>
                        <img src={post?.image} width="500" alt="картинка" />
                    </CardContent>

                    <Grid item container xs={16} >
                        <Grid item xs={6}>
                            <FavoriteBorderOutlinedIcon />
                            {post?.likes.length}

                        </Grid>
                        <Grid item xs={6}>

                            <CardHeader
                                avatar={<Avatar
                                    alt={post?.author.name}
                                    src={post?.author.avatar}
                                />}
                                title={post?.author.name}
                                subheader={<DayJS format="DD.MM.YYYY" >{post?.updated_at}</DayJS>}
                            />
                        </Grid>
                        <Grid item xs={16}>
                            <h4> {post?.text} </h4>
                        </Grid>
                    </Grid>
                </CardMUI >
</Grid>
                    <Grid item container xs={16}>

                        <Grid item xs={16}>
                            <Typography variant='h6'>
                                Комментарии:
                            </Typography>
                            {
                                post?.comments.map((comment) => <Comment comment={comment} key={comment._id} />)
                            }
                        </Grid>
                    </Grid>

                    {/* {post?.comments.map(data => (data.text + ', '))} */}
                    <div className='add-comment'>
                        <Typography>Добавить комментарий:</Typography>
                        <TextField
                            fullWidth
                            label='Введите комментарий'
                            variant='outlined'
                            multiline
                            rows={4}
                            onChange={({ target }) => {
                                setComment(target.value);
                            }}
                        />
                        <Button onClick={addComment} variant="contained" color='primary' size='small'>Отправить</Button>
                    </div>
                    <br />
                    {/* Дата создания: <DayJS format="DD.MM.YYYY" >{post?.created_at}</DayJS> */}
                </Grid>

            </form >
        </div >
    )
};