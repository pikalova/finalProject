import React from 'react';
import { useApi } from '../../hooks/useApi';
import { useNavigate, Link } from 'react-router-dom';
import { TextField, Button, Grid } from '@mui/material';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

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
            <Grid container flexDirection='column' alignItems='center' spacing='15'>
                <Grid item>
                    <h2>Создайте новый пост</h2>
                </Grid>
                <Grid item>
                    <TextField fullWidth label='Название' name='title' variant='outlined' style={{ width: '15em' }} />
                </Grid>
                <Grid item>
                    <TextField fullWidth label='Описание' name='text' variant='outlined' style={{ width: '15em' }} />
                </Grid>
                <Grid item>
                    <TextField fullWidth label='Картинка https://...' name='image' variant='outlined' style={{ width: '15em' }} />
                </Grid>
                <Grid item>
                    <Button type='submit' variant='contained' color='secondary' size='small'>
                        Добавить пост
                    </Button>
                </Grid>
            </Grid>
            <Link to='/'><Button variant="contained" color='primary' size='small' style={{ margin: '20px' }}><KeyboardBackspaceIcon />назад</Button></Link>
        </form >
    )
}