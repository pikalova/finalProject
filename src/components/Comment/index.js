import React, { useEffect, useState } from 'react'
import { Avatar, Card, CardContent, CardHeader, Grid, Typography } from '@mui/material'
import { useApi } from '../../hooks/useApi';
import DayJS from 'react-dayjs';
import './index.css'

export const Comment = ({ comment }) => {
    const api = useApi()
    const [author, setAuthor] = useState({})

    useEffect(() => {
        api.getData(`users/${comment.author}`)
            .then((value) => setAuthor(value))
            .catch((err) => console.log(err))
    }, [])

    return (
        <>
            {comment && (<Card sx={{ minWidth: 375 }} className='card' >
  <Grid item container xs={16}>
                <CardContent className='card-content'>
                        <Grid item xs={3}>
                        <CardHeader
                            avatar={<Avatar
                                alt={author.name}
                                src={author.avatar}
                            />}
                            title={author.name}
                            subheader={<DayJS format="DD.MM.YYYY" >{comment.updated_at}</DayJS>}
                        />
                        </Grid>
                        <Grid item xs={7}>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary" >
                            {comment.text}
                        </Typography>

                    </Grid>
                        
                

                </CardContent>

                    </Grid>  
            </Card>)}
        </>
    )
}
