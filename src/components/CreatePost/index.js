import React, {useEffect} from 'react';
import { useApi } from '../../hooks/useApi';
import { useNavigate } from 'react-router-dom';

import { Grid } from '@mui/material';

export const CreatePost = ({ changePost }) => {
    const navigate = useNavigate();
    const api = useApi();
    const handleSubmit = (event) => {
        event.preventDefault();
        const {
            target: { title, text, image }
        } = event;
        api.addPost({
            title: title.value,
            text: text.value,
            image: image.value,
        })
            .then((data) => {
                changePost((prevState) => [data, ...prevState]);
                navigate('/')
            })
            .catch((err) => alert(err));
    };

    return (
        <form onSubmit={handleSubmit}>
            <Grid container flexDirection='column' alignItems='center' spacing='10'>
                <Grid item>
                    <input name='title' placeholder='title, строка (обязательное)' />
                </Grid>
                <Grid item>
                    <input name='text' placeholder='text, строка (обязательное)' />
                </Grid>
                <Grid item>
                    <input name='image' placeholder='image, строка' />
                </Grid>
                <Grid item>
                    <button>Создать пост</button>
                </Grid>
            </Grid>
        </form >
    )
}