import React, {useState} from 'react'
import { Grid, TextField, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import './index.css';
import { useApi } from '../../hooks/useApi';

export const UserAuth = ({ setToken}) => {
    const navigate = useNavigate();
    const api = useApi();
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [error, setError] = useState('');
    
    const handleClick = () => {
        api.auth('signin', {email: userEmail, password: userPassword})
        .then((data) => {
            localStorage.setItem('token', data.token);
            setToken(data.token);
            navigate('/')
        })
        .catch((err) => {
            switch (err) {
                case '401': setError('Неверный логин или пароль');
                break;
                case '404': setError('Пользователь с email не найден');
            }

        });
    }
  return (
      <div>
          <Grid container flexDirection='column' spacing='10'>
            <Grid item>
                <Typography variant='h3'>Авторизация</Typography>
            </Grid>
            <Grid item>
                <TextField
                    fullWidth
                    label='e-mail'
                    variant='outlined'
                     value={userEmail}
                     type='email'
                    onChange={({ target }) => {
                        setUserEmail(target.value);
                    }}
                />
            </Grid>
            <Grid item>
                <TextField
                    fullWidth
                    label='Пароль'
                    variant='outlined'
                    type='password'
                    onChange={({ target }) => {
                        setUserPassword(target.value);
                    }}
                />
            </Grid>
            <Typography color='red'>{error}</Typography>
            <Grid item>
                <Button onClick={handleClick} variant='contained' color='secondary' size='small'>
                    Войти
                </Button>

                <Button onClick={(e) => navigate('/createuser')} color='secondary'  size='small'>
                    Зарегистрироваться
                </Button>
            </Grid>
        </Grid>
      </div>
  )
}
