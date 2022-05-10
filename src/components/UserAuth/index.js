import React, { useState } from 'react'
import { Grid, TextField, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import './index.css';
import { useApi } from '../../hooks/useApi';

export const UserAuth = ({ setUserToken }) => {
    const navigate = useNavigate();
    const api = useApi();
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newToken, setNewToken] = useState('');
    const [error, setError] = useState('');
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleClick = () => {
        api.auth('signin', { email: userEmail, password: userPassword })
            .then((data) => {
                localStorage.setItem('token', data.token);
                setUserToken(data.token);
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

    const resetPassword = () => {
        api.resetPassword({ "email": userEmail })
            .then((data) => {
                setOpen(true);
            })
            .catch((err) => {
                switch (err) {
                    case '401': setError('Неверный логин или пароль');
                        break;
                    case '404': setError('Пользователь с email не найден');
                }

            });
    }
    const changePassword = () => {

        api.getUserData(newToken)
            .then((data) => {
                console.log(data)
                api.changeUserPassword(data._id, newToken, {"password": newPassword}) 
                .then((data) => {
                    setOpen(false);
                    console.log(data)
                })
                .catch((err) => {
                    switch (err) {
                        case '401': setError('Неверный логин или пароль');
                            break;
                        case '404': setError('Пользователь с email не найден');
                    }
    
                });

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

                    <Button onClick={(e) => navigate('/createuser')} color='secondary' size='small'>
                        Зарегистрироваться
                    </Button>
                    <Button onClick={resetPassword} color='secondary' size='small'>
                        Я забыл пароль
                    </Button>
                </Grid>
            </Grid>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Сброс пароля</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Вам на почту отправлено письмо с кодом восстановления пароля. Скопируйте его сюда:
                    </DialogContentText>
                    <TextField
                        autoFocus
                        id="token"
                        label="Authorization code"
                        fullWidth
                        value={newToken}
                        variant="standard"
                        onChange={({ target }) => {
                            setNewToken(target.value);
                        }}
                    />
                    <DialogContentText>
                       Введите новый пароль:
                    </DialogContentText>
                    <TextField
                        id="password"
                        label="Password"
                        type="password"
                        value={newPassword}
                        fullWidth
                        variant="standard"
                        onChange={({ target }) => {
                            setNewPassword(target.value);
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Отмена</Button>
                    <Button onClick={changePassword}>Подтвердить</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
