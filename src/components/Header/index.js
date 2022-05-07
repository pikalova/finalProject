import React from 'react'
//import IconButton from '@mui/material/IconButton';
import { useNavigate } from 'react-router-dom';

export const Header = ({ children }) => {

    const navigate = useNavigate()
    const navigatToCreatePage = () => {
        navigate('posts/create')
    };

    return (
        <div>
            Header
            {children}

            {/* <IconButton onClick={navigatToCreatePage} >
                Создать пост
            </IconButton> */}

        </div>
    )
}
