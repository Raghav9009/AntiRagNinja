import React from 'react'
import { Card } from '@mui/material'
function CardC({totalcount,message}) {
  return (
    <>
      <Card elevation={5} sx={{marginLeft:'70px',marginTop:'20px',height:'200px',width:'350px',backgroundColor:'#253053'}}>
           <h2 style={{color:'white',marginLeft:'50px'}}>{message}</h2>
           <h1 style={{color:'white',marginLeft:'160px',fontSize:'60px'}}>{totalcount}</h1>
      </Card>
    </>
  ) 
}

export default CardC