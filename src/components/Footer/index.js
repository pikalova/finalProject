import React from 'react'
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';

import './index.css'

export const Footer = () => {

  const navigate = useNavigate();

  const navigateAboutUs = () => {
    navigate('about');
}

const navigateContact = () => {
  navigate('contact');
}
  
  const buttons = [
    <Button onClick={navigateAboutUs} key="one">О проекте</Button>,
    <Button onClick={navigateContact} key="two">О нас</Button>,
    <Button key="three">Полезная информация</Button>,
  ];
  return (
    <Box
      className='footContainer'
      sx={{
        display: 'flex',
        '& > *': {
          m: 1,
        },
      }}
    >
     
      <ButtonGroup
        orientation="vertical"
        aria-label="vertical contained button group"
        variant="text"
      >
        {buttons}
      </ButtonGroup>
    </Box>
  );
}
