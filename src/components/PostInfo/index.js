import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApi } from '../../hooks/useApi';
import { Grid, Button } from '@mui/material';

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


    return (
        <>
            {post && <Grid container spacing={1} flexDirection='column' alignItems='center'>
                <Grid item xs={8}>
                    <h1> Автор: {post.author?.name} </h1>
                </Grid>
                <Grid item xs={8}>
                    <img
                        src={post?.image}
                        width="400"
                        alt="картинка"
                    />
                </Grid>
                <Grid item xs={8}>
                    <h2> Заголовок: {post?.title} </h2>
                </Grid>
                <Grid item xs={8}>
                    Комментарии: {post?.comments.map(data => (data.text + ', '))}
                </Grid>
            </Grid>
            }
            < br />
            <Grid container flexDirection='column' alignItems='center'>
                <Button onClick={handleClik} variant="contained" color='primary' size='small'>Удалить пост</Button>
                {/* <pre>{JSON.stringify(post, null, 4)}</pre> */}
            </Grid>
        </>
    )
};
