import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { Chip } from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout';

import UserContext from '../../contexts/UserContext';
import './index.css'

export const UserAndLikes = () => {
    const navigate = useNavigate();
    const { myUser, setMyUser } = useContext(UserContext);

    const logout = () => {
        localStorage.clear();
        setMyUser(null)
        navigate('auth');
    }

    return (
        <div className='userContainer'>
            {myUser &&
                <div>
                    <div>Привет, {myUser.name}!</div>
                    <Chip onClick={logout} icon={<LogoutIcon />} label='LogOut' color="info" variant='outlined' ></Chip>
                </div>
            }
        </div>
    )
}
