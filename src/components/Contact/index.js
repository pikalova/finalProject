import React from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import logo from '../../assets/svg/telegramm.png'
import "./index.css"



export const Contact= () => {
  return (
  <div className='containerCon'>
    <div className='card1'>
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        src='https://srisovki.one/wp-content/uploads/2021/05/1599558438_6.jpg'
        alt="Ivan"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Иван
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Разработка карточек <br/>
          Cоздание и редактирование постов
        </Typography>
      </CardContent>
      <CardActions>
        
        <Button size="small" href='https://t.me/fisherman691990' target='_blanc'>Написать  <img src={logo} className="logoStyle"></img></Button>
        
      </CardActions> 
    </Card>
    </div>
    <div className='card2'>
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        src='https://srisovki.one/wp-content/uploads/2021/05/1599558438_6.jpg'
        alt="Ivan"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Наталья
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Пагинация <br/>
          Авторизация и регистрация пользователя <br/>
        </Typography>
      </CardContent>
      <CardActions>
        
        <Button size="small" href='https://t.me/NatalyPikalova'>Написать  <img src={logo} className="logoStyle"></img></Button>
        
      </CardActions> 
    </Card>
    </div>
    <div className='card3'>
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        src='https://srisovki.one/wp-content/uploads/2021/05/1599558438_6.jpg'
        alt="Ivan"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Светлана
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Header <br/>
          Footer <br/>
        </Typography>
      </CardContent>
      <CardActions>
        
        <Button size="small" href='https://t.me/catpusheen'>Написать  <img src={logo} className="logoStyle"></img></Button>
        
      </CardActions> 
    </Card>
    </div>
    </div>
  
 );
  
}