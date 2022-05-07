import React, { useEffect } from 'react';
import { useApi } from '../../hooks/useApi';
import { useNavigate } from 'react-router-dom';

import { Grid } from '@mui/material';

import { TextField, Button, Typography } from '@mui/material';

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
            <Grid container flexDirection='column' alignItems='center' spacing='20'>
                <Grid item>
                    <TextField fullWidth label='Название (обязательное)' name='title' variant='outlined' />
                </Grid>
                <Grid item>
                    <TextField fullWidth label='Описание (обязательное)' name='text' variant='outlined' />
                </Grid>
                <Grid item>
                    <TextField fullWidth label='Картинка' name='image' variant='outlined' />
                </Grid>
                <Grid item>
                    <Button type='submit' variant='contained' color='secondary' size='small'>
                        Добавить пост
                    </Button>
                </Grid>
            </Grid>
        </form >
    )
}