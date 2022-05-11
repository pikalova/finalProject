import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { Avatar, Chip } from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout';

import UserContext from '../../contexts/UserContext';
import './index.css'

export const UserAndLikes = () => {
    const navigate = useNavigate();
    const { myUser, setMyUser } = useContext(UserContext);
   // const avatar = <img src={myUser.avatar}></img>

 

    const logout = () => {
        localStorage.clear();
        setMyUser(null)
        navigate('auth');
    }


    const navigateEditUser = () => {
        navigate('user/edit');
    }

    return (
        <div>
            {myUser &&
                <div  className='userContainer'>
                    
                   <div className='chipOne'><Chip avatar={<Avatar src={myUser?.avatar}></Avatar>} label={myUser?.name} onClick={navigateEditUser} color="info" variant='outlined' ></Chip></div>
                    
                   <div className='chipTwo'> <Chip onClick={logout} icon={<LogoutIcon />} label='Выйти' color="info" variant='outlined'className='logOut' ></Chip></div>
                  
                </div>
            }
        </div>
    )
}
