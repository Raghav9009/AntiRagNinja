import React, { useEffect, useState } from 'react';
import {Button, Paper, TextField, Typography } from '@mui/material';
import LoginNinja from '../images/LoginNinja.png'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login(){
  
  const [value,setValue] = useState({
     email:"",
     password:"",
  })
  
  axios.defaults.withCredentials = true;

  const navigate = useNavigate();
  
  function handleChange(e){
      
    const {name,value}=e.target;
    setValue((prev)=>{
      return(
        {...prev,[name]:value}
      )
    })

  }
  
  function handleSubmit(){
      axios.post('http://localhost:5000/login',{email:value.email,password:value.password})
      .then((response)=>{
        if(response.data.status)
        {
          toast.success(response.data.message+" "+response.data.usersession.username)
          navigate('/UserPage')
        }
        else
        {
           toast.error(response.data.message)
           navigate('/Login')
        }
      }).catch((err) => {
        console.log(err);
      }); 
    }

    useEffect(()=>{
        axios.get('http://localhost:5000/login')
        .then((response)=>{
          if(response.data.loggedIn){
             navigate('/UserPage')
          }
          else{
            navigate('/Login')
          }
        })
    },[])

     
  
  return( 
         <div style={{display:'flex',flexDirection:'row'}} >

           <Paper sx={{height:'350px',width:'400px',marginLeft:'140px',marginTop:'90px',paddingTop:'40px'}} container elevation={5}>
              
                  <Typography variant='h6'sx={{paddingTop:'10px',paddingLeft:'170px',paddingBottom:'15px'}}>
                       Login
                  </Typography>

                  <TextField name="email" value={value.email} onChange={handleChange} label='Email' sx={{marginLeft:'25px',width:'350px'}}>
                  </TextField>
                  
                  <TextField name="password" value={value.password} onChange={handleChange} variant='outlined' type='password' label='Password' sx={{marginTop:'14px',marginLeft:'25px',width:'350px'}}>
                  </TextField>

                  <Button onClick={handleSubmit} variant="contained" sx={{marginTop:'18px',marginLeft:'155px'}}>
                    Submit
                  </Button>

                  <Typography sx={{marginLeft:'80px',marginTop:'20px'}}>
                      Not Registered yet?
                      <Button disableRipple >
                         <Link to='/Register' style={{textDecorationLine:'none',color:'#4285F4',fontWeight:'bolder'}}>
                           Register
                         </Link>
                      </Button>
                      Here
                  </Typography>
           </Paper>

           <img src={LoginNinja} alt="LoginNinja" style={{height:'600px',width:'600px',marginLeft:'50px'}}>
           </img>
         </div>
     ) 
    
}