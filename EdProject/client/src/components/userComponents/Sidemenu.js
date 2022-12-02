import React from 'react';
import { Container } from '@mui/material';

export default function SideMenu(){
    return(
        <Container sx={{
            display:'absolute',
            flexDirection:'column',
            position:'absolute',
            left:'0px',
            width:'200px', 
            height:'100vh',
            backgroundColor:'#253053'
        }}>

        </Container>
    )
}