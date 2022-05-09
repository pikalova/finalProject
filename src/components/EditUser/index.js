import { Button, Grid, TextField, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import UserContext from '../../contexts/UserContext'

//import api from '../../utils/api'
import './index.css'

import { useApi } from '../../hooks/useApi'

export const EditUser = () => {
    const { myUser, setMyUser } = useContext(UserContext)
    const api = useApi();
    const [userName, setUserName] = useState('');
    const [userAbout, setUserAbout] = useState('');
    const [userImg, setUserImg] = useState('');

    useEffect(() => {

        myUser && setUserName(myUser.name)
        myUser && setUserAbout(myUser.about)
        myUser && setUserImg(myUser.avatar)

    }, [myUser])

    const handClick = () => {
        api.editUserData({ name: userName, about: userAbout }).then((data) => {
            console.log(data)
        })
            .catch(err => alert(err))
        api.editUserImg({ avatar: userImg })
            .then((data) => {
                console.log(data)
            })
            .catch(err => alert(err))
    }

    return (
        <Grid container flexDirection='column' spacing='10' className='gridContainer'>
            <Grid item>
                <Typography variant='h3'>Редактировать пользователя</Typography>
            </Grid>
            <Grid item>
                <TextField
                    fullWidth
                    label='Имя'
                    variant='outlined'
                    value={userName}
                    onChange={({ target }) => {
                        setUserName(target.value)
                    }}
                />

            </Grid>
            <Grid item>
                <TextField
                    fullWidth
                    label='О себе'
                    variant='outlined'
                    value={userAbout}
                    onChange={({ target }) => {
                        setUserAbout(target.value)
                    }}
                />

            </Grid>
            <Grid item>
                <TextField
                    fullWidth
                    label='Ссылка на изображение'
                    variant='outlined'
                    value={userImg}
                    onChange={({ target }) => {
                        setUserImg(target.value)
                    }}
                />

            </Grid>
            <Grid item>
                <Button onClick={handClick} variant='contained' size='small'>Сохранить</Button>
            </Grid>
        </Grid>
    )
}
