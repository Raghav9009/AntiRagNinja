import React from 'react';
import {AppBar, Toolbar,Button, Typography} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


export default function Header({username}){
     
     const navigate=useNavigate()
     axios.defaults.withCredentials = true;
     
     function handleClick(){
        axios.post('http://localhost:5000/logout')
        .then((response)=>{
            if(response.data.status){
                if(response.data.oftype === "user"){
                    navigate('/Login')
                }
                else{
                    navigate('/AdminLogin')
                }
                toast.success(response.data.message)
            }
            else{
                toast.error("Please try again") 
            }
        })
    } 
    return(
        <AppBar position="static" sx={{
            backgroundColor:'white',
            marginLeft:'200px',
            width:'1080px',
        }}>
          <Toolbar sx={{
             height:'20px'
          }}>
            <Typography variant='h6' sx={{marginLeft:'10px',marginTop:'8px',color:'#253053',fontWeight:'bold'}}>Hello{" "+username}</Typography>
            <Button variant='contained' onClick={handleClick} sx={{marginLeft:'760px'}}>
                Logout
            </Button>
          </Toolbar>
        </AppBar>
    )
} 